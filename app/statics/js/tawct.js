/*--------------------------
 *
 *  tawct.js
 *  @author Crucifix Arnaud
 *
 *-------------------------*/

// Init
//-------------------------
const globalTag = document.getElementById('global');
const gallery = document.getElementById('gallery');

window.onload = function() {
  // Lazy Load
  new LazyLoad({
    threshold: 1920
  });
  // Check scroll
  checkScroll();
  // remove class
  globalTag.classList.remove('no-js');
  gallery.classList.remove('cf');
};

// Checkscroll
// Toggle customscrolling according to the windows size
//-------------------------
let horizontalScroll = false;

function checkScroll() {
  const globalWidth = globalTag.offsetWidth;

  if (globalWidth > 608) {
    horizontalScroll = true;
  } else {
    horizontalScroll = false;
  }
}

// Windows Resizer Listener
//-------------------------
window.onresize = function() {
  checkScroll();
};

// Keyboard nav
// ---------------------
window.onkeydown = function(e) {
  var _key = e.keyCode,
    _currentScrollPos;
  if(horizontalScroll === true) {
    _currentScrollPos = window.pageXOffset;
    if(_key === 37 || _key === 38) {
      window.scrollTo(_currentScrollPos - (2 * 250), 0);
      e.preventDefault();
    } else if(_key === 39 || _key === 40) {
      window.scrollTo(_currentScrollPos + (2 * 250), 0);
      e.preventDefault();
    }
  } else {
    _currentScrollPos = window.pageYOffset;
    if (_key === 37 || _key === 38) {
      window.scrollTo(0, _currentScrollPos - (1 * 520));
      e.preventDefault();
    } else if (_key === 39 || _key === 40) {
      window.scrollTo(0, _currentScrollPos + (1 * 520));
      e.preventDefault();
    }
  }
};

// Horizontal scroll
// ---------------------
function doScroll (e) {
  // If custom scroll, scroll horizontal
  if (horizontalScroll === true) {
    e = window.event || e;
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    window.scrollBy(-delta * 100, 0);
    e.preventDefault();
  }
}

if (window.addEventListener) {
  window.addEventListener('mousewheel', doScroll, false);
  window.addEventListener('DOMMouseScroll', doScroll, false);
} else {
  // Fallback for old bunker
  window.attachEvent('onmousewheel', doScroll);
}

// About
//-------------------------
const itemsList = document.getElementById('about');
const btnAbouts = document.querySelectorAll('.link-about');
let itemsListState = false;
let animationState = false;
let uglyTimerHack;

function btnAboutHandler () {
  return function (e) {
    e.preventDefault();
    // Prevent click during animation
    if(animationState === false) {
      animationState = true;
      if(itemsListState === false){
        itemsList.classList.toggle('on');
        animateSequence(itemsList, {
          direction: 'forward',
          duration: 50,
          callback: function() {
            animationState = false; // toggle animationstate
            itemsListState = true;
          }
        });
      } else {
        animateSequence(itemsList, {
          direction: 'backward',
          duration: 50,
          callback: function(){
            uglyTimerHack = setTimeout(function(){
              clearTimeout(uglyTimerHack);
              itemsList.classList.toggle('on');
              itemsListState = false;
              animationState = false; // toggle animationstate
            }, 400);
          }
        });
      }
    }
  };
}

btnAbouts.forEach(btnAbout => btnAbout.addEventListener('click', btnAboutHandler()));
