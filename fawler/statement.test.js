const {statement, amountFor} = require('./statement');

test('statement', () => {
  let result = 'Statement for BigCo\n';
  result += '  Hamlet: $650.00 (55 seats)\n';
  result += '  As You Like It: $580.00 (35 seats)\n';
  result += '  Othello: $500.00 (40 seats)\n';
  result += 'Amount owed is $1,730.00\n';
  result += 'You earned 47 credits\n';
  const invoice = require('./invoice.json');
  const plays = require('./plays.json');
  expect(statement(invoice[0],plays)).toBe(result);
});

test('amountFor', () => {
  expect(1).toBe(1);
})