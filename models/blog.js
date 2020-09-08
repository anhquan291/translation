const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  //option
  { timestamps: true }
);

//set the blogs collection
const Blog = mongoose.model('Blogs', blogSchema);

module.exports = Blog;
