// use the path of your model
const Post = require("../models/postModel");
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
describe("Product Schema test anything", () => {
  // the code below is for insert testing
  it("Add product testing anything", () => {
    const post = {
      title: "hello",
      subtitle: "hello",
      description: "Hello world",
    };
    return Post.create(post).then((post) => {
      expect(post.title).toEqual("hello");
    });
  });
});
