// animate-sequence.js - Crucifix Arnaud (hello@crucifixarnaud.com)
// Select items in sequence, and toggle class 'on'
// Doc and Download : https://github.com/CrucifixArnaud/sequence-action

/*------------------------------------------------------------------------*\
  @params
  ----------------------------------------------------------------------

  _target    : Parent of the items to animates (ul, div, etc)
  _params (optional): direction : forward - Animate from first to last child
                  backward - Animate from last to first child
            duraction : Interval between each step (ms)
            callback   : Do what you want

\*------------------------------------------------------------------------*/

var items;
var i;

var animateSequence = function(_target, _parameters) {
  items = _cleanWhitespace(_target).childNodes; // Remove all white space of the items list

  // Set options
  var _params   = _parameters || {};
  var _direction  = _params.direction || 'forward';
  var _duration   = _params.duration || 100;
  var _callback   = _params.callback || null;

  if(_direction === 'backward'){
    i = items.length - 1;
  }else{
    i = 0;
  }

  _step(_direction, _duration, function(){
    if(_callback && typeof(_callback) === 'function') {
      _callback();
    }
  });
};

// Homemade iterations - Repeat this action Every Step
var _step = function(_direction, _duration,_callback){
  clearTimeout(_stepTimeOut);
  if(i < items.length && _direction !== 'backward' || i >= 0 && _direction === 'backward'){
    items[i].classList.toggle('on');
    if(_direction === 'backward'){
      i--;
    }else{
      i++;
    }
    var _stepTimeOut = setTimeout(function(){
      _step(_direction, _duration, _callback);
    }, _duration);
  }else{
    if(_callback && typeof(_callback) === 'function') {
      _callback();
    }
  }
};

// Remove all white space of childnodek
var _cleanWhitespace = function(node){
  for (var i=0; i<node.childNodes.length; i++){
    var child = node.childNodes[i];
    if(child.nodeType === 3 && !/\S/.test(child.nodeValue)){
      node.removeChild(child);
      i--;
    }
    if(child.nodeType === 1){
      _cleanWhitespace(child);
    }
  }
  return node;
};

window.animateSequence = animateSequence;