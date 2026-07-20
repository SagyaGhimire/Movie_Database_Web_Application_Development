import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },    
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {       
    type: String,
    required: true,
  },
  timestamps: true
}
);
const User = mongoose.model("User", userSchema);

User.pre("save", ()=> {
    if(this.isModified("password")){
        this.password = bcrypt.hashSync(this.password, 10);
    }
});

export default User;
