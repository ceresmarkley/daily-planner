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
    // creates div element with id and className
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
  
  $('.saveBtn').on('click', function () {
    
    var hour = $(this).parent().attr('id');
    
    var tasks = $(this).siblings('.description').val();
    
    localStorage.setItem(hour, tasks);
  })

  $('.saveallBtn').on('click', function () {
    var allTasks = [];
      $('.description').each(function() {
        allTasks.push($(this).val());
      });
      
      for (var i = 0; i < 24; i++) {
      localStorage.setItem("hour-" + i, allTasks[i]);
    }
    });
  
  
function setDescription() {
  for (var i = 0; i <= 23; i++) {
    $('#hour-' + i + ' .description').val(localStorage.getItem('hour-' + i));
  }
}

  $('.trashBtn').on('click', function () {
    localStorage.removeItem($(this).parent().attr('id'));
    $(this).siblings('.description').val('');
  })

  $('.clearBtn').on('click', function () {
    localStorage.clear();
    $('.description').val('');
  })

  function hourTracker() {
    setDescription();
    var currentHour = dayjs().hour();

    $('.time-block').each(function () {
      
      var timeBlock = parseInt($(this).attr('id').split('hour-')[1]);
      
      
      if (timeBlock === currentHour) {

        $(this).addClass('present');

      } else if (timeBlock > currentHour) {

        $(this).addClass('future');

      } else {

        $(this).addClass('past');
      }
    })
  }
  
  // call hourTracker and set an interval to let it run every minute
  hourTracker();
  setInterval(hourTracker, 60000);
  var currentDate = dayjs().format('dddd, MMMM DD, YYYY hh:mm a');

  // Update the user interface.
  $('#currentDay').text(currentDate);
})