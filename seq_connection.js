const { Sequelize, DataTypes } = require("sequelize");
const sequelize_connect = new Sequelize(
  "postgres://postgres:1@localhost:5432/sequelize_train"
);

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

  //create serials
  const some_swarz_serial = await Serial.create({serialname: "Some Serial With Arnold"})
  const some_stallone_serial = await Serial.create({serialname: "Some Serial With Stallone"})

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

  //adding country to serial 
  await some_stallone_serial.addCountry([usa])
  await some_swarz_serial.addCountry([austria])

  //adding films to actors
  await arnoldShwarznegger.addFilm([terminator1, terminator2]);
  await robertHammond.addFilm([terminator2]);
  await sylvesterStallone.addFilm([rembo, rembo2]);

  //adding serials to actors
  await arnoldShwarznegger.addSerial([some_swarz_serial])
  await sylvesterStallone.addSerial([some_stallone_serial])

  //adding actors to films
  await terminator1.addActor([arnoldShwarznegger]);
  await terminator2.addActor([arnoldShwarznegger, robertHammond]);
  await rembo.addActor([sylvesterStallone]);
  await rembo2.addActor([sylvesterStallone]);

  //adding actors to serials
  await some_stallone_serial.addActor([sylvesterStallone])
  await some_swarz_serial.addActor([arnoldShwarznegger])

  //calling
  //call all actors with films
  const actors = await Actor.findAll({ include: [Film ,Country, Serial] });
  actors.forEach((actor) => console.log(actor.toJSON()));

  // call all films with actors
  const films = await Film.findAll({ include: [Actor, Country] });
  films.forEach((film) => console.log(film.toJSON()));

  const serials = await Serial.findAll({include:[Actor, Country]})
  serials.forEach((serial)=> console.log(serial.toJSON()))

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
