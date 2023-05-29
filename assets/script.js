// Below I try the jQuery method
var currentDate = dayjs().format('dddd, MMMM DD, YYYY');
console.log(currentDate);
$('#currentDay').text(currentDate);

function createTimeBlocks() {
  for (var i = 0; i < 24; i++) {
    var hour = i % 12;
    var ampm = i < 12 ? "AM" : "PM";
    var divId = "hour-" + hour;
    
    if (ampm === "PM") {
      divId = "hour-" + (hour + 12) % 24;
    }
    
    var div = document.createElement("div");
    div.id = divId;
    div.className = "row time-block";

    var hourDiv = document.createElement("div");
    hourDiv.className = "col-2 col-md-1 hour text-center py-3";
    if (ampm === "PM") {
      hourDiv.textContent = hour + 12 + ":00";
    } else if (hour < 10) {
      hourDiv.textContent = '0' + hour + ":00";
    } else {
      hourDiv.textContent = hour + ":00";
    }

    var description = document.createElement("textarea");
    description.className = "col-6 col-md-9 description";
    description.rows = 3;

    var saveButton = document.createElement("button");
    saveButton.className = "btn saveBtn col-2 col-md-1";
    saveButton.ariaLabel = "save";
    saveButton.innerHTML = "<i class='fas fa-save' aria-hidden='true'></i>";

    var trashButton = document.createElement("button");
    trashButton.className = "btn trashBtn col-2 col-md-1";
    trashButton.ariaLabel = "trash";
    trashButton.innerHTML = "<i class='fa fa-trash' aria-hidden='true'></i>";

    div.appendChild(hourDiv);
    div.appendChild(description);
    div.appendChild(saveButton);
    div.appendChild(trashButton);

    document.body.appendChild(div);
  }
}

createTimeBlocks();

$(document).ready(function () {
  //Make a click listener to the saveBtn and get the values stored: 
  $('.saveBtn').on('click', function () {
    // define and allocate the hour of the related time-block.
    // this here refers to the same line where .saveBtn class is located.
    var hour = $(this).parent().attr('id');
    // definte inputs in the description box as tasks.
    var tasks = $(this).siblings('.description').val();
    // console log to check if my variables are set up correctly
    console.log(hour, tasks);
    // Storing the descriptions and related time-block in the localStorage:
    localStorage.setItem(hour, tasks);
  })

  $('.saveallBtn').on('click', function () {
    var allTasks = [];
      $('.description').each(function() {
        allTasks.push($(this).val());
      });
      // Loop through all hours and store the corresponding task description in localStorage
      for (var i = 0; i < 24; i++) {
      localStorage.setItem("hour-" + i, allTasks[i]);
    }
    });
  


  // Retrieve items from the localStorage by using ids from each time-block div
function setDescription() {
  for (var i = 0; i <= 23; i++) {
    $('#hour-' + i + ' .description').val(localStorage.getItem('hour-' + i));
  }
}

  // Below I create a listener for the trashBtn and make it retrieve and remove related vals in the localStorage
  $('.trashBtn').on('click', function () {
    localStorage.removeItem($(this).parent().attr('id'));
    $(this).siblings('.description').val('');
  })
  // Below I created a listener for clearBtn and make it clear out all values and keys in the localStorage
  $('.clearBtn').on('click', function () {
    localStorage.clear();
    $('.description').val('');
  })

  function hourTracker() {
    setDescription();
    var currentHour = dayjs().hour();

    $('.time-block').each(function () {
      // define timeBlock by getting the string value to an numberic value.
      // Allocate the timeBlock value by finding its id and get rid of non-number values within.
      var timeBlock = parseInt($(this).attr('id').split('hour-')[1]);
      
      // console log to chedck if the varibles are set up alright
      console.log(timeBlock);
      console.log(currentHour);
      
      // compare the value of timeBlock and the current hour and set the class to 'past' 'presnet' 'future' accordingly
      if (timeBlock === currentHour) {

        $(this).addClass('present');

      } else if (timeBlock > currentHour) {

        $(this).addClass('future');

      } else {

        $(this).addClass('past');
      }
    })
  }
  
  // kick on the hourTracker and set an interval to let it run every 15000ms
  hourTracker();
  setInterval(hourTracker, 15000);
})