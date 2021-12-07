const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost/mycontactlistDB');



const db=mongoose.connection;



db.on('error',console.error.bind(console,'error in binding'));


db.once('open',function(){
    console.log('successfully connected to the database');
})

