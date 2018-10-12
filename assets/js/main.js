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

