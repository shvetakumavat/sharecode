import mongoose from "mongoose";

const {ObjectId}=mongoose.Schema.Types;
const userSchema = mongoose.Schema({
  firstName: { type: String, required:  true },
  lastName: { type: String, required:  true },
  email: { type: String, required: true },
  password: {type: String, required: false},
  profilePicture: {type: String, required: false},
  id: { type: String },
  followers:{type: [String], default: []},
  following:{type: [String], default: []}

});

export default mongoose.model("User", userSchema);
