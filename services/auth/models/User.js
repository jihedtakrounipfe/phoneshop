const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'client'], default: 'client' },
  dateOfBirth: { type: Date, required: false },
  phone: { type: String, required: false },
  address: {
    street: String,
    city: String,
    zipCode: String,
    country: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
