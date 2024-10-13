import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.chatId;
    const text = req.body.text;

    try {
        // Retrieve the chat using only the ID
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
            },
        });

        // Check if the chat exists and if the user is part of the chat
        if (!chat || !chat.userIDs.includes(tokenUserId)) {
            return res.status(404).json({ message: "Chat not found or user not authorized!" });
        }

        // Create the new message with userId and connect to chat
        const message = await prisma.message.create({
            data: {
                text,
                userId: tokenUserId, // Directly include userId
                chat: {
                    connect: { id: chatId }, // Connect to the chat
                },
            },
        });

        // Update the chat to reflect the new message
        await prisma.chat.update({
            where: {
                id: chatId,
            },
            data: {
                seenBy: { push: tokenUserId }, // Use push if you're adding to an array
                lastMessage: text,
            },
        });

        res.status(200).json(message);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to add message!" });
    }
};
