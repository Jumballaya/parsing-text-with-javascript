# Parsing text with JavaScript

Text interpreter for simple math calculations. [This is my blog post explaining how to build it.](https://www.pburris.me/blog/parsing-text-with-javascript)


## Example

Simple example:

```
import calculator from 'calculator';

let input = '5 * 12';
let { output } = calculator.evaluate(input);
console.log(output) // [60]
```
