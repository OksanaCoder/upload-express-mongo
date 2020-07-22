const express = require('express')
const multer = require('multer')
// const uploading = multer({ dest: 'uploads/' })
const bodyParser = require('body-parser')
const path = require('path')
// const router = express.Router()
const mongodb = require('mongodb')
const app = express()

app.use(bodyParser.urlencoded({extended:true}))



const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})
const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017'


MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err, client) => {
    if(err) return console.log(err)
    db = client.db('strivers')

    app.listen(3001, () =>{
        console.log(`mongo runs on port 3001`)
    })

})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.post('/uploadifle', upload.single('myFile'), (req, res, next) => {
    const file = req.file

    if(!file) {
        const error = new Error('Please, upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})

// app.post('/uploadImg', upload.single('image'), function(req, res, next) {
//     console.log(req.file, req.body)
// })


// app.use('/', router)

app.listen(process.env.port || 5000, () =>{
    console.log(`server is running on port ${process.env.port }`)
})