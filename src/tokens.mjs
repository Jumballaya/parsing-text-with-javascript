/**
 * Tokens
 */

export const PLUS = 'PLUS';
export const MINUS = 'MINUS';
export const BANG = 'BANG';
export const ASTERISK = 'ASTERISK';
export const SLASH = 'SLASH';
export const MODULO = 'MODULO';
export const POWER = 'POWER';
export const LPAREN = 'LPAREN';
export const RPAREN = 'RPAREN';
export const NUMBER = 'NUMBER';
export const ILLEGAL = 'ILLEGAL';
export const EOF = 'EOF';

// Token Types
const types = {
  PLUS: '+',
  MINUS: '-',
  BANG: '!',
  ASTERISK: '*',
  SLASH: '/',
  MODULO: '%',
  POWER: '^',
  LPAREN: '(',
  RPAREN: ')',
  NUMBER: '_',
  ILLEGAL: 'illegal',
  EOF: '',
};

/**
 * Create Token
 */
export const newToken = type => ({
  type,
  literal: types[type],
});
