import User from '../../data/user.js';
import bcrypt from 'bcrypt';

export async function registerUser(userDetails) {
  const hashedPassword = await bcrypt.hash(userDetails.password, 10);

  return User.create({
    ...userDetails,
    password: hashedPassword,
    watchlist: [],
  });
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}
