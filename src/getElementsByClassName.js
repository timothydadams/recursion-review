// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {

  var matches = [];
  //create array to populate

  var search = function(node) {
    if (node.classList.contains(className)){
      matches.push(node);
    }

    if (node.hasChildNodes()){
      for (let i = 0; i < node.children.length; i++) {
        search(node.children[i]);
      }
    }
  };

  search(document.body);
  //initiates recursion

  return matches;
  //returns output array

};

