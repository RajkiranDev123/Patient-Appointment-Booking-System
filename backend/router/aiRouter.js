import express from "express";
import {
 
    ask,
} from "../controller/aiController.js";

const router = express.Router();

router.post("/ask", ask);


export default router;