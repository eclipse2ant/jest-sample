const {statement, amountFor, volumeCreditsFor, usd, totalvolumeCredits,
  totalAmount, renderPlainText, enrichPerformance
}
   = require('./statement');

const invoices = require('./invoices.json');
const plays = require('./plays.json');
const statementData =
{ "customer":"BigCo",
  "performances":[
    {"playID":"hamlet",
      "audience":55,
      "play":{"name":"Hamlet", "type":"tragedy"},
      "amount": 65000
    },
    {"playID":"as-like",
      "audience":35,
      "play":{"name":"As You Like It","type":"comedy"},
      "amount": 58000
    },
    {"playID":"othello",
      "audience":40,
      "play":{"name":"Othello","type":"tragedy"},
      "amount": 50000
    }
  ]
};


test('statement', () => {
  let result = 'Statement for BigCo\n';
  result += '  Hamlet: $650.00 (55 seats)\n';
  result += '  As You Like It: $580.00 (35 seats)\n';
  result += '  Othello: $500.00 (40 seats)\n';
  result += 'Amount owed is $1,730.00\n';
  result += 'You earned 47 credits\n';
  expect(statement(invoices[0], plays)).toBe(result);
});

test('amountFor', () => {
  expect(amountFor(invoices[0].performances[0])).toBe(65000);
  expect(amountFor(invoices[0].performances[1])).toBe(58000);
  expect(amountFor(invoices[0].performances[2])).toBe(50000);
});

test(`volumeCreditsFor`, () => {
  const statementData =
  { "customer":"BigCo",
  "performances":[
    {"playID":"hamlet",
      "audience":55,
      "play":{"name":"Hamlet", "type":"tragedy"},
      "amount": 65000
    },
    {"playID":"as-like",
      "audience":35,
      "play":{"name":"As You Like It","type":"comedy"},
      "amount": 58000
    },
    {"playID":"othello",
      "audience":40,
      "play":{"name":"Othello","type":"tragedy"},
      "amount": 50000
    }
  ]
};
  expect(volumeCreditsFor(statementData.performances[0])).toBe(25);
  expect(volumeCreditsFor(statementData.performances[1])).toBe(12);
  expect(volumeCreditsFor(statementData.performances[2])).toBe(10);
});

test(`usd`, () => {
  expect(usd(10)).toBe('$10.00');
  expect(usd(0.1)).toBe('$0.10');
  expect(usd(-0.01)).toBe('-$0.01');
  expect(usd(-0.004)).toBe('-$0.00');
  expect(usd(-0.005)).toBe('-$0.01');
});

test('totalVolumeCredits', () => {
  expect(totalvolumeCredits(statementData)).toBe(47);
});

test('totalAmount', () => {
  expect(totalAmount(statementData)).toBe(173000);
});

test('renderPlainText', () => {
  const statementData =
    { "customer":"BigCo",
      "performances":[
        {"playID":"hamlet",
          "audience":55,
          "play":{"name":"Hamlet", "type":"tragedy"},
          "amount": 65000
        },
        {"playID":"as-like",
          "audience":35,
          "play":{"name":"As You Like It","type":"comedy"},
          "amount": 58000
        },
        {"playID":"othello",
          "audience":40,
          "play":{"name":"Othello","type":"tragedy"},
          "amount": 50000
        }
      ]
    };
  let result = 'Statement for BigCo\n';
  result += '  Hamlet: $650.00 (55 seats)\n';
  result += '  As You Like It: $580.00 (35 seats)\n';
  result += '  Othello: $500.00 (40 seats)\n';
  result += 'Amount owed is $1,730.00\n';
  result += 'You earned 47 credits\n';
  expect(renderPlainText(statementData, plays)).toBe(result);
});

test('enrichPerformance', () =>{
  const results =
  [{
    playID: 'hamlet',
    audience: 55,
    play: { name: 'Hamlet', type: 'tragedy' },
    amount: 65000
  },
  {
    playID: 'as-like',
    audience: 35,
    play: { name: 'As You Like It', type: 'comedy' },
    amount: 58000
  },
  {
    playID: 'othello',
    audience: 40,
    play: { name: 'Othello', type: 'tragedy' },
    amount: 50000
  }];
  
  expect(enrichPerformance(invoices[0].performances[0])).toStrictEqual(results[0]);
  expect(enrichPerformance(invoices[0].performances[1])).toStrictEqual(results[1]);
  expect(enrichPerformance(invoices[0].performances[2])).toStrictEqual(results[2]);
});