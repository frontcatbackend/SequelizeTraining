const {Sequelize, DataTypes} = require('sequelize')
const sequelize_connect = new Sequelize('postgres://postgres:1@localhost:5432/sequelize_train')

//schema
const Actor = sequelize_connect.define('Actor', {
    name: {
        type: DataTypes.STRING,
    }
})

const Film = sequelize_connect.define('Film', {
    filmname: {
        type: DataTypes.STRING,
    }
})

const Country = sequelize_connect.define('Country', {
    country: {
        type: DataTypes.STRING,
    }
})

const ActorFilm = sequelize_connect.define('ActorFilm', {})
const ActorCountry = sequelize_connect.define('ActorCountry', {})
const CountryFilm = sequelize_connect.define('CountryFilm', {})

// M:M

Actor.belongsToMany(Film,{through: 'ActorFilm'})
Film.belongsToMany(Actor,{through: 'ActorFilm'})
Country.belongsToMany(Actor,{through: "ActorCountry"})
Actor.belongsToMany(Country,{through: "ActorCountry"})
Country.belongsToMany(Film,{through: 'CountryFilm'})
Film.belongsToMany(Country,{through: 'CountryFilm'})

module.exports = {
    Actor,
    Film,
    Country,
    ActorFilm,
    ActorCountry,
    CountryFilm
}