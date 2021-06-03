const {Sequelize, DataTypes} = require('sequelize')
const connect = new Sequelize('postgres://postgres:1@localhost:5432/sequelize_train')


const Actor = connect.define('Actor', {
    name: {
        type: DataTypes.STRING,
    }
})

const Film = connect.define('Film', {
    filmname: {
        type: DataTypes.STRING,
    }
})

connect.sync({force:true}).then(()=> {
    Actor.create({
        name:"Name"
    })

    Film.create({
        filmname: "Film"
    })
})


module.exports = {
    connect,
     Actor,
     Film
    }

