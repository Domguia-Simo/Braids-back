const Design = require('../models/DesignMS')

// Function to create a design
const createDesign = async (req, res) => {
    try {

        let { name, description, duration, price, catagory } = req.body

        let design = new Design({
            name: name,
            description: description,
            price: price,
            duration: duration,
            catagory: catagory.toLocaleUpperCase()
        })
        // let design = new Design({
        //     name: "Senegalese twist",
        //     description: "Get beautifully crafted Senegalese twists for a trendy and protective look. Our talented professionals will provide you with an authentic and elegant style. Book now for an exceptional hair transformation!",
        //     // catagory: 'Women',
        //     // image: [img12, sengaleseTwist, img11],
        //     price: 220,
        //     duration: 120,
        //     catagory: "women".toLocaleUpperCase()
        // })
        Design.create(design, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send({ message: "some errors resulted in the process" })
            } else {
                res.status(200).send({ message: "design created successfully" });
            }
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'server error' })
    }
}

const getAllDesign = async (req, res) => {
    try {

        Design.findAll(function (err, result) {
            if (err) {
                res.status(500).send({ message: "no Design found" })
            } else {
                res.status(200).send({ design: result })
            }
        })

    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'server error' })
    }
}

// Function to delte a design
const deleteDesign = async (req, res) => {
    try {

        // let { designId } = req.body

        Design.findByIdAndDelete(req.params.id, (err, data) => {
            if (err) {
                if (err.type === "not_found") {
                    res.status(400).send({
                        message: `Design Already Delete`
                    });
                } else {
                    res.status(500).send({
                        message: "Please checks you internet connection"
                    });
                }
            } else res.send({ message: `Design was deleted successfully!` });
        });
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'server error' })
    }
}


// Function to update a particular design
const updateDesign = async (req, res) => {
    try {

        let { name, description, duration, price, catagory } = req.body

        let design = new Design({
            name: name,
            description: description,
            price: price,
            duration: duration,
            catagory: catagory.toLocaleUpperCase()
        })
        // let design = new Design({
        //     name: "Install Wigs3",
        //     description: "Are you looking to achieve a flawless and effortless hairstyle? Our wig installation service is here to fulfill your needs! Our qualified hair experts are dedicated to providing an exceptional wig installation experience, helping you achieve the desired look you've always wanted.",
        //     price: 920,
        //     duration: 90,
        //     catagory: "Women".toLocaleUpperCase()
        // })
        Design.findByIdAndUpdate(req.params.id, design, function (err, result) {
            if (err) {
                if (err.type === "not_found") {
                    res.status(304).send({
                        message: `Design already up to date.`
                    });
                } else {
                    res.status(500).send({
                        message: "Some went wrong during the process please check you internet connection"
                    });
                }
            } else {
                res.status(200).send({
                    message: "Design updated successfully"
                });
            }
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'server error' })
    }
}

// Function to upload the files(images) of a particular design
const uploadDesignFile = async (req, res) => {
    try {

        let file = req.file
        console.log(file)


        Design.addImages(req.params.id, images, function (err, result) {
            if (err) {
                if (err.type === "not_found") {
                    res.status(404).send({
                        message: `Design image already added.`
                    });
                } else {
                    res.status(500).send({
                        message: "Some went wrong during the process please check you internet connection"
                    });
                }
            } else {
                res.status(500).send({
                    message: "Design image add successfully"
                });
            }
        })

    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'server error' })
    }
}


// Function to get all designs


module.exports = { createDesign, deleteDesign, updateDesign, uploadDesignFile, getAllDesign }