import express from 'express';
import { logInUser, signUpUser } from '../controller/userLogin.controller.js';

const router = express.Router();

router.post('/signUpUser', signUpUser);

router.post('/logInUser', logInUser);

export default router;