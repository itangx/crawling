var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var iconv  = require('iconv-lite');

// http://medplant.mahidol.ac.th/user/qa.asp
// http://www.abhaiherb.com/faq
// http://webdb.dmsc.moph.go.th/ifc_herbal/faq.php?page=1

var pagesVisited = {};
var pagesToVisit = [];
var numPagesVisited = 0;
var url = new URL("http://webdb.dmsc.moph.go.th/ifc_herbal/view_faq.php?faq_id=233");
var baseUrl = url.protocol + "//" + url.hostname + "/ifc_herbal/";

pagesToVisit.push("http://webdb.dmsc.moph.go.th/ifc_herbal/view_faq.php?faq_id=233");
crawl();

function crawl() {
	var nextPage = pagesToVisit.shift();

	if(numPagesVisited >= 10) {
    console.log("Reached max limit of number of pages to visit.");
    return;
  	}

	if (nextPage in pagesVisited) {
		crawl();
	} else {
	 	visitPage(nextPage, crawl);
	}

}

function visitPage(url, callback) {
	pagesVisited[url] = true;
	numPagesVisited++;

	var requestOptions  = { encoding: null, method: "GET", uri: url };
	request(requestOptions, function(error, response, body) {
    var utf8String = iconv.decode(new Buffer(body), "windows-874");

   	if(error || response.statusCode !== 200) {
   	  console.log("Error: " + error);
   	  callback();
      return;
   	}

   	var $ = cheerio.load(utf8String);
   	console.log("visitPage : "+url);
   	console.log("****************Header****************");
    console.log($('td > b:nth-child(2)').text());
 	  console.log("***************Question***************");
    console.log($('tr:nth-child(2)').children().children().html());

 	//  console.log($('table:nth-child(1) > tbody').text());
 /*	  console.log("****************Answer****************");
 	  console.log($('div.col-md-9').children().last().text());
 	  console.log(" ");*/
  /* 	collectInternalLinks($);
   	callback();*/
   	
	});
}

function collectInternalLinks($) {

  var FAQ = $("a[href^='view_faq']");
  FAQ.each(function() {
    pagesToVisit.push(baseUrl + $(this).attr('href'));
  });

  var page = $("a[href^='faq']");
  page.each(function() {
    pagesToVisit.push(baseUrl + $(this).attr('href'));
  });

}