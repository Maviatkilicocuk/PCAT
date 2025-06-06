const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const app = express();

const photoController = require('./controllers/photoControllers')
const pageControllers = require('./controllers/pageControllers')

//Templates Engine
app.set('view engine', 'ejs');

//Connect DB
mongoose.connect('mongodb+srv://enverbilalbirinci:hIRvbM5WXmXzbCIk@envercluster.hsvipyz.mongodb.net/?retryWrites=true&w=majority&appName=Envercluster')
.then(()=> {
  console.log('DB Bağlantısı gerçekleşti')
}).catch(()=> {
  console.log(err)
});

//Middlerwares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageControllers.getAboutPage);
app.get('/add', pageControllers.getAddPage);
app.get('/photos/edit/:id', pageControllers.getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
