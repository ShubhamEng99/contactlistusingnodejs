const { urlencoded } = require('body-parser');
const express=require('express');
const port=8000;
const path=require('path')
const db=require('./config/mongoose');
const Contact=require('./models/contact')

const app=express();

//setting up view engine and views path
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
//
// adding middleware to parse data coming from form
app.use(express.urlencoded())
//custom middleware
// app.use(function(req,res,next){
//     console.log('custom middleware 1 called');
//     next();
// })
// app.use(function(req,res,next){
//     console.log('custom middleware 2 called');
//     next();
// })
// accessing static files
app.use(express.static('assets'));

var contactList=[
    {
        name:"shubham",
        phone:"9999999999"
    },
    {
        name:"vineet",
        phone:"8888888888"
    }
]
app.get('/',function(req,res){
    Contact.find({},function(err,contactList){
        if(err){
            console.log('err');
            return;
        }
        return res.render('index',
{
    title:"contact list",
    list:contactList
})
    })

})
app.post('/create-contact',function(req,res){
    console.log(req.body);
    Contact.create(req.body,function(err,newcontact){
        if(err){
            console.log('error')
            return;
        }
        console.log(newcontact)
        return res.redirect('/')
    })
       
})
app.get('/del-contact/',function(req,res){
    let Id=req.query.id;
   Contact.findByIdAndDelete(Id,function(err){
       if(err){
           console.log('error in deleting');
           return;
       }
       return res.redirect('/');
   })
    
})
app.listen(port,function(err){
    if(err){
        return;
    }
    console.log("app is running on port",port)
})