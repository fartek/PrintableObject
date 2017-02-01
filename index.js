/**
 * Stringifies objects, arrays and everything in between.
 * 
 * @param  {Any type}   param           The variable which is to be stringified.
 * @param   {Integer}   padSize         Number of spaces to left-pad with
 * @param   {Integer}   initialPadding  The amount of initial spaces for the left-padding.
 * @returns {String} The stringified version of the object, array, whatever was passed in.
 */
const PrintableObject = (param, padSize = 2, initialPadding = 0, quoteChar = '\'') => {
  return _PrintableObject(param, padSize, initialPadding, quoteChar, true);
};

const _PrintableObject = (param, padSize = 2, initialPadding = 0, quoteChar = '\'', initial = true) => {
  // If the param is an Object (object or array),
  //   1. Prepend everything with the proper brackets (only once - only if it is initial)
  //   2. pad everything properly
  const tabs = initial && typeof param === 'object' ? initialPadding + padSize : initialPadding;
  if (param && typeof param === 'object' && !Array.isArray(param)) { // If the param is an Object (as in {} and not an array)
    let objString = initial ? `${Array(initialPadding + 1).join(' ')}{\n` : ''; // Prepend everything with the proper brackets
    for (const key in param) {
      if (Object.prototype.hasOwnProperty.call(param, key)) {
        // For every object's property, check the type,
        // add the proper amound of padding and the value or
        // recursivelly repeat
        const val = param[key];
        if (val && typeof val === 'object' && !Array.isArray(val)) { // It is an object (as in {}) and not an array
          objString += `${Array(tabs + 1).join(' ')}${key}: {\n${PrintableObject(val, padSize, tabs + padSize, false)}${Array(tabs + 1).join(' ')}},\n`;
        } else if (val && Array.isArray(val)) { // It is an array
          objString += `${Array(tabs + 1).join(' ')}${key}: [\n${PrintableObject(val, padSize, tabs + padSize, false)}${Array(tabs + 1).join(' ')}],\n`;
        } else if (typeof val === 'number') { // It is a number
          objString += `${Array(tabs + 1).join(' ')}${key}: ${val},\n`;
        } else { // Everything else (usually string)
          objString += `${Array(tabs + 1).join(' ')}${key}: ${quoteChar}${val}${quoteChar},\n`;
        }
      }
    }
    return `${objString}${initial ? Array(initialPadding + 1).join(' ') + '}\n' : ''}`;
  } else if (param && Array.isArray(param)) {  // If the param is an array
    // Do mostly the same stuff as with Objects ({}), but with the squre brackets
    let elems = initial ? `${Array(initialPadding + 1).join(' ')}[\n` : '';
    for (const elem of param) {
      if (elem && typeof elem === 'object' && !Array.isArray(elem)) {
        elems += `${Array(tabs + 1).join(' ')}{\n${PrintableObject(elem, padSize, tabs + padSize, false)}${Array(tabs + 1).join(' ')}},\n`;
      } else if (elem && Array.isArray(elem)) {
        elems += `${Array(tabs + 1).join(' ')}[\n${PrintableObject(elem, padSize, tabs + padSize, false)}${Array(tabs + 1).join(' ')}],\n`;
      } else if (typeof elem === 'number') {
        elems += `${Array(tabs + 1).join(' ')}${elem},\n`;
      } else {
        elems += `${Array(tabs + 1).join(' ')}${quoteChar}${elem}${quoteChar},\n`;
      }
    }
    return `${elems}${initial ? Array(initialPadding + 1).join(' ') + ']\n' : ''}`;
  } else if (param && typeof param === 'number') {
    // If the param is a number, prepend it with spaces
    // and don't surround it with quotes
    return `${Array(tabs + 1).join(' ')}${param}\n`;
  }
  // For everything else - suround it with quotes
  return `${Array(tabs + 1).join(' ')}${quoteChar}${param}${quoteChar}\n`;
}

module.exports = PrintableObject;