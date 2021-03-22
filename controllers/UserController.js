const User = require('../models/User')
const nodemailer = require('nodemailer')

module.exports.User = (req, res) => {
    if(req.body.password != req.body.confirm_password){
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
            let mailTransporter = nodemailer.createTransport({ 
                service: 'gmail', 
                host: 'smtp.gmail.com',
                auth: { 
                    user: 'dhruv.singhal2612@gmail.com',
                    pass: your_password
                } 
            }); 
              
            let mailDetails = { 
                from: '"dhruv.singhal2612" <dhruv.singhal2612@gmail.com>', 
                to: req.body.email, 
                subject: 'from dhruv singhal as a project', 
                text: 'your data is successfully stored on our database'
            }; 
              
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
            console.log('User already present in the database');
            res.send('<script>alert("your have already got mail from our side")</script>')
        }
    })
}