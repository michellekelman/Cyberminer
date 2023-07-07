const controller = require("./controllers/controller.js");

const express = require("express");
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const app = express();
//const path = require("path");
//const indexPath = path.join(__dirname, './index.html');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use("/static", express.static('./static'));
app.set('view engine', 'ejs');

var uri, client;
async function main() {
    uri = "mongodb+srv://mrk190001:Cyberminer@cluster0.ttmuueu.mongodb.net/?retryWrites=true&w=majority";
    client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connected to MongoDB")
    } catch (e) {
        console.error(e);
    }
}
main().catch(console.error);
module.exports.client = client;

app.get("/", controller.getDocs);

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
});

app.get("/search", controller.searchDocs);

app.post("/update", controller.updateDocs);

app.get("*", function (req, res) {
    res.status(404).send("PAGE NOT FOUND");   
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});