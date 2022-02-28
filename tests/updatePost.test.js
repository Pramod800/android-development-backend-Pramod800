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
it("to test the update", async () => {
  return Post.findOneAndUpdate(
    { _id: Object("6217775f952399c5b0b19d22") },
    { $set: { title: "how are you" } }
  );
});


