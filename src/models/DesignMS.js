const connection = require('../config/db')

const designModel = function (model) {
    this.designID = model.designID
    this.name = model.name
    this.description = model.description
    this.price = model.price
    this.duration = model.duration
    this.catagory = model.catagory
    this.images = model.images

};
designModel.create = (newDesign, result) => {
    connection.query("INSERT INTO Design SET name = ? ,description = ? ,price = ? ,duration = ? ,catagory = ?",
        [
            newDesign.name,
            newDesign.description,
            newDesign.price,
            newDesign.duration,
            newDesign.catagory
        ]
        , (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created Design: ", { ...newDesign });
            result(null, { ...newDesign });
        });
};
designModel.findById = (id, result) => {
    connection.query(`SELECT * FROM Design WHERE designID = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Design: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Admin with the id
        result({ type: "not_found" }, null);
    });
};
designModel.findAll = (result) => {
    connection.query(`SELECT * FROM Design`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("Result: ", res);
        result(null, res);
    });
};
designModel.findByIdAndDelete = (id, result) => {
    connection.query(`DELETE FROM Design WHERE designID = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while deleting the design informations with designID :", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            console.log("Design informations with designID : " + id + " not found so no deletion was perform");
            result({ type: "not_found" }, null);
            return;
        }
        console.log("Design informations with designID : " + id + " deleted successfully ");
        result(null, res);
    });
};
designModel.findByIdAndUpdate = (id, newDesign, result) => {
    connection.query("UPDATE Design SET name = ? ,description = ? ,price = ? ,duration = ? ,catagory = ? WHERE designID = ?",
        [
            newDesign.name,
            newDesign.description,
            newDesign.price,
            newDesign.duration,
            newDesign.catagory,
            id,
        ]
        , (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Admin with the id
                result({ type: "not_found" }, null);
                return;
            }

            console.log("updated Design: ", { ...newDesign });
            result(null, { ...newDesign });
        });
};
designModel.addImages = (id, images, result) => {
    connection.query("UPDATE Design SET images= ? WHERE designID = ?",
        [
            images,
            id,
        ]
        , (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Admin with the id
                result({ type: "not_found" }, null);
                return;
            }

            // console.log("updated Design: ", { ...newDesign });
            result(null,  res);
        });
};
module.exports = designModel;