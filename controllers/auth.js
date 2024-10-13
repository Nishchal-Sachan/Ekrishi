import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user and save to db
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        });
        res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        console.error("Error creating user:", err.message);
        res.status(500).json({ message: "failed to create db", error: err.message });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {

        //check if the user exists
        const user = await prisma.user.findUnique({
            where: { username }
        });
        if (!user) return res.status(401).json({ message: "invalid credentials" });

        //check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "invalid credentials" });

        //generate cookie token and send it to user
        const age = 1000 * 60 * 60 * 24 * 7;
        const token = jwt.sign(
            {
                id: user.id,
                isAdmin: true,
            }, process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        const { password: userPassword, ...userInfo } = user;

        res
            .cookie("token", token, {
                httpOnly: true,
                // secure:true, //turn this on during deployment
                maxAge: age,
            })
            .status(201).json(userInfo)

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to login" })
    }
}

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "logout successful!" });
}