# PrintableObject
Stringifies objects, arrays and everything in between.

## Usage
1. install the node package using:
  ```
  npm install --save printable-object
  ```
2. import the package into your file/project using:

  ```
  import PrintableObject from 'printable-object';
  ```
  or
  
  ```
  const PrintableObject = require('printable-object');
  ```
3. Use it! (Check out the example)

## Parameters
```
PrintableObject(param, padSize, initialPadding, initial**); // returns the stringified version of the input param
```

- **param** the variable you are trying to stringify
- **padSize** number of space characters to left-pad each line with
- **initialPadding** the initial number of left-pad spaces
- **initial&ast;&ast;** this is used internally during recursion. Ignore this for now and it will be removed in the future releases.
