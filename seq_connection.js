const { Sequelize, DataTypes } = require("sequelize");
const sequelize_connect = new Sequelize(
  "postgres://postgres:1@localhost:5432/sequelize_train"
);

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

const run = async () => {
  //create actors
  const arnoldShwarznegger = await Actor.create({name: "Arnold Shwarznegger",});
  const robertHammond = await Actor.create({name: "Robert Hammond Patrick, Jr",});
  const sylvesterStallone = await Actor.create({name: " Sylvester Gardenzio Stallone",});

  //create films
  const terminator1 = await Film.create({ filmname: "Terminator1" });
  const terminator2 = await Film.create({ filmname: "Terminator2" });
  const rembo = await Film.create({ filmname: "Rembo" });
  const rembo2 = await Film.create({ filmname: "Rembo2" });

  // create country
  const usa = await Country.create({country: 'U.S.A'})
  const austria = await Country.create({country: 'Austria'})

  // adding country to actor
  await arnoldShwarznegger.addCountry([austria])
  await robertHammond.addCountry([usa])
  await sylvesterStallone.addCountry([usa])

  //adding country to film
  await terminator1.addCountry([usa])
  await terminator2.addCountry([usa])
  await rembo.addCountry([usa])
  await rembo2.addCountry([usa])

  //adding films to actors
  await arnoldShwarznegger.addFilm([terminator1, terminator2]);
  await robertHammond.addFilm([terminator2]);
  await sylvesterStallone.addFilm([rembo, rembo2]);

  //adding actors to films
  await terminator1.addActor([arnoldShwarznegger]);
  await terminator2.addActor([arnoldShwarznegger, robertHammond]);
  await rembo.addActor([sylvesterStallone]);
  await rembo2.addActor([sylvesterStallone]);

  //calling
  //call all actors with films
  const actors = await Actor.findAll({ include: [Film ,Country] });
  actors.forEach((actor) => console.log(actor.toJSON()));

  // call all films with actors
  const films = await Film.findAll({ include: [Actor, Country] });
  films.forEach((film) => console.log(film.toJSON()));

  //     const getFilm = await ActorFilm.findOne({
  //         where: {
  //             FilmId:1,
  //             ActorId: 1
  //         }
  //     })
  //     console.log(getFilm)
};

// actors.forEach(actor =>{
//     console.log(actor.Films[0].ActorFilm.toJSON())
// })

sequelize_connect.sync({force:true}).then(() => {
  run();
});

module.exports = {
  sequelize_connect,
};
