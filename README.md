# PrintableObject
Stringifies objects, arrays and everything in between.

## Usage
1. install the node package using:
    ```npm install --save printable-object```
2. import the package into your file/project using:
    ```import PrintableObject from 'printable-object';```
    or
    ```const PrintableObject = require('printable-object');```
3. Use it! (Check out the example)

## Parameters
```
PrintableObject(param, padSize, initialPadding, quoteChar, maxDepth); // returns the stringified version of the input param
```

- **param** The variable you are trying to stringify.
- **padSize** Number of space characters to left-pad each line with. *default = 2*
- **initialPadding** The initial number of left-pad spaces. *default = 0*
- **quoteChar** The quotation character used to surround strings. *default = '*
- **maxDepth** The maximum depth of an object that can be printed. Used to stop infinite recursion calls and unreadable prints. *default = 8*

## Example
Using the default settings:
```
import po from 'printable-object';

po({
  test: {
    test: 'hi',
    two: 2,
    array: [1, 2, 'test'],
  },
  six: 6,
  another: ['array', { example: '123' }],
});
```

Returns the string:
```
{
  test: {
    test: 'hi',
    two: 2,
    array: [
      1,
      2,
      'test',
    ],
  },
  six: 6,
  another: [
    'array',
    {
      example: '123',
    },
  ],
}
```