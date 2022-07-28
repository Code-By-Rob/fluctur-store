// Third-Party Libraries & Tools
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

require('dotenv').config();

// Anything Server Related
const app = express();
const PORT = process.env.PORT || 3000;
const admin = require('./routes/admin')(upload);
const imageAPI = require('./api/images.api');
const productsAPI = require('./api/products.api');

// Express plugins
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/Admin', admin);
app.use('/api/images', imageAPI);
app.use('/api/products', productsAPI);

// Connect to MongoDB Database
// process.env.MONGODB_KEY === dotenv path || mongodb://localhost:27017/mern-basic-template-database
mongoose.connect(process.env.MONGODB_KEY, { // Note: You can change the string after the '/' to whatever suites you.
    useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => {
    console.log('CONNECTION OPEN!');
})
.catch(err => {
    console.log('CONNECTION ERROR!')
    console.log(err);
})

// Application Routes

// Opening the port
app.listen(PORT, () => {
    console.log(`APP IS LISTENING ON PORT ${PORT}!`);
})