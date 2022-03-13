const {statement, amountFor, volumeCreditsFor, format}
   = require('./statement');

const invoices = require('./invoices.json');
//  const plays = require('./plays.json');


test('statement', () => {
  let result = 'Statement for BigCo\n';
  result += '  Hamlet: $650.00 (55 seats)\n';
  result += '  As You Like It: $580.00 (35 seats)\n';
  result += '  Othello: $500.00 (40 seats)\n';
  result += 'Amount owed is $1,730.00\n';
  result += 'You earned 47 credits\n';
  expect(statement(invoices[0])).toBe(result);
});

test('amountFor', () => {
  expect(amountFor(invoices[0].performances[0])).toBe(65000);
  expect(amountFor(invoices[0].performances[1])).toBe(58000);
  expect(amountFor(invoices[0].performances[2])).toBe(50000);
});

test(`volumeCreditsFor`, () => {
  expect(volumeCreditsFor(invoices[0].performances[0])).toBe(25)
  expect(volumeCreditsFor(invoices[0].performances[1])).toBe(12)
  expect(volumeCreditsFor(invoices[0].performances[2])).toBe(10)
});

test(`format`, () => {
  expect(format(10)).toBe('$10.00')
  expect(format(0.1)).toBe('$0.10')
  expect(format(-0.01)).toBe('-$0.01')
  expect(format(-0.004)).toBe('-$0.00')
  expect(format(-0.005)).toBe('-$0.01')
});
