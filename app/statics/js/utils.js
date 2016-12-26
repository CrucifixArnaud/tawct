// Remove all white space of childnode
const cleanWhitespace = function(node) {
  for (var i=0; i<node.childNodes.length; i++){
    var child = node.childNodes[i];
    if(child.nodeType === 3 && !/\S/.test(child.nodeValue)){
      node.removeChild(child);
      i--;
    }
    if(child.nodeType === 1){
      cleanWhitespace(child);
    }
  }
  return node;
};

window.cleanWhitespace = cleanWhitespace;