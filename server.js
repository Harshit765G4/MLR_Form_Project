const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const reportRoutes = require('./routes/reports');
const MLR = require('./models/MLR');

const app = express();

mongoose.connect('mongodb://localhost:27017/mlr', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(reportRoutes);

app.get('/', (req, res) => res.redirect('/mlr-form.html'));

app.post('/submit-mlr', async (req, res) => {
  try {
    const doctors = [];
    for (let i = 1; i <= 5; i++) {
      if (req.body[`doctorName${i}`]) {
        doctors.push({
          doctorName: req.body[`doctorName${i}`],
          designation: req.body[`designation${i}`],
          registrationNo: req.body[`registrationNo${i}`]
        });
      }
    }

    const mlr = new MLR({
      doctors,
      patientName: req.body.patientName,
      fatherName: req.body.fatherName,
      title: req.body.title,
      relativeName: req.body.relativeName,
      age: req.body.age,
      religion: req.body.religion,
      gender: req.body.gender,
      maritalStatus: req.body.maritalStatus,
      date: req.body.date,
    });

    await mlr.save();
    res.redirect('/admin.html');
  } catch (error) {
    console.error('Error saving MLR:', error);
    res.status(500).send('Error saving MLR data');
  }
});

app.listen(3000, () => console.log('Server running: http://localhost:3000'));