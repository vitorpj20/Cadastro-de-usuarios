//Servidor
const express = require('express')
const app = express()

//Formulario
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//Banco de dados
const connection = require('./database/database')
const Usuario = require('./database/Usuario')


//Motor de render
app.set('view engine', 'ejs')

//Arquivos estaticos
app.use(express.static('public'))


//Rotas
app.get('/',(req,res)=>{

    Usuario.findAll({
        raw:true,
        order:[
                ['id','ASC']
            ]
    }).then((usuarios)=>{
        res.render('index',{
            usuarios:usuarios
        })
    })
})

app.get('/criar',(req,res)=>{
    res.render('criar')
})

app.post('/cadastrar',(req,res)=>{
    var nome = req.body.nome
    var idade = req.body.idade
    var cidade = req.body.cidade

    Usuario.create({
        nome:nome,
        idade:idade,
        cidade:cidade
    }).then(()=>{
        res.redirect('/')
    })
})

app.get('/editar',(req,res)=>{
    Usuario.findAll({
        raw:true,
        order:[
                ['id','ASC']
            ]
    }).then((usuarios)=>{
        res.render('editar',{
            usuarios:usuarios
        })
    })
})

app.get('/editarusuario/:id',(req,res)=>{
    var id = req.params.id

    Usuario.findByPk(id).then((usuario)=>{
        if(usuario != undefined){
            res.render('editarform',{usuario:usuario})
        }else{
            res.redirect('/')
        }
    })
})

app.post('/editarusuario',(req,res)=>{
    var id = req.body.id
    var nome = req.body.nome
    var idade = req.body.idade
    var cidade = req.body.cidade
    
    Usuario.update({nome:nome,idade:idade,cidade:cidade},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect('/')
    })
})

app.get('/deletar',(req,res)=>{
    Usuario.findAll({
        raw:true,
        order:[
                ['id','ASC']
            ]
    }).then((usuarios)=>{
        res.render('deletar',{
            usuarios:usuarios
        })
    })
})

app.post('/apagarusuario',(req,res)=>{
    var id = req.body.id
    Usuario.destroy({
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect('/')
    })
})


//Porta para rodar
app.listen(8082, ()=>{
    console.log('Server criado, na porta 8082.')
})