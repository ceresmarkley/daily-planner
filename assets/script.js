// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var rootEL = $('root');
var timeblockEl = $('.time-block');
var saveBtnEL = $('.saveBtn');

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // Add a listener for click events on the save button.
  $('.saveBtn').on('click', function () {
    
    // Get the id of the time block containing the button that was clicked.
    var id = $(this).closest('.time-block').attr('id');
    
    // Get the user input from the textarea element.
    var description = $('#' + id + ' .description').val();
    
    // Save the user input in localStorage.
    localStorage.setItem(id, description);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
    
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
  
  // Loop over time blocks and set the textarea value.
  $('.time-block').each(function () {
    // Get the id of the time block.
    var id = $(this).attr('id');

    // Get the user input from localStorage.
    var description = localStorage.getItem(id);

    // Set the textarea value.
    $('#' + id + ' .description').val(description);
  });
});
    // TODO: Add code to display the current date in the header of the page.
  
  
  // Starter code. 
  
function hourUpdater() {
  // Get the current hour.
  var currentHour = dayjs().hour();
  // loop over time blocks
  $('.time-block').each(function () {
  // Get the hour of the current time block.
  var timeBlockHour = parseInt($(this).attr('id').split('hour-')[1]);
  // Check if the current hour is equal to the hour of the time block.
  if (currentHour === timeBlockHour) {
  // Update the time block.
  $(this).addClass("present");
  } else if (currentHour > timeBlockHour) {
  // Update the time block.
  $(this).addClass("past");
  } else {
  $(this).addClass("future");
  }
  });
}

hourUpdater();
setInterval(hourUpdater, 15000);
// load any saved data from localStorage
$('#hour-8 .description').val(localStorage.getItem('hour-8'));
// display current day on page
$('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY hh:mm A'));