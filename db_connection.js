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

const ActorFilm = connect.define('ActorFilm', {})

// M:M

Actor.belongsToMany(Film,{through: 'ActorFilm'})
Film.belongsToMany(Actor,{through: 'ActorFilm'})

// Actor.hasMany(Film)
// Film.belongsTo(Actor)

const run = async () => {
    // await Actor.create({
    //     name:"Name 1"
    // }).then(new_actor => {
    //     console.log(new_actor)
    // })
    // await Film.create({
    //     filmname: "Film 1"
    // }).then(new_film => {
    //     console.log(new_film)
    // })

    const new_actor = await Actor.create({name: 'Alexander Kurizin'},{})
    // console.log(new_actor)

    const new_film = await Film.create({filmname: 'Newskiy Drift'})
    const new_film0 = await Film.create({filmname: 'Kurizin In Wegas'})
    // console.log(new_film)   

    await new_actor.addFilm([new_film, new_film0])

    const actors = await Actor.findAll({include:[Film]})
    actors.forEach(actor => console.log(actor.toJSON()))
    // actors.forEach(actor =>{
    //     console.log(actor.Films[0].ActorFilm.toJSON())
    // })
    // const association = await ActorFilm.findOne({
    //     where: {
    //         FilmId: 1,
    //         ActorId: 1
    //     }
    // })
    // console.log(association.toJSON())
}

connect.sync({force:true}).then(()=> {
  run()
})


// module.exports = {
//     connect,
//      Actor,
//      Film
//     }

