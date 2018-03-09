/* This is a web-scraper to pull the information from www.banno.com*/

/*Axios is the http client we'll use to perform a get from the pages we need. */
let axios = require('axios');

/*Cheerio  allows us to load the html from the pages we request from.*/
let cheerio = require('cheerio');



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

    if ((typeof htmlStr) != "string") {
        var inputError = "Incorrect input: requires a string";
        return inputError;

    } else {

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

    };
}

/* This function finds every mention of a .png file in the html of the site. */
function countPNG(htmlStr) {

    if ((typeof htmlStr) != "string") {
        var inputError = "Incorrect input: requires a string";
        return inputError;

    } else {
    /*Creates a variable called count that uses the .match() function to 
     find every mention of .png. Puts those occurances into an array and 
     takes the length of the array to get the "count".*/
    var count = (htmlStr.match(/.png/g) || []).length;
    return count;
    };
}

/*This function finds every mention of a .png file in the html of the site. */
function getStrOccurance(htmlStr) {

    if ((typeof htmlStr) != "string") {
        var inputError = "Incorrect input: requires a string";
        return inputError;

    } else {
    /*Creates a variable called count that uses the .match() function to 
     find every mention of 'financial institution'. Puts those occurances into an array and 
     takes the length of the array to get the "count".*/
    var count = (htmlStr.match(/ financial institution/g) || []).length;
    return count;
    };
}

/*This function finds the twitter handle listed in the meta tags of the HTML.*/
function getTwitterHandle(htmlStr) {

    if ((typeof htmlStr) != "string") {
        var inputError = "Incorrect input: requires a string";
        return inputError;

    } else {

    /*Removes everything before "twitter:site"content=" in the string by 
    first finding whereToSlice*/
    var whereToSlice = htmlStr.indexOf('"twitter:site"content="')
    /*Then slice at that index. */
    var slicedText = htmlStr.slice(whereToSlice);
    /*Create a variable to store the twitter handle. */
    var twitterHandle = '';


    /*Loops through the slicedText and looks for an @ symbol, which is what 
    every twitter handle begins with. After it finds the @, it appends 
    each character to the twitterHandle variable until it reaches the end-quote. */
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
    if (twitterHandle === '') {
        return "Unable to locate Twitter handle."
    }
    }
}

/*Finds every instance of 'feature-group-label', which is the 
class used for each product in the HTML, Splits at each instance
and counts each section of the split string. Subtract 1 to account
for the last section having no instance of feature-group-label. */
function getProductCount(htmlStr) {

    if ((typeof htmlStr) != "string") {
        var inputError = "Incorrect input: requires a string";
        return inputError;

    } else {

    var htmlForProduct = 'feature-group-label';
    return htmlStr.split(htmlForProduct).length - 1;

    }
}

console.log('');
/*Start execution timer. */
console.time("Execution time");

/*Uses the axios HTTP client to get the HTML from https://banno.com. */
axios.get('https://banno.com')
    .then((response) => {
        /*If the request is successful.. */
        if (response.status === 200) {

            /*Save the response into a variable. */
            const html = response.data;
            /*Use cheerio to extract the html.*/
            const $ = cheerio.load(html);
            /*convert the html to text and trim white space on the end for use with getStrOccurance() */
            const text$ = $.text().trim();
            /*take the html and remove all spaces for use with all the other functions */
            const clean$ = $.html().replace(/\s+/g, '');


            /*Log results to the console. */
            console.log("|---------------------------------------------------------------------------|");
            console.log("| Top Three Alphanumeric Characters: ", topThree(clean$));
            console.log("|-");
            console.log("| PNG's mentioned in the HTML: ", countPNG(clean$));
            console.log("|-");
            console.log("| Twitter Handle: ", getTwitterHandle(clean$));
            console.log("|-");
            console.log("| Occurances of 'Financial Institution' : " + getStrOccurance(text$));
            console.log("|-");



        }
        /*catch and log a connection error if it occurs */
    }, (error) => console.log(err));


/*This request functions the exact same as the request above but pulls its' information
    from https://banno.com/features */
axios.get('https://banno.com/features')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            const text$ = $.text().trim();
            const clean$ = $.html().replace(/\s+/g, '');

            console.log("| Products provided under Features: ", getProductCount(clean$));
            console.log("|---------------------------------------------------------------------------|");
        }
    }, (error) => console.log(err));

/*End execution timer */
console.timeEnd("Execution time");


/*exports for testing in test.js*/
module.exports = {
    topThree: topThree,
    countPNG: countPNG,
    getStrOccurance: getStrOccurance,
    getTwitterHandle: getTwitterHandle,
    getProductCount: getProductCount
}