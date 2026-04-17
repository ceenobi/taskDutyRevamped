import jwt from "jsonwebtoken"
import createHttpError from "http-errors"
import { Request, Response, NextFunction } from "express"

interface AuthUser {
    id: string
}

declare global {
    namespace Express {
        interface Request {
            user: AuthUser
        }
    }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    //extract the token via gthe req.headers
    const token = req.headers.authorization?.split(" ")[1] //ensure we have the token without the Bearer word
    if (!token) {
        return next(createHttpError(401, "You are unauthenticated"))
    }
    //verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, decodedUser) => {
        if (err) {
            return next(createHttpError(403, "Broken or expired token"))
        }
        //assign our decoded user to the request object
        req.user = decodedUser as AuthUser
        //call next function to pass to the next action
        next()
    })
}

export default verifyToken