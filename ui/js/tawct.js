/*--------------------------
 *
 *	tawct.js
 *	@author Crucifix Arnaud
 *
 *-------------------------*/

// Init
//-------------------------
var bodyTag = $('body');
var globalTag = document.getElementById("global");
var gallery		= document.getElementById("gallery");

var customScroll = true;

// Checkscroll
// Toggle customscrolling according to the windows size
//-------------------------
function checkScroll(){
	var globalWidth = globalTag.offsetWidth;
	
	if(globalWidth <= 450){
		customScroll = false;
	}else{
		customScroll = true;
	}
}

$(function(){
	
	// remove class
	//-------------------------
	$(globalTag).removeClass('no-js');
	$(gallery).removeClass('cf');
	
	// Browser Detection
	// browsersdetect.js
	//-------------------------
	var ua = BrowserDetect.browser;
		
	if(ua == 'Safari' || ua == 'Chrome'){
		globalTag.classList.add('text-fill');
	}	
	
	// Scroll handler
	//-------------------------
	
	checkScroll();	
		
	// Horizontal Scroll Handler
	// jquery.mousewheel.js
	//-------------------------
	bodyTag.mousewheel(function(e, delta){
		if(customScroll == true){
			e.preventDefault();
			var currentScrollPos = $(document).scrollLeft()
			window.scrollTo(currentScrollPos - (delta * 200), 0);
		}
	});   
	
	// Windows Resizer Listener
	//-------------------------
	
	window.onresize = function(e){
		checkScroll();
	}
	
	// Keyboard Nav Handler
	//-------------------------
	
	window.onkeydown = function(e){
		var _key = e.keyCode;
		if(customScroll == true){
			var _currentScrollPos = $(document).scrollLeft();
			if(_key == 37 || _key == 38){
				window.scrollTo(_currentScrollPos - (2 * 250), 0);
				e.preventDefault();
			}else if(_key == 39 || _key == 40){
				window.scrollTo(_currentScrollPos + (2 * 250), 0);
				e.preventDefault();
			}
		}else{
			var _currentScrollPos = $(document).scrollTop()
			if(_key == 37 || _key == 38){
				window.scrollTo(0, _currentScrollPos - (1 * 520));
				e.preventDefault();
			}else if(_key == 39 || _key == 40){
				window.scrollTo(0, _currentScrollPos + (1 * 520));
				e.preventDefault();
			}
		}
	}
	
	// About
	//-------------------------
	
	var aboutState = false;
	var firstLaunch = true;
	var nextLine = null;
	var timerNextLine = null;
	
	$('.about-line').removeClass('off');
	
	document.getElementById('link-about').onclick = function(e){
		e.preventDefault();
		if(false == aboutState){
			document.getElementById('about').className = 'on'
			nextLine = $('#about .about-line').first();
			_toggleAboutLine(nextLine);
			aboutState = true;
		}
	}			

	function _toggleAboutLine(target){
		clearTimeout(timerNextLine);
		nextLine = target.next('.about-line');
		if(target.hasClass('off') || true == firstLaunch){
			target.removeClass('off');
			target.addClass('on');
		}else{
			target.removeClass('on');
			target.addClass('off');
		}
		if(nextLine.length > 0){
			timerNextLine = setTimeout(function(){_toggleAboutLine(nextLine)}, 100)
		}else{					
			aboutState = false;
			firstLaunch = false;
		}
	} 
});