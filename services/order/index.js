const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/order.routes'); // Importer les routes

dotenv.config();

const app = express();
app.use(express.json());

// Routes du service order
app.use('/api/orders', orderRoutes); // Ajouter le préfixe pour les commandes

// Route de test
app.get('/api/orders/test', (req, res) => {
  res.send('Order service is running');
});

// Connexion à MongoDB et démarrage du serveur
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to Order MongoDB');
  app.listen(process.env.PORT, () => {
    console.log(`Order service running on port ${process.env.PORT}`);
  });
})
.catch((err) => console.error('MongoDB connection error:', err));
