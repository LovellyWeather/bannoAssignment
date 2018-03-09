/* This is a web-scraper to pull the information from www.banno.com*/

let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');



/*
Initial pull of the html from the Webpage.
Axios is promise based so we have to check if the response
was correct in order to get the data.
*/

/*The function topThree creates a dictionary with all alphanumeric characters
   as keys and the amount of times they occur as their associated value.
   It then creates a sorted array from the dictionary key-value pairs 
   and then returns the top three most occurring characters.*/
function topThree(htmlStr) {
    /*First we create our dictionary object and sortable array.*/
    var dict = {};
    var sortableDict = [];

    /*Next we iterate over the string containing all html for the webpage,
    create key entries for each character, and add 1 to that key entry everytime
    we come across it again in the string.*/
    for (var i = 0; i < htmlStr.length; i++) {
        if (htmlStr.charAt(i) in dict) {
            dict[htmlStr.charAt(i)]++;
        } else {
            dict[htmlStr.charAt(i)] = 1;
        }
    }

    /*Then we push all the key-value pairs into an array for sorting.*/
    for (var key in dict) {
        sortableDict.push([key, dict[key]]);
    }
    /*Now we sort the array.*/
    sortableDict.sort(function (a, b) {
        return a[1] - b[1];
    });

    /*Here we can assign the 1st, 2nd, and 3rd most used characters to variables 
    so our return statement can be cleaner.*/
    var topChar = sortableDict[Object.keys(sortableDict)[Object.keys(sortableDict).length - 1]];
    var topChar2 = sortableDict[Object.keys(sortableDict)[Object.keys(sortableDict).length - 2]];
    var topChar3 = sortableDict[Object.keys(sortableDict)[Object.keys(sortableDict).length - 3]];

    return [topChar, topChar2, topChar3];


}

function countPNG(htmlStr) {
    var count = (htmlStr.match(/.png/g) || []).length;
    return count;
}

function getStrOccurance(htmlStr) {
    var count = (htmlStr.match(/ financial institution/g) || []).length;
    return count;
}

function getHTML() {
    requestify.get('https://banno.com').then(function (response) {
        // Get the response body 
        respones.getBody();
    })
};

function getTwitterHandle(htmlStr) {
    var whereToSlice = htmlStr.indexOf('"twitter:site"content="')
    var slicedText = htmlStr.slice(whereToSlice);
    var twitterHandle = '';

    for (var i = 0; i < slicedText.length; i++) {
        if (slicedText.charAt(i) === '@') {;
            for (var j = i; j < slicedText.length; j++) {
                if (slicedText.charAt(j) === '"') {
                    return twitterHandle;
                } else {
                    twitterHandle += slicedText.charAt(j);
                }
            }
        }
    }
}

function getProductCount(htmlStr) {
    var htmlForProduct = 'feature-group-label';
    return htmlStr.split(htmlForProduct).length - 1;
}



console.time("Execution time took");
axios.get('https://banno.com')
    .then((response) => {
        if (response.status === 200) {

            const html = response.data;
            const $ = cheerio.load(html);
            const text$ = $.text().trim();
            const clean$ = $.html().replace(/\s+/g, '');

            console.log("|---------------------------------------------------------------------------|");
            console.log("| Top Three Characters: ", topThree(clean$));
            console.log("|-");
            console.log("| PNG's: ", countPNG(clean$));
            console.log("|-");
            console.log("| Twitter Handle: ", getTwitterHandle(clean$));
            console.log("|-");
            console.log("| Financial Institution Occurance: " + getStrOccurance(text$));
            console.log("|-");



        }
    }, (error) => console.log(err));


axios.get('https://banno.com/features')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            const text$ = $.text().trim();
            const clean$ = $.html().replace(/\s+/g, '');

            console.log("| Products listed: ", getProductCount(clean$));
            console.log("|---------------------------------------------------------------------------|");
        }
    }, (error) => console.log(err));

console.timeEnd("Execution time took");