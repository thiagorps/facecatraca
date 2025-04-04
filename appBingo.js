const express = require("express")
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const ejs = require("ejs")
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', './templates');
app.use( express.static( "templates" ) );
//app.use(bodyParser.raw({ type: 'multipart/mixed' }));
// Permite receber JSON no body da requisição
app.use(express.json());

// Permite receber dados de formulário (opcional)
app.use(express.urlencoded({ extended: true }));
app.all("/User",(req,res)=>{
    res.status=200
    res.render('Bingo_user')
    
})

app.all("/notification",(req,res)=>{
    console.log("Conectou no notification")
    console.log(req.body)
    res.status=200
    res.end(JSON.stringify({"message":"ABBCASDF","code":200,"auth":"true"}))
})

app.all("/keepalive",(req,res)=>{
    console.log("entrou aqui")
    res.status=200
    res.end(JSON.stringify({"message":"ABBCASDF","code":200,"auth":"true"}))

})

app.all("/admin",(req,res)=>{
    res.status=200
    res.render('Bingo')
})
var numbers = []
io.on("connection",(socket)=>{
    socket.emit("Connect",numbers)
    socket.on("setNumber",(number)=>{
        numbers.push(number)
        io.emit("setNumber",number)
    })
    socket.on("removeNumber",(number)=>{
        numbers = numbers.filter((num)=>{
            return number!=num
        });console.log(numbers)
        io.emit("removeNumber", number)
    })
    socket.on("refresh", ()=>{
        numbers=[]
        io.emit("refresh",[])
    })
})
server.listen(21275,function(){
    console.log("servidor rodando na porta 21275")
})