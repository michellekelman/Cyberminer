var client = require('../server.js');

exports.getDocs = async (req, res) => {
    // const data = require("../json/documents.json");
    const cursor = client.client.db("Cluster0").collection("documents").find();
    const data = await cursor.toArray();
    res.render("./index", {"docs": data, "formContents": ["", "none", "none"]});
}

exports.searchDocs = async (req, res) => {
    const queryString = req.query.query;
    const select = req.query.select;
    const sort = req.query.sort;

    var queryStrings = [];
    if (queryString != null) {
        queryStrings = queryString.split(" ");
    }

    // console.log(queryString, select, sort);

    // TODO - query based on queryStrings - find()
    // TODO - filter with and, or, not search - find()
    // TODO - sort with alph, freq, len - sort()
    // TODO - implement frequency tracker

    const cursor = client.client.db("Cluster0").collection("documents").find().sort();
    const data = await cursor.toArray();
    res.render("./index", {"docs": data, "formContents": [queryString, select, sort]});
}