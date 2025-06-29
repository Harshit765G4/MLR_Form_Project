const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorName: String,
  designation: String,
  registrationNo: {
    type: String,
    match: /^[0-9]{1,4}$/,
  },
});

const mlrSchema = new mongoose.Schema({
  doctors: [doctorSchema],
  patientName: String,
  fatherName: String,
  title: String,
  relativeName: String,
  age: Number,
  religion: String,
  gender: String,
  maritalStatus: String,
  date: String,
});

module.exports = mongoose.model('MLR', mlrSchema);