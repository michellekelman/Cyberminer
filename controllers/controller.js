exports.getDocs = async (req, res) => {
    const data = require("../json/documents.json");
    res.render("./index", {"docs": data});
}