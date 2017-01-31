# PrintableObject
Stringifies objects, arrays and everything in between.

## Usage
1. install the node package using:
  ```
  npm install --save PrintableObject
  ```
2. import the package into your file/project using:

  ```
  import PrintableObject from 'PrintableObject';
  ```
  or
  
  ```
  const PrintableObject = require('PrintableObject');
  ```
3. Use it! (Check out the example)

## Parameters
```
PrintableObject(param, padSize, initialPadding, initial**);
```

- **param** the variable you are trying to stringify
- **padSize** number of space characters to left-pad each line with
- **initialPadding** the initial number of left-pad spaces
- **initial&ast;&ast;** this is used internally during recursion. Ignore this for now and it will be removed in the future releases.
