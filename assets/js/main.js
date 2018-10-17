/*
	Helios by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/


(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '961px',   '1280px' ],
			narrow:    [ '841px',   '960px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});
})(jQuery);

function playAudio(){
	var audioPlayer = document.getElementById("player");
	var buttonIcon = document.getElementById("buttonIcon");
	if (!audioPlayer.paused){
	  audioPlayer.pause();
	  buttonIcon.classList.remove('fa-pause');
	  buttonIcon.classList.add('fa-play');
	}
	else{
	  audioPlayer.play();
	  buttonIcon.classList.remove('fa-play');
	  buttonIcon.classList.add('fa-pause');
	}
	}


  function getNextShow(){
		var today = moment();
		var todayDayVal = today.isoWeekday();

		document.getElementById("audioLink").src = "http://us4.internet-radio.com:8266/stream?type=http&nocache=18";

		var nextTuesdayEndShow = moment().day(2).hours(20).minutes(5).seconds(0); //8PM on this Tuesday
		var nextTuesday = nextTuesdayEndShow.clone().hours(19); //Start of the show, set time to 7PM
		if (todayDayVal >= 2){
			if (todayDayVal > 2 || (todayDayVal == 2 && (today - nextTuesdayEndShow) > 0)){
				nextTuesdayEndShow = moment().day(9).hours(20).minutes(5).seconds(0); //If after the show, go forward a week
				nextTuesday = nextTuesdayEndShow.clone().hours(19);
			}
			else if ((today - nextTuesday) >= 0 && (today - nextTuesdayEndShow <= 0)){ //Show is going on right now
				document.getElementById("nextShow").innerHTML = "We're Live!";
				document.getElementById("audioLink").src = "http://wmuc.umd.edu:8000/sports-high";
				return;
			}
		}

		var seconds = Math.ceil((nextTuesday - today)/1000);
		var days = Math.floor(seconds/(24 * 3600));
		seconds -= days*(24*3600);
		var hours = Math.floor(seconds / 3600);
		seconds -= hours * 3600;
		var minutes = Math.ceil(seconds / 60);

		dayString = days+" days, ";
		if (days == 0){
			dayString = "";
		}
		if (days == 1){
			dayString = days+" day, ";
		}

		hourString = hours+" hours, ";
		if (days == 0 && hours == 0){
			hourString = "";
		}
		if (hours == 1){
			hourString = hours+" hour, ";
		}

		minuteString = minutes+" minutes";
		if (minutes == 1){
			minuteString = minutes+" minute";
		}

		var timeString = dayString+hourString+minuteString;


		document.getElementById("nextShow").innerHTML = timeString;
	}

	window.setInterval(getNextShow, 1000);
