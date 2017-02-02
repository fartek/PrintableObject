const leftPad = (text) => Array(text + 1).join(' ');

/**
 * Stringifies objects, arrays and everything in between.
 * 
 * @param   {Any}      param           The variable which is to be stringified.
 * @param   {Number}   padSize         Number of spaces to left-pad with
 * @param   {Number}   initialPadding  The amount of initial spaces for the left-padding.
 * @param   {String}   quoteChar       The character used for quotation marks
 * @param   {Number}   maxDepth        The maximum depth of an object that can be printed.
 *                                     Used to stop infinite recursion calls and unreadable prints. 
 * @returns {String}                    The stringified version of the object, array, whatever was passed in.
 */
const PrintableObject = (param, padSize = 2, initialPadding = 0, quoteChar = '\'', maxDepth = 8) =>
  _PrintableObject(param, padSize, initialPadding, quoteChar, maxDepth);

const _PrintableObject = (param, padSize, initialPadding, quoteChar, maxDepth, initial = true, depth = 0) => {
  // If the param is an Object (object or array),
  //   1. Prepend everything with the proper brackets (only once - only if it is initial)
  //   2. pad everything properly
  const tabs = initial && typeof param === 'object' ? initialPadding + padSize : initialPadding;

  if (depth >= maxDepth) {
    return `${leftPad(tabs)}'Reached max depth. To view further, change the maxDepth parameter.'\n`;
  }

  if (typeof param === 'object' && !Array.isArray(param)) { // If the param is an Object (as in {} and not an array)
    let objString = initial ? `${leftPad(initialPadding)}{\n` : ''; // Prepend everything with the proper brackets
    for (const key in param) {
      if (Object.prototype.hasOwnProperty.call(param, key)) {
        // For every object's property, check the type,
        // add the proper amount of padding and the value or
        // recursively repeat
        const val = param[key];
        if (val && typeof val === 'object' && !Array.isArray(val)) { // It is an object (as in {}) and not an array
          objString += `${leftPad(tabs)}${key}: {\n${
            _PrintableObject(val, padSize, tabs + padSize, quoteChar, maxDepth, false, depth + 1)
          }${leftPad(tabs)}},\n`;
        } else if (val && Array.isArray(val)) { // It is an array
          objString += `${leftPad(tabs)}${key}: [\n${
            _PrintableObject(val, padSize, tabs + padSize, quoteChar, maxDepth, false, depth + 1)
          }${leftPad(tabs)}],\n`;
        } else if (typeof val === 'number') { // It is a number
          objString += `${leftPad(tabs)}${key}: ${val},\n`;
        } else { // Everything else (usually string)
          objString += `${leftPad(tabs)}${key}: ${quoteChar}${val}${quoteChar},\n`;
        }
      }
    }
    return `${objString}${initial ? leftPad(initialPadding) + '}\n' : ''}`;
  } else if (typeof param !== 'undefined' && Array.isArray(param)) {  // If the param is an array
    // Do mostly the same stuff as with Objects ({}), but with the square brackets
    let elems = initial ? `${leftPad(initialPadding)}[\n` : '';
    for (const elem of param) {
      if (elem && typeof elem === 'object' && !Array.isArray(elem)) {
        elems += `${leftPad(tabs)}{\n${
          _PrintableObject(elem, padSize, tabs + padSize, quoteChar, maxDepth, false, depth + 1)
        }${leftPad(tabs)}},\n`;
      } else if (elem && Array.isArray(elem)) {
        elems += `${leftPad(tabs)}[\n${
          _PrintableObject(elem, padSize, tabs + padSize, quoteChar, maxDepth, false, depth + 1)
        }${leftPad(tabs)}],\n`;
      } else if (typeof elem === 'number') {
        elems += `${leftPad(tabs)}${elem},\n`;
      } else {
        elems += `${leftPad(tabs)}${quoteChar}${elem}${quoteChar},\n`;
      }
    }
    return `${elems}${initial ? leftPad(initialPadding) + ']\n' : ''}`;
  } else if (param && typeof param === 'number') {
    // If the param is a number, prepend it with spaces
    // and don't surround it with quotes
    return `${leftPad(tabs)}${param}\n`;
  }
  // For everything else - surround it with quotes
  return `${leftPad(tabs)}${quoteChar}${param}${quoteChar}\n`;
}

module.exports = PrintableObject;