const invoices = require('./invoices.json');
const plays = require('./plays.json');

function statement (invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances;
  return renderPlainText(statementData, plays);
  
}

function  renderPlainText(data, plays) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
  // print line for this order
    result += `  ${playFor(perf).name}: ${usd(amountFor(perf)/100)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount(data)/100)}\n`;
  result += `You earned ${totalvolumeCredits(data)} credits\n`;
  return result;
}
function totalAmount(data) {
  let result = 0;
  for (let perf of data.performances) {
    result += amountFor(perf);
  }
  return result;
}

function totalvolumeCredits(data) {
  let volumeCredits=0;
  for (let perf of data.performances) {
    volumeCredits += volumeCreditsFor(perf);
  }
  return volumeCredits;
}

function volumeCreditsFor(aPerformance) {
  let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
    return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
                      { style: "currency", currency: "USD",
                        minimumFractionDigits: 2 }).format(aNumber);
}

function amountFor(aPerformance) {
  let result= 0;
  switch (playFor(aPerformance).type) {
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
      throw new Error(`unknown type: ${playFor(aPerformance).type}`);
  }
  return result;
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

module.exports = 
 {statement, amountFor, volumeCreditsFor, usd, totalvolumeCredits,
  totalAmount, renderPlainText
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