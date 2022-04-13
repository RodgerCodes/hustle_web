const multer = require('multer');
const fs = require('fs');
const path = require('path');
const dir = './public/uploads';

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename:(req, file, cb) => {
        cb(null, file.filename + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage
});

module.exports = upload;