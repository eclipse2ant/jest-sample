const {statement, amountFor} = require('./statement');

test('statement', () => {
  let result = 'Statement for BigCo\n';
  result += '  Hamlet: $650.00 (55 seats)\n';
  result += '  As You Like It: $580.00 (35 seats)\n';
  result += '  Othello: $500.00 (40 seats)\n';
  result += 'Amount owed is $1,730.00\n';
  result += 'You earned 47 credits\n';
  const invoices = require('./invoice.json');
  const plays = require('./plays.json');
  expect(statement(invoices[0],plays)).toBe(result);
});

test('amountFor', () => {
  const invoices = require('./invoice.json');
  const plays = require('./plays.json');
  let perfs = invoices[0].performances;
  expect(amountFor(invoices[0].performances[0],plays["hamlet"])).toBe(65000);
  expect(amountFor(invoices[0].performances[1],plays["as-like"])).toBe(58000);
  expect(amountFor(invoices[0].performances[2],plays["othello"])).toBe(50000);
});