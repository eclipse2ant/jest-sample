const {createStatementData} = require('./createStatementData.js');
const invoices = require('./invoices.json');
const plays = require('./plays.json');

function statement (invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}


function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
                      { style: "currency", currency: "USD",
                        minimumFractionDigits: 2 }).format(aNumber);
}

function  renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
  // print line for this order
//    console.log(perf.play);
    result += `  ${perf.play.name}: ${usd(perf.amount/100)} (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount/100)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
 }




module.exports = 
 {statement, renderPlainText, usd};
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
