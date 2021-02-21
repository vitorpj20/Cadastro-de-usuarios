const Sequelize = require('sequelize')
const connection = require('./database')

//Cria a tabela no banco de dados.
const Usuario = connection.define('usuarios',{
    nome:{
        type: Sequelize.STRING,
        allowNull:false
    },
    idade:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    cidade:{
        type:Sequelize.STRING,
        allowNull:false
    }
})


//Forca a criacao da tabela.
//Usuario.sync({force:false}).then(()=>{})

module.exports = Usuario;