const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Leire:Plaiaundi2020@cluster0.vhbtl.mongodb.net/prueba?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));

/*
mongoose.connect('mongodb://localhost/reto', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));
  */