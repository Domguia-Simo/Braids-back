const moment = require('moment');
const BookModel = require('../models/BookMS')

// Function to order a book
const orderBook = async (req, res) => {
    try {
        let { date, designID, phone, name } = req.body
        console.log(req.body);
        // date = "2024-03-07T16:00:00.000Z"
        // moment(date).format("yyyy-mm-d hh:mm:ss")
        console.log(date);
        const formattedDate = new Date(date).toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '');
        console.log(formattedDate);

        // To find for an existing book at thesame date
        BookModel.findByDate(formattedDate, (err, data) => {
            if (err) {
                if (err.type === "not_found") {
                    let book = new BookModel({
                        name:name,
                        phone:phone,
                        date:formattedDate,
                        designID:designID,
                        done: false
                    })
                    // let book = new BookModel({
                    //     name: "Test 1",
                    //     phone: "+(1233) 456-8885",
                    //     date: formattedDate,
                    //     designID: 3,
                    //     done: false
                    // })
                    // return res.status(200).json({ message: book })

                    BookModel.create(book, function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(500).send({ message: "some errors resulted in the process" })
                        } else {
                            res.status(200).send({ message: "book created successfully" });
                        }
                    })
                }else{
                return res.status(400).json({ message: 'Some thing went wrong check you connection and try again.' })
                }
            } else {
                return res.status(400).json({ message: 'Please change the date, it is already occupied' })
            }
        });

    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'Server error' })
    }
}
const getAllBook = async (req, res) => {
    try {

        BookModel.findAll(function (err, result) {
            if (err) {
                res.status(500).send({ message: "no Book found" })
            } else {
                res.status(200).send({ book: result })
            }
        })

    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'server error' })
    }
}
const changeOrder = async (req, res) => {
    try {

        let { date } = req.body

        // date = "2024-03-19T09:00:00.000Z"
        // moment(date).format("yyyy-mm-d hh:mm:ss")
        console.log(req.body);
        const formattedDate = new Date(date).toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '');
        console.log(formattedDate);

        // To find for an existing book at thesame date
        BookModel.findByDate(formattedDate, (err, data) => {
            if (err) {
                if (err.type === "not_found") {
                    BookModel.changeDate(req.params.id, formattedDate, function (err, result) {
                        if (err) {
                            if (err.type === "not_found") {
                                res.status(404).send({
                                    message: `Book already up to date.`
                                });
                            } else {
                                res.status(500).send({
                                    message: "Some went wrong during the process please check you internet connection"
                                });
                            }
                        } else {
                            res.status(200).send({
                                message: "Book updated successfully"
                            });
                        }
                    })
                }
            } else {
                return res.status(400).json({ message: 'Please change the date, it is already occupied' })
            }
        });
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'server error' })
    }
}

const validOrder = async (req, res) => {
    try {
        // const string = "apple,banana,orange";
        // const result = string.split(",");
        // console.log(result);
        // const str = result.join(",");
        // console.log(str);
        BookModel.validOrder(req.params.id, function (err, result) {
            if (err) {
                if (err.type === "not_found") {
                    res.status(404).send({
                        message: `Book already validated.`
                    });
                } else {
                    res.status(500).send({
                        message: "Some went wrong during the process please check you internet connection"
                    });
                }
            } else {
                res.status(200).send({
                    message: "Book validated successfully"
                });
            }
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'server error' })
    }
}

module.exports = { orderBook, changeOrder, validOrder, getAllBook };