const { Sequelize, DataTypes } = require("sequelize");
const sequelize_connect = new Sequelize(
  "postgres://postgres:1@localhost:5432/sequelize_one_to_one"
);

const User = sequelize_connect.define("User", {
  user_name: { type: DataTypes.STRING },
});
const Account = sequelize_connect.define("Account", {
  account_name: { type: DataTypes.STRING },
});

Account.belongsTo(User);
User.hasOne(Account);

//Sequelize automatically creates two instance methods for accounts, "getUser" and "setUser".
// This is because we defined Account.belongsTo(User)
// Likewise, users get two instance methods, "getAccount" and "setAccount" (because we defined User.hasOne(Account))

const run = async () => {
  const andrew = await User.create({ user_name: "Andrew" });
  const twitter = await Account.create({ account_name: "Twitter" });

  await twitter.setUser(andrew);
  await andrew.setAccount(twitter);

  const accountUser = await Account.findAll({include:[{model:User}]})
  console.log(accountUser[0].toJSON())

  const userAccount = await User.findAll({include: [{model:Account}]})
  console.log(userAccount[0].toJSON())

  //   const getAccounts = async () => {
  //     const user = await User.findAll({ include: [{ model: Account }] });
  //     console.log(user[0].toJson());
  //   };
  //   const getUsers = async () => {
  //     const account = await Account.findAll({ include: [{ model: User }] });
  //     console.log(account[0].toJson);
  //   };
  //   getAccounts();
  //   getUsers();
  //   console.log((await twitter.setUser(andrew)))
  //   console.log((await twitter.getUser({include:[{model: Account}]})))
//   console.log(
//    
};

sequelize_connect.sync({ force: true }).then(() => {
  run();
});
