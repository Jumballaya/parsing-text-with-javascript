/**
 * Evaluator
 */
const calc = (left, right, operator) => {
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      return left / right;
    case '^':
      return left ** right;
    case '%':
      return left % right;
    default:
      return 'ERROR';
  }
};

const evaluate = ({ operator, left, right }) => {
  if (left.left && left.right) {
    left.value = evaluate(left);
  }
  if (right.left && right.right) {
    right.value = evaluate(right);
  }
  if (left.value && right.value) {
    return calc(left.value, right.value, operator);
  }
};

export default evaluate;
