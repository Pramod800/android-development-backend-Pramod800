// use the path of your model
const User = require("../models/userModel");
const mongoose = require("mongoose");
// use the new name of the database
const url = "mongodb://127.0.0.1:27017/Blog";
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe("Register Schema test anything", () => {
  // the code below is for insert testing
  it("Register testing anything", () => {
    const user = {
      username: "hello",
      password: "1234567",
      email: "hello@gmail.com",
    };
    return User.create(user).then((pro_ret) => {
      expect(pro_ret.username).toEqual("hello");
      expect(pro_ret.password).toEqual("1234567");
    });
  });
});

