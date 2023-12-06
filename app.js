const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('node:path');
const PORT = 3000 || process.env.PORT;
const indexRoutes = require('./routes/index');
const linkRoutes = require('./routes/links');
const connectDB = require('./config/db');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(indexRoutes);

app.use('/links', linkRoutes);

connectDB()
   .then(() => {
      app.listen(PORT, () => {
         console.log(`Server is working on ${PORT}`);
      });
   })
   .catch((err) => {
      console.log('Error ', JSON.stringify(err));
   });
