const express = require('express')
 const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const Design = require('./src/models/DesignMS')

const path = require('path')
const fs = require('fs')
const formidable = require('formidable');
const process = require('process');
const conn = require('./src/config/db')
console.log(conn)

const cwd = process.cwd();

var app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Routes
const adminRoutes = require('./src/routes/adminRoutes')
const designRoutes = require('./src/routes/designRoutes')
const bookRoutes = require('./src/routes/bookRoutes')

// let url = "mongodb+srv://iai-sms:1nNl4MMt6gygBsYz@cluster0.sbmrul9.mongodb.net/braids"
let url="mongodb+srv://domguiasimoulrich:xEQ5LtenPwDA3nPW@cluster0.kj8xdp0.mongodb.net/braids"
// let url = "mongodb://127.0.0.1:27017/braids"
mongoose.connect(url)
.then((con)=>{
        console.log("Connected to the db")
    }
)
.catch(err => {console.log(err)})


app.get("/", (req, res) => {
    return res.send("Welcome to braids backend")
})

app.use('/api/design', designRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/book', bookRoutes)

app.use("/Design", express.static(path.join(cwd, 'Design')));

// app.get("*", (req, res) => {
//     return res.send("Not found")
// })


let server = app.listen(5000, () => {
    console.log("Server running on port 5000")
})

app.post('/api/uploadFile/:id', async (req, res) => {
    try {
        // Basic setup
        const id = req.params.id
        const form = new formidable.IncomingForm()
        const currentDir = process.cwd();
        // console.log("currentDir", currentDir);
        const uploadDir = path.join(currentDir, 'Design', `${id}`);
        fs.mkdirSync(uploadDir, { recursive: true });
        // Basic Configuration
        form.multiples = true
        form.maxFileSize = 50 * 1024 * 1024 // 5MB
        form.uploadDir = uploadDir
        let imageFiles = []
        // Parsing
        await form.parse(req, async (err, fields, files) => {
            if (err) {
                console.log('Error parsing the files', err)
                return res.status(400).json({
                    status: 'Fail',
                    message: 'There was an error parsing the files',
                    error: err
                })
            }
            // console.log("files.image :", files.images.length)
            imageFiles = files.images;
            // console.log("good here");
            if (!imageFiles) {
                return res.status(400).send('No files were uploaded.');
            }
            let names = []
            for (let index = 0; index < imageFiles.length; index++) {
                let oldPath = uploadDir + '/' + imageFiles[index].newFilename
                let newPath = uploadDir + '/' + imageFiles[index].originalFilename
                console.log(imageFiles[index].newFilename);
                console.log(imageFiles[index].originalFilename);
                names.push(imageFiles[index].originalFilename);
                fs.renameSync(oldPath, newPath);
            }
            const imageStr = names.join(",");
            Design.addImages(req.params.id, imageStr, function (err, result) {
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
                    res.status(200).send({
                        message: "Design image add successfully"
                    });
                }
            })
        })
    } catch (err) {
        console.log(err)
        return res.status(501).send('Server error.');
    }
});
app.post('/api/deleteFile/:id', async (req, res) => {
    try {
        let image = req.body.image
        let images = req.body.images
        const currentDir = process.cwd();
        const uploadDir = path.join(currentDir, 'RRImage', image);
        if (fs.existsSync(uploadDir)) {
            fs.unlinkSync(uploadDir);
            console.log('File deleted successfully');
        } else {
            console.log('File not found');
        }
        const imagesArray = images.split(",");
        console.log(imagesArray);
        let index = imagesArray.indexOf(image)
        console.log(index)

        if (index !== -1) {
            imagesArray.splice(index, 1);
        }
        const imageStr = imagesArray.join(",");
        Design.addImages(req.params.id, imageStr, function (err, result) {
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
                res.status(200).send({
                    message: "Design image delete successfully",
                    images: imageStr
                });
            }
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Server error.' });
    }
})