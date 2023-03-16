import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();

import { signin, signup,fetchusers,followUser } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get('/fetchusers',fetchusers)

router.patch('/:id/follow', auth,followUser);


export default router;