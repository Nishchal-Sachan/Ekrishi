import express from 'express';
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.js";
import authRoute from "./routes/auth.js";
import testRoute from "./routes/test.js";
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import messageRoute from "./routes/message.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Adjust this if needed
    credentials: true // Allow credentials (cookies) to be sent
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/auth/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.listen(8080, () => {
    console.log("App is listening on port 8080");
});
