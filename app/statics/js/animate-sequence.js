// animate-sequence.js - Crucifix Arnaud (hello@crucifixarnaud.com)
// Select items in sequence, and toggle class 'on'
// Doc and Download : https://github.com/CrucifixArnaud/sequence-action

/*------------------------------------------------------------------------*\
  @params
  ----------------------------------------------------------------------

  target: Parent of the items to animates (ul, div, etc)
  params (optional): direction : forward - Animate from first to last child
    backward - Animate from last to first child
    duraction: Interval between each step (ms)
    callback: Do what you want

\*------------------------------------------------------------------------*/

const animateSequence = function(target, parameters) {
  const items = window.cleanWhitespace(target).childNodes; // Remove all white space of the items list

  var i;

  // Set options
  const params   = parameters || {};
  const direction  = params.direction || 'forward';
  const duration   = params.duration || 100;
  const callback   = params.callback || null;

  if(direction === 'backward') {
    i = items.length - 1;
  } else {
    i = 0;
  }

  // Homemade iterations - Repeat this action Every Step
  const step = function(direction, duration, callback) {
    clearTimeout(stepTimeOut);
    if(i < items.length && direction !== 'backward' || i >= 0 && direction === 'backward') {
      items[i].classList.toggle('on');

      if(direction === 'backward'){
        i--;
      } else {
        i++;
      }

      var stepTimeOut = setTimeout(function() {
        step(direction, duration, callback);
      }, duration);

    } else {

      if(callback && typeof(callback) === 'function') {
        callback();
      }

    }
  };

  step(direction, duration, function() {
    if(callback && typeof(callback) === 'function') {
      callback();
    }
  });

};

window.animateSequence = animateSequence;