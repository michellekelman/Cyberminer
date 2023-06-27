const controller = require("./controllers/controller.js");

const express = require("express");
const app = express();
const path = require("path");
//const indexPath = path.join(__dirname, './index.html');

app.use(express.json());
app.set('view engine', 'ejs');

app.get("/", controller.getDocs);

app.get("*", function (req, res) {
    res.status(404).send("PAGE NOT FOUND");   
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});