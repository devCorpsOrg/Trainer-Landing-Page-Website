const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
var nodemailer = require('nodemailer');
const http = require("https");
const app = express();
const ag_router = express.Router();
const port = 8080
const sdk = require('api')('@sendinblue/v3#5hvjgkxokc5gv');
sdk.auth('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');

app.use(express.static(path.join(__dirname, "public")));
app.use(ag_router)
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

ag_router.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
})
ag_router.post('/msg', urlencodedParser, function (req, res) {
    console.log(req.body);
    sendmail(req.body.name, req.body.email, req.body.phone, req.body.message);
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));    
})
ag_router.post('/addCandidate', urlencodedParser, function (req, res) {
    console.log(req.body);    
    addCandidate(req.body.name, req.body.phone,req.body.email);        
    // res.status(200).sendFile(path.join(__dirname, "public", "index.html"));    
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



addCandidate = function (name, no, mail) {    
    sdk.createContact({
        attributes: {FIRSTNAME: name, SMS: '+91'+no},
        listIds: [3],
        updateEnabled: true,
        email: mail
      })
        .then(res => console.log("contact created successfully!"))
        .catch(err => console.error(err));    
}

sendmail = (name, from, phoneno, message) => {
    const mail = "singhrachit569@gmail.com";
    const password = "brsoeqlgzjmkblpr";


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mail,
            pass: password
        }
    });

    const subject = "New Message from " + name + " for Amit Dagar!";

    const msg = message + " <br><br>From: " + from + "<br>" + name + "<br>" + phoneno;

    const mailOptions = {
        from: mail, // sender address
        to: mail, // list of receivers
        subject: subject, // Subject line
        html: msg // plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
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

