const { Sequelize, DataTypes } = require("sequelize");
const sequelize_connect = new Sequelize(
  "postgres://postgres:1@localhost:5432/sequelize_one_to_many"
);

  const DogOwner = sequelize_connect.define('DogOwner', {
    name:{type: DataTypes.STRING}
})
const Dog = sequelize_connect.define('Dog', {
    name:{type: DataTypes.STRING}
})

// Dog.belongsTo(DogOwner)
DogOwner.hasMany(Dog)
// DogOwner.hasMany(Dog,{as:"dogs", foreignKey:"doGId", onDelete:'CASCADE', onUpdate:'CASCADE'})
// Dog.belongsTo(DogOwner, {as:"dogowner",
//     foreignKey:"DogOwnerId"
// })

const run = async()=>{
    //create DogOwner
    const Peter = await DogOwner.create({name: 'Peter'}).then(res=>{
        let ownerId = res.id
        let ownerName = res.name
        Dog.create({name:'Barbos', DogOwnerId: ownerId}).catch(err=>console.log(err));
        Dog.create({name:'Kuzua', DogOwnerId: ownerId}).catch(err=>console.log(err));
    }).catch(err=>console.log(err));

  
    const David = await DogOwner.create({name: 'David'}).then(res=>{
        let ownerId = res.id
        Dog.create({name:'Tuzik', DogOwnerId: ownerId}).catch(err=>console.log(err));
        Dog.create({name:'Sharik', DogOwnerId: ownerId}).catch(err=>console.log(err));
        Dog.create({name:'Murka', DogOwnerId: ownerId}).catch(err=>console.log(err));
    }).catch(err=>console.log(err));

   

    //adding dog to owner
    
    //calling
    const dogOwners = await DogOwner.findAll({})
    dogOwners.forEach(owners => console.log(owners.toJSON()))

   const dogs = await Dog.findAll({})
   dogs.forEach(dog=>console.log(dog.toJSON()))
}

sequelize_connect.sync({ force: true }).then(() => {
  run();
});












// const Tutorial = sequelize_connect.define("tutorial", {
//   title: {
//     type: DataTypes.STRING,
//   },
//   description: {
//     type: DataTypes.STRING,
//   },
// });

// const Comment = sequelize_connect.define("comment", {
//   name: {
//     type: DataTypes.STRING,
//   },
//   text: {
//     type: DataTypes.STRING,
//   },
// });

// Tutorial.hasMany(Comment, { as: "comments" });
// Comment.belongsTo(Tutorial, {
//   foreignKey: "tutorialId",
//   as: "tutorial",
// });

// const run = async() =>{
//     Tutorial.create({
//         title: "title",
//         description: "description",
//       })

//       Comment.create({
//         name: "name",
//         text: "text",
//         tutorialId: 42,
//       })

//      const tutorials = await Tutorial.findAll({  });
//      tutorials.forEach(tut=>{
//          console.log(tut.toJSON())
//      })
// }
