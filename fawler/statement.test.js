const {statement, usd, renderPlainText, htmlStatement
}

= require('./statement');

const {createStatementData, PerformanceCalculator} 

= require(`./createStatementData`);

const invoices = require('./invoices.json');
const plays = require('./plays.json');
const statementData =
{ "customer":"BigCo",
  "performances":[
    { "playID":"hamlet",
      "audience":55,
      "play":{"name":"Hamlet", "type":"tragedy"},
      "amount": 65000,
      "volumeCredits": 25
    },
    { "playID":"as-like",
      "audience":35,
      "play":{"name":"As You Like It","type":"comedy"},
      "amount": 58000,
      "volumeCredits": 12
    },
    { "playID":"othello",
      "audience":40,
      "play":{"name":"Othello","type":"tragedy"},
      "amount": 50000,
      "volumeCredits": 10
    },
  ],
  "totalAmount":173000,
  "totalVolumeCredits":47
};

test('PerformanceCalculator', () => {
  const aPerformance = invoices[0].performances[0];
  const aplay = {"name":"Hamlet", "type":"tragedy"};
  const calculator = new PerformanceCalculator(aPerformance, aplay);
  expect(calculator.performance).toStrictEqual({ playID: 'hamlet', audience: 55 });
  expect(calculator.play).toStrictEqual( { name: 'Hamlet', type: 'tragedy' });
  expect(calculator.amount).toBe(65000);
  expect(calculator.volumeCredits).toBe(25);
//  console.log(calculator);
}); 

test('statement', () => {
  let result = 'Statement for BigCo\n';
  result += '  Hamlet: $650.00 (55 seats)\n';
  result += '  As You Like It: $580.00 (35 seats)\n';
  result += '  Othello: $500.00 (40 seats)\n';
  result += 'Amount owed is $1,730.00\n';
  result += 'You earned 47 credits\n';
  expect(statement(invoices[0], plays)).toBe(result);
});

test('htmlStatement', () => {
  let result = "<h1>Statement for BigCo</h1>\n";
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>  ";
  result += "<tr><td>Hamlet</td><td>55</td><td>$65,000.00</td></tr>\n";
  result += "  <tr><td>As You Like It</td><td>35</td><td>$58,000.00</td></tr>\n";
  result += "  <tr><td>Othello</td><td>40</td><td>$50,000.00</td></tr>\n";
  result += "</table>\n";
  result += "<p>Amount owed is <em>$173,000.00</em></p>\n";
  result += "<p>You earned <em>47</em> credits</p>\n";
  expect(htmlStatement(invoices[0],plays)).toBe(result);
});
/*
test('playFor', () => {
  expect(playFor(invoices[0].performances[0])).toStrictEqual({"name":"Hamlet", "type":"tragedy"});
  expect(playFor(invoices[0].performances[1])).toStrictEqual({"name":"As You Like It","type":"comedy"});
  expect(playFor(invoices[0].performances[2])).toStrictEqual({"name":"Othello","type":"tragedy"});
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
  ],
  "totalAmount":173000,
  "totalVolumeCredits":47
};
  expect(volumeCreditsFor(statementData.performances[0])).toBe(25);
  expect(volumeCreditsFor(statementData.performances[1])).toBe(12);
  expect(volumeCreditsFor(statementData.performances[2])).toBe(10);
});
*/
test(`usd`, () => {
  expect(usd(10)).toBe('$10.00');
  expect(usd(0.1)).toBe('$0.10');
  expect(usd(-0.01)).toBe('-$0.01');
  expect(usd(-0.004)).toBe('-$0.00');
  expect(usd(-0.005)).toBe('-$0.01');
});


/*
test('totalVolumeCredits', () => {
  expect(totalvolumeCredits(statementData)).toBe(47);
});
*/

/*
test('totalAmount', () => {
  expect(totalAmount(statementData)).toBe(173000);
});
*/

test('renderPlainText', () => {
  const statementData =
    { "customer":"BigCo",
      "performances":[
        {"playID":"hamlet",
          "audience":55,
          "play":{"name":"Hamlet", "type":"tragedy"},
          "amount": 65000,
          "volumeCredits": 25
        },
        {"playID":"as-like",
          "audience":35,
          "play":{"name":"As You Like It","type":"comedy"},
          "amount": 58000,
          "volumeCredits": 12
        },
        {"playID":"othello",
          "audience":40,
          "play":{"name":"Othello","type":"tragedy"},
          "amount": 50000,
          "volumeCredits": 10
        }
      ],
      "totalAmount":173000,
      "totalVolumeCredits":47    
    };
  let result = 'Statement for BigCo\n';
  result += '  Hamlet: $650.00 (55 seats)\n';
  result += '  As You Like It: $580.00 (35 seats)\n';
  result += '  Othello: $500.00 (40 seats)\n';
  result += 'Amount owed is $1,730.00\n';
  result += 'You earned 47 credits\n';
  expect(renderPlainText(statementData)).toBe(result);
});

/*
test('enrichPerformance', () =>{
  const results =
  [{
    playID: 'hamlet',
    audience: 55,
    play: { name: 'Hamlet', type: 'tragedy' },
    amount: 65000,
    volumeCredits: 25
  },
  {
    playID: 'as-like',
    audience: 35,
    play: { name: 'As You Like It', type: 'comedy' },
    amount: 58000,
    volumeCredits: 12
  },
  {
    playID: 'othello',
    audience: 40,
    play: { name: 'Othello', type: 'tragedy' },
    amount: 50000,
    volumeCredits: 10
  }];
  

  expect(enrichPerformance(invoices[0].performances[0])).toStrictEqual(results[0]);
  expect(enrichPerformance(invoices[0].performances[1])).toStrictEqual(results[1]);
  expect(enrichPerformance(invoices[0].performances[2])).toStrictEqual(results[2]);
});
*/