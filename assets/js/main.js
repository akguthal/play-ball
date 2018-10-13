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
		var nextTuesday = moment().day(2+7).hours(19).minutes(0).seconds(0);
		var nextTuesdayEndShow = moment().day(2+7).hours(20).minutes(0).seconds(0);
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

		if (Math.ceil((nextTuesdayEndShow - today)/1000) <= 3600){
			document.getElementById("nextShow").innerHTML = "We're Live!";
		}
	}
	
	window.setInterval(getNextShow, 1000);



