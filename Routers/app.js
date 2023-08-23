const express = require('express');
const fs = require('fs');

const router = express.Router();
const localStorage = require("localstorage");


router.get('/login',(req,res,next)=> {
    res.send('<form action="/chat" method="POST"><input type="text" name="username"><button type="submit">LogIn</button></form>');
});

router.post('/chat',(req,res,next)=>{
    let str = req.body.username; 
    localStorage.setItem("username",str);
    res.send('<form action="/" method="POST"><input type="text" name="chat"><button type="submit">Send</button></form>'); 
    
});
router.post('/',(req,res,next) => {
    let msg = req.body.chat;
    let user = localStorage.getItem("username");
    let chat = `${user} : ${msg}  ,  `;
    fs.readFile("message.txt",(err,data) => {
        if(err){
            console.log(err);
        }
        chat = data + chat;
        fs.writeFileSync("message.txt",chat);
        res.write('<html><body>');
        res.write(`<h1>${chat} </h1>`);
        res.write('<form action="/" method="POST"><input type="text" name="chat"><button type="submit">Send</button></form>');
        res.write('</body></html>')  ;
        return res.end();
    });

});

module.exports = router;