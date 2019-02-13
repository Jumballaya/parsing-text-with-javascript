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

  skipWhiteSpace() {}

  readChar() {}
};
