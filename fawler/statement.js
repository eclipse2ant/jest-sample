//const invoices = require('./invoices.json');
//const plays = require('./plays.json');

function statement (invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
  // print line for this order
    result += `  ${playFor(perf,plays).name}: ${usd(amountFor(perf, plays)/100)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount(invoice,plays)/100)}\n`;
  result += `You earned ${totalvolumeCredits(invoice,plays)} credits\n`;
  return result;
}
function totalAmount(invoice, plays) {
  let result = 0;
  for (let perf of invoice.performances) {
    result += amountFor(perf, plays);
  }
  return result;
}

function totalvolumeCredits(invoice, plays) {
  let volumeCredits=0;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf, plays);
  }
  return volumeCredits;
}

function volumeCreditsFor(aPerformance, plays) {
  let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance, plays).type) result += Math.floor(aPerformance.audience / 5);
    return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
                      { style: "currency", currency: "USD",
                        minimumFractionDigits: 2 }).format(aNumber);
}

function amountFor(aPerformance, plays) {
  let result= 0;
  switch (playFor(aPerformance,plays).type) {
  case "tragedy":
    result = 40000;
    if (aPerformance.audience > 30) {
      result += 1000 * (aPerformance.audience - 30);
    }
    break;
  case "comedy":
    result = 30000;
    if (aPerformance.audience > 20) {
      result += 10000 + 500 * (aPerformance.audience - 20);
    }
    result += 300 * aPerformance.audience;
    break;
  default:
      throw new Error(`unknown type: ${playFor(aPerformance, plays).type}`);
  }
  return result;
}

function playFor(aPerformance, plays) {
  return plays[aPerformance.playID];
}

module.exports = 
 {statement, playFor, amountFor, volumeCreditsFor, usd, totalvolumeCredits,
  totalAmount
};
//module.exports.statement=statement;
//module.exports.amountFor=amountFor;

//console.log(statement(invoices[0]));
/*let aPerformances = invoices[0].aPerformanceormances
console.log(aPerformances[0].playID);
console.log(plays["hamlet"]);
console.log(plays["as-like"]);
console.log(usd(-0.005));
console.log(totalvolumeCredits(invoices[0]));
console.log(totalAmount(invoices[0]));
*/
/*const invoices = require('./invoices.json');
const plays = require('./plays.json');
console.log(playFor(invoices[0].performances[0],plays));
*/