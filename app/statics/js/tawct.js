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
  let globalWidth = globalTag.offsetWidth;

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

  let key = e.keyCode,
    currentScrollPos,
    galleryWidth = gallery.offsetWidth;

  if(horizontalScroll === true) {
    currentScrollPos = window.pageXOffset;
    if(key === 37 || key === 38 || key === 38) {
      e.preventDefault();
      window.scrollTo(currentScrollPos - (500), 0);
    } else if(key === 39 || key === 40 || key === 40) {
      e.preventDefault();
      window.scrollTo(currentScrollPos + (500), 0);
    } else if(key === 33) {
      e.preventDefault();
      window.scrollTo(currentScrollPos - (5000), 0);
    } else if(key === 34) {
      e.preventDefault();
      window.scrollTo(currentScrollPos + (5000), 0);
    } else if(key === 35) {
      e.preventDefault();
      window.scrollTo(galleryWidth, 0);
    } else if (key === 36) {
      e.preventDefault();
      window.scrollTo(0, 0);
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
