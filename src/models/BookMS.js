const connection = require('../config/db')

const bookModel = function (model) {
    this.bookID = model.bookID
    this.name = model.name
    this.phone = model.phone
    this.date = model.date
    this.designID = model.designID,
    this.done = model.done
};
bookModel.create = (newBook, result) => {
    connection.query("INSERT INTO Booking SET ?", newBook, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Book: ", { ...newBook });
        result(null, { ...newBook });
    });
};
bookModel.findAll = (result) => {
    connection.query(`SELECT bookID ,Booking.name,phone,date,Booking.designID,done,images,price,Design.name As designName FROM Booking INNER JOIN Design on Booking.designID=Design.designID`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            // console.log("Result: ", res);
            result(null, res);
        });
};
bookModel.findById = (id, result) => {
    connection.query(`SELECT * FROM Booking WHERE bookID = '${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Book: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Admin with the id
        result({ type: "not_found" }, null);
    });
};
bookModel.findByDate = (date, result) => {
    console.log(`SELECT * FROM Booking WHERE date = '${date}'`)
    connection.query(`SELECT * FROM Booking WHERE date = '${date}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Book: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Book with the id
        result({ type: "not_found" }, null);
    });
};
bookModel.changeDate = (id, newDate, result) => {
    connection.query(`UPDATE Booking SET date = ? WHERE bookID = ${id}`,
        [
            newDate,
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

            console.log("updated Book: ", { newDate });
            result(null, res);
        });
};
bookModel.validOrder = (id, result) => {
    connection.query(`UPDATE Booking SET done = 1 WHERE BookID = ${id}`,
        (err, res) => {
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

            // console.log("updated Design: ", {);
            result(null, res);
        });
};
module.exports = bookModel;
