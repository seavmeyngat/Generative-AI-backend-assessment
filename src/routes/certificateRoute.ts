import { Router } from "express";
import { createCertificate } from '../controllers/certificate.controller';

const router = Router();

router.post("/create", createCertificate);

export default router;
