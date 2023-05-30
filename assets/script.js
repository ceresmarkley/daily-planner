// function to create and append 24, 1 hour time-block div elements to the body of webpage.
function createTimeBlocks() {
  //for loop using 24 hours as index reference to create a time-block.
  for (var i = 0; i < 24; i++) {
    var hour = i % 12;
    // creating ampm variable to determine if a number is AM or PM. to be referenced later when displaying military time.
    var ampm = i < 12 ? "AM" : "PM";
    var divId = "hour-" + hour;
    // creating if condition to PM divIDs to be recognized differently than their AM counterpart
    if (ampm === "PM") {
      divId = "hour-" + (hour + 12) % 24;
    }
    // creates div element with id and className variables
    var div = document.createElement("div");
    div.id = divId;
    div.className = "row time-block";
    // creates individual time-block with their respective ID names. If/else conditions established for the text content
    // based off of if the time-block is am or pm
    var hourDiv = document.createElement("div");
    hourDiv.className = "col-2 col-md-1 hour text-center py-3";
    if (ampm === "PM") {
      hourDiv.textContent = hour + 12 + ":00";
    } else if (hour < 10) {
      hourDiv.textContent = '0' + hour + ":00";
    } else {
      hourDiv.textContent = hour + ":00";
    }
    // creates 'textarea' element within div where user will be able to type appointments
    var description = document.createElement("textarea");
    description.className = "col-6 col-md-9 description";
    description.rows = 3;
    // creates saveButton element within time-block
    var saveButton = document.createElement("button");
    saveButton.className = "btn saveBtn col-2 col-md-1";
    saveButton.ariaLabel = "save";
    saveButton.innerHTML = "<i class='fas fa-save' aria-hidden='true'></i>";
    // creates trashButton element within time-block
    var trashButton = document.createElement("button");
    trashButton.className = "btn trashBtn col-2 col-md-1";
    trashButton.ariaLabel = "trash";
    trashButton.innerHTML = "<i class='fa fa-trash' aria-hidden='true'></i>";
    // appends hourDiv, description, saveButton, and trashButton to time-block div
    div.appendChild(hourDiv);
    div.appendChild(description);
    div.appendChild(saveButton);
    div.appendChild(trashButton);
    // appends time-block div to the body of html
    document.body.appendChild(div);
  }
}
// calls createTimeBlocks function
createTimeBlocks();
// calls setDescription function
setDescription();
//calls hours tracker function
hourTracker();

//creating on page load ready button interactions with Jquery
$(document).ready(function () {
    var currentDate = dayjs().format('dddd, MMMM DD, YYYY hh:mm:ss a');
    // Update the user interface.
    $('#currentDay').text(currentDate);

    setInterval(function() {
      hourTracker();
      var currentDate = dayjs().format('dddd, MMMM DD, YYYY hh:mm:ss a');
      // Update the user interface.
      document.getElementById("currentDay").innerHTML = currentDate;
      // Save the current date and time to local storage.
      localStorage.setItem("currentDate", currentDate);
    }, 100);
  });
  //selecting the class saveBtn and applying an on click function to save description of its time-block
  $('.saveBtn').on('click', function () {
    //establishing hour and task varriables using the id of the time-block and the descriptions value
    var hour = $(this).parent().attr('id');
    var tasks = $(this).siblings('.description').val();
    // taking user input value from description and its time block and saving it to localStorage
    localStorage.setItem(hour, tasks);
  })
  //selecting the class saveallBtn and applying an on click function to save description of all time-blocks
  $('.saveallBtn').on('click', function () {
    //creating an allTasks array using the description values of all time-blocks on webpage.
    var allTasks = [];
      $('.description').each(function() {
        allTasks.push($(this).val());
      });
      // for loop taking the array of time-block descriptions and setting them to their respective time-blocks, saving to localStorage
      for (var i = 0; i < 24; i++) {
      localStorage.setItem("hour-" + i, allTasks[i]);
    }
  
    }); 
// creating setDescription function using a for loop to retrieve localStorage for each time-block.
function setDescription() {
  for (var i = 0; i <= 23; i++) {
    // using the id hour- with the index of time-block plus its description value.
    $('#hour-' + i + ' .description').val(localStorage.getItem('hour-' + i));
  }
}
  // on click event created for class trashBtn. removing the localStorage description value of trashBtn's parent time-block
  $('.trashBtn').on('click', function () {
    localStorage.removeItem($(this).parent().attr('id'));
    $(this).siblings('.description').val('');
  })
  // on click event for class clearBtn to remove all localStorage description values
  $('.clearBtn').on('click', function () {
    localStorage.clear();
    $('.description').val('');
  })
  // creates hourTracker function to determine time-blocks class type based off user's current time.
  function hourTracker() {
    // uses the dayjs() method to set variable currentHour to user current time.
    var currentHour = dayjs().hour();
    $('.time-block').each(function () {
      //create timeBlock variable splitting time-block's id into hour- and the following number as in integer number.
      var timeBlock = parseInt($(this).attr('id').split('hour-')[1]);
      // create else if statements for time-blocks class of past,present,future. altering color for user. 
      if (timeBlock === currentHour) {
        $(this).addClass('present');
      } else if (timeBlock > currentHour) {
        $(this).addClass('future');
      } else {
        $(this).addClass('past');
      }
    })
  }