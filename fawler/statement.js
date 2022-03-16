const invoices = require('./invoices.json');
const plays = require('./plays.json');

function statement (invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  //console.log(JSON.stringify(statementData));
  return renderPlainText(statementData, plays);
  
}

function enrichPerformance(aPerformance) {
  const result = Object.assign({}, aPerformance);
  result.play = playFor(result);
  result.amount = amountFor(result);
  console.log(result);
  return result;
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
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


function  renderPlainText(data, plays) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
  // print line for this order
//    console.log(perf.play);
    result += `  ${perf.play.name}: ${usd(perf.amount/100)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount(data)/100)}\n`;
  result += `You earned ${totalvolumeCredits(data)} credits\n`;
  return result;
}
function totalAmount(data) {
  let result = 0;
  for (let perf of data.performances) {
    result += perf.amount;
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
    if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
    return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
                      { style: "currency", currency: "USD",
                        minimumFractionDigits: 2 }).format(aNumber);
}


module.exports = 
 {statement, amountFor, volumeCreditsFor, usd, totalvolumeCredits,
  totalAmount, renderPlainText, enrichPerformance
};
//module.exports.statement=statement;
//module.exports.amountFor=amountFor;

console.log(statement(invoices[0],plays));
/*let aPerformances = invoices[0].aPerformanceormances
console.log(aPerformances[0].playID);
console.log(plays["hamlet"]);
console.log(plays["as-like"]);
console.log(usd(-0.005));
console.log(totalvolumeCredits(invoices[0]));
console.log(totalAmount(invoices[0]));
console.log(enrichPerformance(invoices[0].performances[0]));
console.log(enrichPerformance(invoices[0].performances[1]));
console.log(enrichPerformance(invoices[0].performances[2]));
*/