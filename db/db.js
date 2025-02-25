const mongoose = require('mongoose')


function connectToDb(){
    mongoose.connect(process.env.DB_CONNECT)
    .then(() =>{
        console.log('Connected TO DB')
    })
    .catch(err =>{
        console.log('Failed to Connect DB:', err);
        process.exit(1);
    })
}


module.exports = connectToDb;














