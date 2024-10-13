import jwt from "jsonwebtoken";


export const shouldBeLoggedIn = (req, res) => {
    console.log(req.userId);
    res.status(201).json({ message: "You are Authenticated" });
}
export const shouldBeAdmin = (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json("Not Authenticated!");

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, userInfo) => {
        if (err) return res.status(403).json({ message: "token is not valid!" });
        if (!userInfo.isAdmin) return res.status(403).json({ message: "Not Authorized!" });
    });

    res.status(201).json({ message: "You are Authenticated" });
}
