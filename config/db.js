const mongoose = require('mongoose');

const ConnectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        }, () => {
            console.log('connected to Database')
        })
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = ConnectDB;