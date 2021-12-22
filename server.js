const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
var nodemailer = require('nodemailer');
const http = require("https");
const app = express();
const ag_router = express.Router();
const port = 8080


app.use(express.static(path.join(__dirname, "public")));
app.use(ag_router)
    // create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

ag_router.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
})
ag_router.post('/msg', urlencodedParser, function(req, res) {
    console.log(req.body);
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));    
    sendmail(req.body.name, req.body.email,req.body.phone, req.body.message)    
})


app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


sendmail = (name,from,phoneno,message) => {
    const mail = "singhrachit569@gmail.com";
    const password = "brsoeqlgzjmkblpr";


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mail,
            pass: password
        }
    });

    const subject = "New Message from "+name+" for Amit Dagar!";

    const msg = message+" <br><br>From: "+from+"<br>"+name+"<br>"+phoneno;

    const mailOptions = {
        from: mail, // sender address
        to: mail, // list of receivers
        subject: subject, // Subject line
        html: msg // plain text body
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    })
}




module.exports = {
    "app": app,
    "router": ag_router

}

