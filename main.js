const puppeteer = require('puppeteer');
var fs = require('fs');

var pagenum = 1221;

(async () => {
  const browser = await puppeteer.launch();
  for (var i = 0; i < pagenum; ++i){ 
    const page = await browser.newPage();
    await page.goto('https://www.londonstockexchange.com/exchange/prices-and-markets/stocks/prices-search/stock-prices-search.html?&page='+i, {waitUntil: 'networkidle2'});

    const text = await page.evaluate(() => {var nodes = document.querySelectorAll('#fullcontainer > div.column1_nomenu > table > tbody > tr > td:nth-child(1)'); var nstring = []; for (var n of nodes){ nstring.push(n.innerHTML); } return nstring;}); 
    const text2 = await page.evaluate(() => {var nodes = document.querySelectorAll('#fullcontainer > div.column1_nomenu > table > tbody > tr > td:nth-child(2) > a'); var nstringn = []; for (var n of nodes){ nstringn.push(n.innerHTML); } return nstringn;}); 

    var tickerlist = ""; 
     
    for(var ii = 0; ii < 20; ++ii){
      let tickerline = text[ii] + ","+ text2[ii] + "\n";
    }

    await fs.appendFile('lsetickers.txt', tickerlist, function (err) {
        if (err) throw err;
      console.log('Saved Page ' +  i);
    });
 }

  await browser.close();
})();
