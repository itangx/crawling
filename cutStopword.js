var fs = require('fs');
var child = require('child_process');
var iconv  = require('iconv-lite');
var sw = require('stopword');
const stopwords = require('stopwords-th');

var data = "";
var splitData = "" ;
var cutString = "" ;

exports.cutStopwords = function (word) {
	fs.writeFileSync("C:/Users/TanGX/Desktop/crawling/word.txt", word, "UTF-8");
    child.execSync('java -jar "C:/Users/TanGX/Documents/NetBeansProjects/TestLexTo/dist/TestLexTo.jar"');
    data = fs.readFileSync("C:/Users/TanGX/Desktop/crawling/cut.txt");
    splitData = data.toString().split(' ');
	cutString = sw.removeStopwords(splitData, stopwords);
	cutString = sw.removeStopwords(cutString, [',','.','ค่ะ','คะ','ครับ','ขอบคุณ','ๆ','สวัสดี']);

	return cutString ;
}

