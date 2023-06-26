const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const mongoose=require('mongoose');
const cities=require('./model.js');
const app = express();
const port = 3000;
const cors=require('cors');
// MongoDB Connection
const mongoURI = 'mongodb+srv://dishantsoni:dishant123@cluster0.bxd4fu6.mongodb.net/cityDB';
const dbName = 'cityDB';
const path=require('path');

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
// MongoClient.connect(url, function (err, client) {
//   if (err) {
//     console.log('Error connecting to MongoDB:', err);
//     return;
//   }

//   console.log('Connected to MongoDB successfully');

//   const db = client.db(dbName);
//   const collection = db.collection('cities');

  // API endpoint to retrieve city details
  app.use(cors());
  app.get('/api/city/:cityName', async(req, res) => {
    const cityName = req.params.cityName;

    const city=await cities.findOne({ city: cityName });
      if(city){
        return res.json(city);
      }
      else if(!city){
        return res.status(404).json({
            message:"City not found"
        })
      }
    });
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
    app.get('/api/city/',async (req,res)=>{
      const city=await cities.find();
      return res.json(city);
    })

  // Start the server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

