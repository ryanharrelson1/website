const express = require('express');
const path = require("path");
const collection = require("./config");
const bcrypt = require("bcrypt");
const exp = require('constants');

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.post("/login", async (req, res)=>
{
  try
  {
     const check= await collection.findOne({name: req.body.username});
     if(!check)
     {
        res.send("user does not exist");
     }
     const ispasswordmatch = await bcrypt.compare(req.body.password, check.password);
     if(ispasswordmatch)
     {
        res.render("home");
     } else
     {
        req.send("wrong password");
     }

  } catch
  {
    res.send("there was an error");
  }

})
app.post("/signup", async(req, res)=>
{
   const data = {
     name: req.body.username,
     password: req.body.password
  }

   const existinguser = await collection.findOne({name:data.name});
   if(existinguser)
   {
    res.send('user already exist');
   } 
   else 
   {
     const saltRounds = 10;
     const hasedPassword = await bcrypt.hash(data.password, saltRounds);
     data.password = hasedPassword;
     const userdata = await collection.insertMany(data);
     console.log(userdata);


   }


});


app.get('/',(req, res)=>
{
  res.render("login")

})

app.get('/signup',(req, res)=>
{
    res.render("signup")
})

app.get('/home', (req,res) =>
{

    res.render("home")
})

const port = 5000;
app.listen(port,()=>
{
   console.log('sever is connected on port 5000')


})