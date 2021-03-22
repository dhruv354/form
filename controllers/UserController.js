const User = require('../models/User')
const nodemailer = require('nodemailer')

module.exports.User = (req, res) => {
    if(req.body.password != req.body.confirm_password){
        // res.write('<script>alert("password and confirm password dont match")</script>')
        console.log('password and confirm password dont match');
       return res.redirect('back')
    }
    
    User.findOne({email: req.body.email}, function(err, user){
        //error in creating the user
        if(err){console.log('error in creating the user');}

        //if user doesnot initially exist in the database
        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error');}
                console.log('User created');
            })
            //create transport object which takes service name
            //and credentials which you need to send an email
            let mailTransporter = nodemailer.createTransport({ 
                service: 'gmail', 
                host: 'smtp.gmail.com',
                auth: { 
                    user: 'dhruv.singhal2612@gmail.com', 
                    pass: my_passwords 
                } 
            }); 
            
            //object that contains reciever's mail and   
            let mailDetails = { 
                from: '"dhruv.singhal2612" <dhruv.singhal2612@gmail.com>', //your mail
                to: req.body.email,  //receiver mail
                subject: 'from dhruv singhal as a project',  //subject for email
                text: 'your data is successfully stored on our database' // content inside email
            }; 
            

            //callback to check if event is successfully completed or not
            mailTransporter.sendMail(mailDetails, function(err, data) { 
                if(err) { 
                    console.log(err); 
                } else { 
                    console.log('Email sent successfully'); 
                } 
            });
            return res.send('<script>alert("User created")</script>');
        }
        else{
            //if user is already present in the database dont send another mail
            console.log('User already present in the database');
            return res.write('<script>alert("your have already got mail from our side")</script>')
        //    return  res.redirect('back')
        }
    })
}