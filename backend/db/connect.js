const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
async function connect() {
    return () => {
        mongoose.connect("mongodb+srv://nagendradangi105:QQs4CtejEaQ9ezsC@cluster0.5kodmg9.mongodb.net/?retryWrites=true&w=majority", (err) => {
          if(err){
            return console.log(err)
          }
          else{
        }
    })
    return console.log("db connect")
    }
}

module.exports = connect;