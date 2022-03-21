const {createStatementData} = require('./createStatementData.js');
const invoices = require('./invoices.json');
const plays = require('./plays.json');

function statement (invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function htmlStatement (invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
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

 function renderHtml (data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}


module.exports = 
 {statement, htmlStatement, renderPlainText, usd};
//module.exports.statement=statement;
//module.exports.amountFor=amountFor;

//console.log(statement(invoices[0],plays));
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
//console.log(htmlStatement(invoices[0],plays));