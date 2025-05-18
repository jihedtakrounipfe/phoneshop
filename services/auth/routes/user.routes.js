const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');

const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

router.get('/users', verifyToken, isAdmin, getAllUsers);
router.get('/users/:id', verifyToken, getUserById);
router.put('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);

module.exports = router;
