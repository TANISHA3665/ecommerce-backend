const { Router } = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');
const  authenticate  = require('../middleware/auth.middleware');

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

module.exports = router;
