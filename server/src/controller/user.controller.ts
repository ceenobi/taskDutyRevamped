import { Request, Response, NextFunction } from "express"
import User from "../model/user.model.js"
import createHttpError from "http-errors"
import bcrypt from "bcrypt"
import generateToken from "../config/generateToken.js"

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password } = req.body //req.body collects info via forms from the client
    try {
        //check if required fields are intact
        if (!email || !username || !password) {
            return next(createHttpError(400, "Form fields are required"))
        }
        //check if username or email already exists
        const [emailExists, usernameExists] = await Promise.all([
            User.findOne({ email: email }).lean(),
            User.findOne({ username: username }).lean()
        ])
        if (emailExists) {
            return next(createHttpError(400, "Email already exists"))
        }
        if (usernameExists) {
            return next(createHttpError(400, "Username already exists"))
        }
        //if username or email is fresh, proceed to next step - handle password
        const salt = await bcrypt.genSalt(10) //encryption mechanism
        const hashPassword = await bcrypt.hash(password, salt) //encrypyts the password
        //proceed to creating our user
        const user = await User.create({
            email,
            username,
            password: hashPassword
        })
        //sign the document - generate an accessToken
        const accessToken = generateToken(user._id)
        //send response to the client
        res.status(201).json({ accessToken, msg: "Signup successful", success: true })
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    try {
        if (!username || !password) {
            return next(createHttpError(400, "Username or password is missing"))
        }
        //try and find user in our db - also retrieve user password
        const user = await User.findOne({ username: username }).select("+password")
        if (!user) {
            return next(createHttpError(404, "User account not found"))
        }
        //handle password check
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return next(createHttpError(401, "Username or password is incorrect"))
        }
        //genarate accesstoken and send to the user
        const accessToken = generateToken(user._id)
        res.status(200).json({ accessToken, msg: `Welcome ${user.username}` })
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id //gotten from our jwt aattached to our request object
    try {
        const user = await User.findById(userId).lean()
        if (!user) {
            return next(createHttpError(404, "Account not found"))
        }
        res.status(200).json({ user, success: true })
    } catch (error) {
        next(error)
    }
}

