const User = require('../models/User')
const nodemailer = require('nodemailer')

module.exports.User = (req, res) => {
    //check if password and confirm password entered are same or not
    if(req.body.password != req.body.confirm_password){
        res.send('<script>alert("password and confirm password dont match")</script>')
        res.redirect('back')
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
            //create a create transport object with your credentials and which email service you want to use
            //use your gmail email and password here 
            let mailTransporter = nodemailer.createTransport({ 
                service: 'gmail', 
                host: 'smtp.gmail.com',
                auth: { 
                    user: 'dhruv.singhal2612@gmail.com',//your email here i have used my email
                    pass: your_password
                } 
            }); 
              
            //details about whom to send with email subject and message
            let mailDetails = { 
                from: '"dhruv.singhal2612" <dhruv.singhal2612@gmail.com>', //your email
                to: req.body.email, 
                subject: 'from dhruv singhal as a project', 
                text: 'your data is successfully stored on our database'
            }; 
            //send email with a callback regarding success of the event
            mailTransporter.sendMail(mailDetails, function(err, data) { 
                if(err) { 
                    console.log(err); 
                } else { 
                    console.log('Email sent successfully'); 
                } 
            });
            return res.send('<script>alert("User created")</script>');
        }
        // if user has already sent an email just tell him that he has been already added in the database
        else{
            console.log('User already present in the database');
            return res.send('<script>alert("your have already got mail from our side")</script>')
        }
    })
}