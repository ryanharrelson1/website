const mongoose = require("mongoose");

const moboURI = 'mongodb+srv://RyanH:Panda@cluster0.1zcd2et.mongodb.net/ClassProj'

const connect = mongoose.connect(moboURI)

connect.then(()=>
{
   console.log("DataBase Connected");


})
.catch(()=>
{
  console.log("failed to vailidate Creds");


})

const LogInSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        password:
        {
          type: String,
          required: true

        }

    });

    const collection = new mongoose.model("user123",LogInSchema);

    module.exports = collection;