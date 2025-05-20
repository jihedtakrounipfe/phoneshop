const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({ message: 'Accès interdit' });
    }

    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({ message: 'Accès interdit' });
    }

    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Sécurité : empêcher un client normal de changer son rôle
    if (req.user.role !== 'admin') {
      delete updates.role;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Seulement admin peut supprimer (à vérifier dans le middleware)
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
