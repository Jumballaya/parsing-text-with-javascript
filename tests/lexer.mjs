import assert from 'assert';
import Lexer from '../src/lexer.mjs';
import * as tokens from '../src/tokens.mjs';

/**
 *
 * Test if the Lexer creates the correct tokens with the nextToken function
 *
 *
 */
const testNextToken = () => {
  const tests = [
    {
      input: '3 + 3',
      expected: [
        { type: tokens.NUMBER, literal: '3' },
        { type: tokens.PLUS, literal: '+' },
        { type: tokens.NUMBER, literal: '3' },
        { type: tokens.EOF, literal: '' },
      ],
    },
    {
      input: '100 - 50 + 20',
      expected: [
        { type: tokens.NUMBER, literal: '100' },
        { type: tokens.MINUS, literal: '-' },
        { type: tokens.NUMBER, literal: '50' },
        { type: tokens.PLUS, literal: '+' },
        { type: tokens.NUMBER, literal: '20' },
        { type: tokens.EOF, literal: '' },
      ],
    },
    {
      input: '10 * 6 / 10',
      expected: [
        { type: tokens.NUMBER, literal: '10' },
        { type: tokens.ASTERISK, literal: '*' },
        { type: tokens.NUMBER, literal: '6' },
        { type: tokens.SLASH, literal: '/' },
        { type: tokens.NUMBER, literal: '10' },
        { type: tokens.EOF, literal: '' },
      ],
    },
    {
      input: '100 - 57 + 6 * 33 / 17 % 6',
      expected: [
        { type: tokens.NUMBER, literal: '100' },
        { type: tokens.MINUS, literal: '-' },
        { type: tokens.NUMBER, literal: '57' },
        { type: tokens.PLUS, literal: '+' },
        { type: tokens.NUMBER, literal: '6' },
        { type: tokens.ASTERISK, literal: '*' },
        { type: tokens.NUMBER, literal: '33' },
        { type: tokens.SLASH, literal: '/' },
        { type: tokens.NUMBER, literal: '17' },
        { type: tokens.MODULO, literal: '%' },
        { type: tokens.NUMBER, literal: '6' },
        { type: tokens.EOF, literal: '' },
      ],
    },
  ]

  tests.forEach((tt, tn) => {
    const l = new Lexer(tt.input);
    let i = 0;
    let tok = l.nextToken();
    while (tok.type !== tokens.EOF) {
      assert(tok.type === tt.expected[i].type, `Tests #${tn} Token #${i} failed. expected ${tt.expected[i].type}, got: ${tok.type}`);
      tok = l.nextToken();
      i++;
    }
  })

  console.log("\n\tTest Next Token Passed!!\n");
}


testNextToken();
