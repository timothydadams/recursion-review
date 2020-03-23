// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  //create output array to populate
  var output = '';

  //filter input types
  //if string, add "" around obj and return
  if (typeof obj === 'string') {
    return `"${obj}"`;
  }

  //if number, null, or boolean, convert to string, then return string
  if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
    return `${obj}`;
  }

  //if undefined, symbol, Infinity, NaN or function, return null
  if (typeof obj === undefined || typeof obj === 'symbol' || typeof obj === 'function') {
    return null;
  }

  // if obj is an array
  if (Array.isArray(obj)) {
    //declare empty array to temporarily store values of an array
    var outputArray = [];
    //if the obj array is empty, specify return value of []
    if (obj.length === 0) {
      return '[]';
    }
    //iterate over each item in the array
    obj.forEach(function(value) {
      //set value to null if its undefined, a symbol or Function
      if (value === undefined || typeof value === 'symbol' || value instanceof Function) {
        value = null;
      }
      //call stringifyJSON on value and store the return value in the outputArray
      outputArray.push(stringifyJSON(value));
    });
    return `[${outputArray}]`;
  }

  //if obj is an object
  if (obj instanceof Object) {
    //if object is empty
    if (Object.keys(obj).length === 0) {
      return '{}';
    }
    //create count for properly adding commas
    var count = Object.keys(obj).length;
    //checking fo r undefined, symbols, and functions
    for (var key in obj) {
      if (obj[key] === undefined || typeof obj[key] === 'symbol' || obj[key] instanceof Function) {
        continue;
      }
      output += `${stringifyJSON(key)}:${stringifyJSON(obj[key])}`;
      //if object has more than 1 key, add comma
      if (count > 1) {
        output += ',';
      }
      count--;
    }
    return `{${output}}`;
  }
};
