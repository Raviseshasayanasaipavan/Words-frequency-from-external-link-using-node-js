const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const t = require("table");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {
  const n = req.body.number;
  // if(n<=863 && n>=0)
  // {
  //     res.write("N should be greater than 0 and less than 863 ");
  //    n=1;
  // }
  console.log("The number N is :- "+n);
  const url = "https://terriblytinytales.com/test.txt";

  const https = require('https');

  https.get(url, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });


    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var wordsArray = splitByWords(data);
      var wordsMap = createWordMap(wordsArray);
      var finalWordsArray = sortByCount(wordsMap);

      // res.write(finalWordsArray);
      // var d=[["Word","Frequency"]];
      var d=[[finalWordsArray[0].name,finalWordsArray[0].total]];
      for (var i = 1; i < n; i++) {

        d.push([finalWordsArray[i].name,finalWordsArray[i].total]);

        // res.write('<br>');

      }
      // const config = {
      //   border: t.getBorderCharacters("ramac"),
      // };
      config = {
  columns: {
    0: {
      width: 150   // Column 0 of width 1
    }


  }
};

      res.send(t.table(d, config));



    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });


  function splitByWords(text) {

    var wordsArray = text.split(/\s+/);
    return wordsArray;
  }


  function createWordMap(wordsArray) {

    // create map for word counts
    var wordsMap = {};

    wordsArray.forEach(function(key) {
      if (wordsMap.hasOwnProperty(key)) {
        wordsMap[key]++;
      } else {
        wordsMap[key] = 1;
      }
    });

    return wordsMap;
  }

  function sortByCount(wordsMap) {

    // sort by count in descending order
    var finalWordsArray = [];
    finalWordsArray = Object.keys(wordsMap).map(function(key) {
      return {
        name: key,
        total: wordsMap[key]
      };
    });

    finalWordsArray.sort(function(a, b) {
      return b.total - a.total;
    });

    return finalWordsArray;

  }

  // request.end();
});

app.listen(process.env.PORT||3000, function() {
  console.log("server started");
});
