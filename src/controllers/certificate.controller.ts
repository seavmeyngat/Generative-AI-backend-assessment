import { Request, Response } from "express";
import { UserInfo } from "../entity/user.entity";
import { AppDataSource } from '../config';
import { Certificate } from "../entity/certificate.entity";
export const createCertificate = async (req: Request, res: Response) => {
    const { userId, courseName } = req.body;
    const users = AppDataSource.getRepository(UserInfo);
    const certificateData = AppDataSource.getRepository(Certificate);

    if (!userId || !courseName) {
        return res.status(404).json({ message: "certificate not found" })
    }
    try {
        const user = await users.findOne({ where: { id: req.user?.id } })
        if (!user) {
            return res.status(404).json({
                message: "user not found",
            })
        }

        const certificates = new Certificate();
        certificates.user = user
        certificates.courseName = courseName
        await certificateData.save(certificates)

        res.status(201).json({
            id: certificates.id,
            userId: user.id,
            courseName: certificates.courseName,
            createdAt: certificates.createdAt
        })

    } catch (err) {
        return res.status(500).json({
            message: "Interal server not found"
        })
    }
}
