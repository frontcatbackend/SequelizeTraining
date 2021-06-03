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

const Serial = sequelize_connect.define('Serial', {
    serialname: {
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
const SerialActor = sequelize_connect.define('SerialActor')
const SerialCountry = sequelize_connect.define('SerialCountry')

// M:M

Actor.belongsToMany(Film,{through: 'ActorFilm'})
Film.belongsToMany(Actor,{through: 'ActorFilm'})
Country.belongsToMany(Actor,{through: "ActorCountry"})
Actor.belongsToMany(Country,{through: "ActorCountry"})
Country.belongsToMany(Film,{through: 'CountryFilm'})
Film.belongsToMany(Country,{through: 'CountryFilm'})
Actor.belongsToMany(Serial,{through:'SerialActor'})
Serial.belongsToMany(Actor,{through:'SerialActor'})
Country.belongsToMany(Serial,{through: 'SerialCountry'})
Serial.belongsToMany(Country,{through: 'SerialCountry'})

module.exports = {
    Actor,
    Film,
    Serial, 
    Country,
    ActorFilm,
    ActorCountry,
    SerialActor,
    SerialCountry,
    CountryFilm
}