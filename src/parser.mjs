/**
 * Parser
 *
 * Parses strings like '3 + 3' to tokens
 */
import Lexer from './lexer';
import * as tokens from './tokens';

const precLowest = 0;
const precSum = 1;
const precProd = 2;
const precBlock = 3;

const precedences = {
  [tokens.PLUS]: precSum,
  [tokens.MINUS]: precSum,
  [tokens.ASTERISK]: precProd,
  [tokens.SLASH]: precProd,
  [tokens.POWER]: precProd,
  [tokens.MODULO]: precProd,
  [tokens.LPAREN]: precBlock,
};

export default class Parser {
  constructor(input) {
    const lexer = new Lexer(input);
    this.lexer = lexer;
    this.currentToken = null;
    this.peekToken = lexer.nextToken();
    this.lastToken = null;
    this.errors = [];

    this.infixFns = {
      [tokens.PLUS]: this.parseInfix.bind(this),
      [tokens.MINUS]: this.parseInfix.bind(this),
      [tokens.ASTERISK]: this.parseInfix.bind(this),
      [tokens.SLASH]: this.parseInfix.bind(this),
      [tokens.POWER]: this.parseInfix.bind(this),
      [tokens.MODULO]: this.parseInfix.bind(this),
    };

    this.prefixFns = {
      [tokens.NUMBER]: this.parseNumber.bind(this),
      [tokens.LPAREN]: this.parseBlock.bind(this),
    };

    this.nextToken();
  }

  parse() {
    const program = [];
    while (!this.currentTokenIs(tokens.EOF)) {
      const stmt = this.parseStatement();
      if (stmt) program.push(stmt);
      this.nextToken();
    }
    return program;
  }

  parseStatement() {
    switch (this.currentToken.type) {
      case tokens.LPAREN:
        return this.parseBlock();
      default:
        return this.parseExpressionStatement();
    }
  }

  nextToken() {
    this.lastToken = this.currentToken;
    this.currentToken = this.peekToken;
    this.peekToken = this.lexer.nextToken();

    if (this.currentTokenIs(tokens.ILLEGAL)) {
      this.errors.push(`got illegal token: ${this.currentToken.literal}`);
      this.nextToken();
    }
  }

  currentTokenIs(token) {
    return this.currentToken.type === token;
  }

  peekTokenIs(token) {
    return this.peekToken.type === token;
  }

  expectPeek(token) {
    if (this.peekTokenIs(token)) {
      this.nextToken();
      return true;
    }

    this.peekError(token);
    return false;
  }

  peekError(t) {
    const p = this.peekToken.type;
    const msg = `expected next token to be ${t}, got ${p} instead`;
    console.log(msg);
    this.errors.push(msg);
  }

  peekPrecedence() {
    return precedences[this.peekToken.type] || precLowest;
  }

  currentPrecedence() {
    return precedences[this.currentToken.type] || precLowest;
  }

  noFuncError(type) {
    const msg = `no function for ${type} found`;
    console.log(msg);
    this.errors.push(msg);
  }

  parseNumber() {
    const expression = {
      token: this.currentToken,
      value: Number(this.currentToken.literal),
    };
    return expression;
  }

  parseInfix(left) {
    const expression = {
      token: this.currentToken,
      operator: this.currentToken.literal,
      left,
    };
    const p = this.currentPrecedence();
    this.nextToken();
    expression.right = this.parseExpression(p);
    return expression;
  }

  parseExpressionStatement() {
    return this.parseExpression(precLowest);
  }

  parseExpression(precedence) {
    const prefix = this.prefixFns[this.currentToken.type];
    if (!prefix) {
      this.noFuncError(this.currentToken.type);
      return null;
    }
    let left = prefix();

    while (
      !this.peekTokenIs(tokens.EOF) &&
      precedence < this.peekPrecedence()
    ) {
      const infix = this.infixFns[this.peekToken.type];
      if (!infix) {
        return left;
      }
      this.nextToken();
      left = infix(left);
    }

    return left;
  }

  parseBlock() {}
};
