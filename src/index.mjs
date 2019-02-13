import Parser from './parser';
import evaluate from './evaluator';

export default {
  evaluate: input => {
    const p = new Parser(input);
    const program = p.parse();
    return {
      output: p.errors.length ? [] : program.map(pg => evaluate(pg)),
      errors: p.errors,
    };
  },
};
