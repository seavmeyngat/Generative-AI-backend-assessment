import { Router } from "express";
import { createCertificate } from '../controllers/certificate.controller';
import protectRoute from "../middleware/auth";
const router = Router();

router.post("/create", protectRoute(), createCertificate);

export default router;
