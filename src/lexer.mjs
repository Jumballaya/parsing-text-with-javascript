/**
 * Lexer
 *
 * Turns a string like '3 + 4' into tokens
 */
import * as tokens from './tokens.mjs';

export default class Lexer {
  constructor(input) {
    this.input = input;
    this.pos = -1;
    this.readPos = 0;
    this.ch = '';

    this.readChar();
  }

  nextToken() {}

  skipWhiteSpace() {
    while (this.ch === ' ') {
      this.readChar();
    }
  }

  readChar() {
    // End of the input
    if (this.readPos >= this.input.length) {
      this.ch = ';';
    } else {
      this.ch = this.input[this.readPos];
    }
    this.pos = this.readPos;
    this.readPos += 1;
  }
};
