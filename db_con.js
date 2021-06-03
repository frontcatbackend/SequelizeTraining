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

const ActorFilm = sequelize_connect.define('ActorFilm', {})

// M:M

Actor.belongsToMany(Film,{through: 'ActorFilm'})
Film.belongsToMany(Actor,{through: 'ActorFilm'})

const run_db = async () => {
    const arnoldShwarznegger = await Actor.create({name: 'Arnold Shwarznegger'})
    const robertHammond = await Actor.create({name: 'Robert Hammond Patrick, Jr'})
    const sylvesterStallone = await Actor.create({name: ' Sylvester Gardenzio Stallone'})

    const terminator1 = await Film.create({filmname: "Terminator1"})
    const terminator2 = await Film.create({filmname: "Terminator2"})
    const rembo = await Film.create({filmname: "Rembo"})
    const rembo2 = await Film.create({filmname: "Rembo2"})

    await arnoldShwarznegger.addFilm([terminator1, terminator2])
    await robertHammond.addFilm([terminator2])
    await sylvesterStallone.addFilm([rembo, rembo2])

//calling 
    const actors = await Actor.findAll({include:[Film]})
    actors.forEach(actor => console.log(actor.toJSON()))
}

sequelize_connect.sync({force: true}).then(() => {
    run_db()
})