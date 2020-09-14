// Setting my variables

let designateText = "";
let designateTime = "";
let todaysDate;
let currentTime;
let highlightHour;
let tempArray = [];
let savedAppointments;
let refreshedAppointments;

// Code to display current date

$(window).on("load", function () {
    todaysDate = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").append(todaysDate);
    currentTime = moment().format("H");

    // Function to save events

    function renderAppointments() {
        savedAppointments = JSON.parse(localStorage.getItem("appointments"));
        if (savedAppointments !== null) {
            for (i = 0; i < savedAppointments.length; i++) {
                refreshedAppointments = savedAppointments[i];
                details = refreshedAppointments.details;
                timeIndex = refreshedAppointments.time;
                timeIndex = timeIndex.replace(":00", '');
                if (details !== null) {
                    $("#" + timeIndex).children('article').children('article').children('textarea').val(details);
                }
            }
        }
    }

    renderAppointments();

    // Code to highlight current hour

    for (i = 0; i <= 23; i++) {
        highlightHour = i;
        if (currentTime == i) {
            $('#' + highlightHour).addClass("present");
            $('#' + highlightHour).children('article').children('article').children("textarea").addClass("present");
        }
        else if (currentTime > i) {
            $('#' + highlightHour).addClass("past");
            $('#' + highlightHour).children('article').children('article').children("textarea").addClass("past");
        }
        else {
            $('#' + highlightHour).addClass("future");
            $('#' + highlightHour).children('article').children('article').children("textarea").addClass("future");
        }
    }
});

// Code for save button

$(".saveBtn").click(function () {
    designateText = $(this).parent('article').children('article').children('textarea').val();
    designateTime = $(this).parent('article').parent().attr("id");
    appointment = {
        time: designateTime,
        details: designateText
    }
    tempArray = JSON.parse(localStorage.getItem("appointments"));
    if (tempArray === null) {
        localStorage.setItem('appointments', JSON.stringify([{ time: designateTime, details: designateText }]));
    }
    else {
        tempArray.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(tempArray));

    }
    $(this).parent('article').children('article').children('textarea').replaceWith($('<textarea>' + designateText.addClass("textarea") + '</textarea>'));
});