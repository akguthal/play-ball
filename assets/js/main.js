/*
	Helios by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

var showOn = false;

function getJazzLink() {
	return "http://us4.internet-radio.com:8266/stream?type=http&nocache=18&cb=" + new Date().getTime();
}

function getWMUCLink() {
	return "http://wmuc.umd.edu:8000/sports-high?cb=" + new Date().getTime();
}

var audioLink = getJazzLink();

(function ($) {

	var $window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		wide: ['1281px', '1680px'],
		normal: ['961px', '1280px'],
		narrow: ['841px', '960px'],
		narrower: ['737px', '840px'],
		mobile: [null, '736px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});
})(jQuery);

function playAudio() {
	var audioPlayer = document.getElementById("player");
	var buttonIcon = document.getElementById("buttonIcon");
	if (!audioPlayer.paused) {
		audioPlayer.pause();
		audioPlayer.setAttribute("src", "");
		setTimeout(function () {
			audioPlayer.load();
		});
		buttonIcon.classList.remove('fa-pause');
		buttonIcon.classList.add('fa-play');
	}
	else {
		audioPlayer.setAttribute("src", audioLink);
		audioPlayer.load();
		audioPlayer.play();
		buttonIcon.classList.remove('fa-play');
		buttonIcon.classList.add('fa-pause');
	}
}


function getNextShow() {
	var today = moment();
	var todayDayVal = today.isoWeekday();

	var showDay = 5;
	var showHour = 12;
	var showMinute = 0;

	var endShow = moment().isoWeekday(showDay).hours(showHour + 1).minutes(showMinute + 5).seconds(0);
	var nextShow = moment().isoWeekday(showDay).hours(showHour).minutes(showMinute);

	if (todayDayVal >= showDay) {
		if (todayDayVal > showDay || (todayDayVal == showDay && (today - endShow) > 0)) { //Show already done for this week
			endShow = endShow.add(1, 'weeks');
			nextShow = nextShow.add(1, 'weeks');
		}
		else if ((today - nextShow) >= 0 && (today - endShow <= 0)) { //Show is going on right now
			document.getElementById("liveMessage").style.display = 'block';
			document.getElementById("nextShowMessage").style.display = 'none';
			if (!showOn) {
				showOn = true;
				audioLink = getWMUCLink();
			}
			return;
		}
	}

	if (showOn) {
		showOn = false;
		document.getElementById("liveMessage").style.display = 'none';
		document.getElementById("nextShowMessage").style.display = 'block';
		audioLink = getJazzLink();
	}

	var seconds = Math.ceil((nextShow - today) / 1000);
	var days = Math.floor(seconds / (24 * 3600));
	seconds -= days * (24 * 3600);
	var hours = Math.floor(seconds / 3600);
	seconds -= hours * 3600;
	var minutes = Math.ceil(seconds / 60);

	dayString = days + " days, ";
	if (days == 0) {
		dayString = "";
	}
	if (days == 1) {
		dayString = days + " day, ";
	}

	hourString = hours + " hours, ";
	if (days == 0 && hours == 0) {
		hourString = "";
	}
	if (hours == 1) {
		hourString = hours + " hour, ";
	}

	minuteString = minutes + " minutes";
	if (minutes == 1) {
		minuteString = minutes + " minute";
	}


	var timeString = dayString + hourString + minuteString;


	document.getElementById("nextShow").innerHTML = timeString;
}
window.onload = getNextShow;
window.setInterval(getNextShow, 20000);
