import mongoose from 'mongoose';

const userPost = mongoose.Schema({
  responsible: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
      type: String,
      
  }
});

export default mongoose.model("user", UserSchema);