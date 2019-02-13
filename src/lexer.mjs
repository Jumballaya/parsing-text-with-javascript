/**
 * Lexer
 *
 * Turns a string like '3 + 4' into tokens
 */
import * as tokens from './tokens.mjs';

const isNumber = n => {
  if (n === ' ') return false;
  return Number(n) >= 0 || Number(n) <= 9;
};

export default class Lexer {
  constructor(input) {
    this.input = input;
    this.pos = 0;
    this.readPos = 0;
    this.ch = '';

    this.readChar();
  }

  nextToken() {
    this.skipWhiteSpace();
    let tok = {};

    switch (this.ch) {
      case '+':
        tok = tokens.newToken(tokens.PLUS);
        break;
      case '-':
        tok = tokens.newToken(tokens.MINUS);
        break;
      case '/':
        tok = tokens.newToken(tokens.SLASH);
        break;
      case '*':
        tok = tokens.newToken(tokens.ASTERISK);
        break;
      case '!':
        tok = tokens.newToken(tokens.BANG);
        break;
      case '^':
        tok = tokens.newToken(tokens.POWER);
        break;
      case '%':
        tok = tokens.newToken(tokens.MODULO);
        break;
      case '(':
        tok = tokens.newToken(tokens.LPAREN);
        break;
      case ')':
        tok = tokens.newToken(tokens.RPAREN);
        break;
      case ';':
        tok = tokens.newToken(tokens.EOF);
        break;
      default:
        // Check if number
        if (!Number.isNaN(this.ch)) {
          let literal = '';
          while (isNumber(this.ch)) {
            literal += this.ch;
            this.readChar();
          }
          tok = { ...tokens.newToken(tokens.NUMBER), literal };
        } else {
          tok = tokens.newToken(tokens.ILLEGAL);
        }
    }

    this.readChar();
    return tok;
  }

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
