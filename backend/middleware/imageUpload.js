const path = require("path");
const multer = require("multer");
const {v4: uuid} = require('uuid');

var storage = multer.diskStorage({

    destination: function (req, file, callback) {
        callback(null, 'public/images');
    },

    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + uuid() + path.extname(file.originalname))
    }
})

var uploadImages = multer({ storage: storage})
module.exports = uploadImages