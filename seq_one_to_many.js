const { Sequelize, DataTypes } = require("sequelize");
const sequelize_connect = new Sequelize(
  "postgres://postgres:1@localhost:5432/sequelize_one_to_many"
);

const Owner = sequelize_connect.define('Owner', {
  name:{type: DataTypes.STRING}
})

const Pug = sequelize_connect.define('Pug', {
  name:{type: DataTypes.STRING}
})

// sequelize automatically creates three instance methods for pugs,
//  "getOwner", "setOwner", and "createOwner". 
// This is because we defined Pug.belongsTo(Owner). 
// Likewise, owners get a bunch of new instance methods,
//  "getPugs", "setPugs", "createPug", "addPug", "addPugs", "removePug", "removePugs", "hasPug",
//   "hasPugs", and "countPugs"

Pug.belongsTo(Owner)
Owner.hasMany(Pug)

async function run (){

  const peterOwner = await Owner.create({name: "Peter"})
  const tuzikPug = await Pug.create({name: "Tuzik"})
  const sharikPug = await Pug.create({name: "Sharik"})

  await peterOwner.setPugs([tuzikPug, sharikPug])
  await tuzikPug.setOwner(peterOwner)
  await sharikPug.setOwner(peterOwner)

// calling Owner.hasMany(Pug)
  const pugsOwner = await Owner.findAll({include:[{model: Pug}]})
  pugsOwner.forEach((pugs)=> console.log(pugs.toJSON()))

//calling Pug.belongsTo(Owner)
  const ownersPugs = await Pug.findAll({include:[{model: Owner}]})
  ownersPugs.forEach((owners)=> console.log(owners.toJSON()))
}

sequelize_connect.sync({ force: true }).then(() => {
  run();
});


// const DogOwner = sequelize_connect.define('DogOwner', {
//   name:{type: DataTypes.STRING}
// })
// const Dog = sequelize_connect.define('Dog', {
//   name:{type: DataTypes.STRING}
// })

// // Dog.belongsTo(DogOwner)
// DogOwner.hasMany(Dog)
// // DogOwner.hasMany(Dog,{as:"dogs", foreignKey:"doGId", onDelete:'CASCADE', onUpdate:'CASCADE'})
// // Dog.belongsTo(DogOwner, {as:"dogowner",
// //     foreignKey:"DogOwnerId"
// // })

// const run = async()=>{
//   //create DogOwner
//   const Peter = await DogOwner.create({name: 'Peter'}).then(res=>{
//       let ownerId = res.id
//       let ownerName = res.name
//       Dog.create({name:'Barbos', DogOwnerId: ownerId}).catch(err=>console.log(err));
//       Dog.create({name:'Kuzua', DogOwnerId: ownerId}).catch(err=>console.log(err));
//   }).catch(err=>console.log(err));


//   const David = await DogOwner.create({name: 'David'}).then(res=>{
//       let ownerId = res.id
//       Dog.create({name:'Tuzik', DogOwnerId: ownerId}).catch(err=>console.log(err));
//       Dog.create({name:'Sharik', DogOwnerId: ownerId}).catch(err=>console.log(err));
//       Dog.create({name:'Murka', DogOwnerId: ownerId}).catch(err=>console.log(err));
//   }).catch(err=>console.log(err));

 

//   //adding dog to owner
  
//   //calling
//   const dogOwners = await DogOwner.findAll({})
//   dogOwners.forEach(owners => console.log(owners.toJSON()))

//  const dogs = await Dog.findAll({})
//  dogs.forEach(dog=>console.log(dog.toJSON()))
// }