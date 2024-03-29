var client = require('../server.js');

exports.getDocs = async (req, res) => {
    const urlKey = {};
    // const urlKey = {url: {$regex : /^(http:\/\/|https:\/\/)?(www\.)?[a-zA-Z0-9]+\.(edu|com|org|net|gov)(\/)?$/}};
    const cursor = client.client.db("Cluster0").collection("documents").find(urlKey);
    const count = await cursor.count();
    const data = await cursor.limit(10).toArray();
    for (i=0 ; i<data.length; i++) {
       await UrlExists(data[i].url);
    }
    res.render("./index", {"docs": data, "formContents": ["", "none", "none", count, 1, "10"]});
}

exports.searchDocs = async (req, res) => {
    const queryString = req.body.query;
    const select = req.body.select;
    const sort = req.body.sort;
    var page = req.body.page;
    var results = req.body.results;
    const newPage = req.body.newPage;
    const newResults = req.body.newResults;

    const punctuationless = queryString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s{2,}/g, " ");
    const stopwords = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any","are",
        "aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't",
        "cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each",
        "few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll",
        "he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm",
        "i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my",
        "myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out",
        "over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than",
        "that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd",
        "they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't",
        "we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's",
        "which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll",
        "you're","you've","your","yours","yourself","yourselves"];
    var queryStrings = [];
    if (punctuationless != null) {
        var split = punctuationless.split(" ").filter(n => n);
        for(i=0 ; i<split.length ; i++) {
            if(!stopwords.includes(split[i])) {
                queryStrings.push(split[i])
            }
        }
    }

    // query based on queryStrings - find()
    allDocs = []
    queryStrings.forEach(element => {
        allDocs.push({$or: [{title: {$regex: String(element), $options: "i"}}, {content: {$regex: String(element), $options: "i"}}]});
    });

    // filter with and, or, not search - find()
    var findKey;
    if (queryStrings.length==0) {
        findKey = {};
    }
    else if (select=="or") {
        findKey = {$or: allDocs};
    }
    else if (select=="and") {
        findKey = {$and: allDocs};
    }
    else if (select=="not") {
        findKey = {$nor: allDocs};
    }
    else {
        findKey = {$or: allDocs};
    }
    const urlKey = {};
    // const urlKey = {url: {$regex : /^(http:\/\/|https:\/\/)?(www\.)?[a-zA-Z0-9]+\.(edu|com|org|net|gov)(\/)?$/}};
    const findDocs = await client.client.db("Cluster0").collection("documents").find({$and: [urlKey, findKey]});

    // sort with alph, freq, len - sort()
    // var sortJson = await findDocs.toArray();
    // const sortDocs = sortFunction(sortJson, sort);
    var sortKey;
    if (sort=="alph") {
        sortKey = {title: 1};
    }
    else if (sort=="freq") {
        sortKey = {frequency: -1};
    }
    else if (sort=="len") {
        sortKey = {length: 1};
    }
    else {
        sortKey = {};
    }

    const sortDocs = findDocs.sort(sortKey);
    const count = await findDocs.count();

    if (newPage != null) {
        if (newPage == "first") {
            page = 1;
        }
        else if (newPage == "prev") {
            page = page - 1;
        }
        else if (newPage == "next") {
            page = Number(page) + 1;
        }
        else if (newPage == "last") {
            page = Math.ceil(count/results);
        }
        else {
            page = newPage;
        }
    }
    else {
        page = 1;
    }
    if (results != newResults) {
        results = newResults;
    }

    const data = await sortDocs.skip((page-1)*results).limit(Number(results)).toArray();
    for (i=0 ; i<data.length; i++) {
        await UrlExists(data[i].url);
    }
    res.render("./index", {"docs": data, "formContents": [queryString, select, sort, count, page, results]});
}

exports.updateDocs = async (req, res) => {
    // frequency tracker
    const url = req.body.url;
    const doc = await client.client.db("Cluster0").collection("documents").findOne({url: url});
    var newFreq = doc.frequency + 1;
    client.client.db("Cluster0").collection("documents").updateOne({_id: doc._id}, {$set: {frequency: newFreq}});
    res.redirect(url);
}

async function UrlExists(url) {
    var XMLHttpRequest = require('xhr2');
    var http = new XMLHttpRequest();
    http.open('HEAD', url, true);
    http.send();
    if (http.status == 404)
        client.client.db("Cluster0").collection("documents").deleteOne({url: url});
}

// const data = require("../json/documents.json");
// client.client.db("Cluster0").collection("documents").updateMany({}, {$set: {frequency: 0}});
/* client.client.db("Cluster0").collection("documents").find().forEach(function(doc) {
    if (doc.content != null) {
        client.client.db("Cluster0").collection("documents").updateOne({_id: doc._id}, {$set: {length: doc.content.length}});
    }
    else {
        client.client.db("Cluster0").collection("documents").updateOne({_id: doc._id}, {$set: {length: 0}});
    }
}); */
/* client.client.db("Cluster0").collection("documents").find().forEach(function(doc) {
    if (doc.title == null) {
        client.client.db("Cluster0").collection("documents").updateOne({_id: doc._id}, {$set: {title: doc.url}});
    }
}); */
/* client.client.db("Cluster0").collection("documents").find().forEach(function(doc) {
    if (doc.title == doc.url) {
        client.client.db("Cluster0").collection("documents").deleteOne({_id: doc._id});
    }
}); */