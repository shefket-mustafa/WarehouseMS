import { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    companyId: string
};

export interface AuthRequest extends Request{
    user?: JwtPayload
};

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;
    const SECRET = process.env.JWT_SECRET;

    if(!authHeader){
        return res.status(401).json({message: "Missing authorization header!"})
    };

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, SECRET as string) as JwtPayload;
        req.user = decoded;
        res.locals.companyId = decoded.companyId;
        next();
    }catch{
        return res.status(401).json({ message: "Invalid or expired token" });
    }

}