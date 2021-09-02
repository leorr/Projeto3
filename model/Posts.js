import mongoose from "mongoose"

const PostsSchema = mongoose.Schema({
  title: {
      type: String,
      required: true 
  },
  content: {
      type: String,
      required: true
  },
	userId: {
		type: String,
		required: true
},
});

export default mongoose.model("posts", PostsSchema);