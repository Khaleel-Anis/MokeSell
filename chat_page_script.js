document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "67a87718f247e57112117e1a";
    const CHAT_API_URL = "https://mokesell-cd4f.restdb.io/rest/chats";

    const urlParams = new URLSearchParams(window.location.search);
    const buyerId = urlParams.get("buyerId");
    const sellerId = urlParams.get("sellerId");

    const chatWindow = document.getElementById("chatWindow");
    const chatForm = document.getElementById("chatForm");
    const messageInput = document.getElementById("messageInput");

    //  Load existing chat messages
    loadChatMessages();

    chatForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const message = messageInput.value.trim();

        if (message !== "") {
            await sendMessage(buyerId, sellerId, message);
            messageInput.value = "";
            loadChatMessages(); // Refresh the chat window
        }
    });

    async function loadChatMessages() {
        try {
            const query = encodeURIComponent(JSON.stringify({
                buyerId: buyerId,
                sellerId: sellerId
            }));

            const response = await fetch(`${CHAT_API_URL}?q=${query}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": API_KEY,
                },
            });

            const chats = await response.json();
            chatWindow.innerHTML = "";

            if (chats.length > 0) {
                const messages = JSON.parse(chats[0].messages || "[]");
                messages.forEach(msg => {
                    const messageElement = document.createElement("article");
                    messageElement.classList.add("message");
                    messageElement.classList.add(msg.senderId === buyerId ? "buyer" : "seller");
                    messageElement.textContent = msg.content;
                    chatWindow.appendChild(messageElement);
                });
            }

            // Auto-scroll to the latest message
            chatWindow.scrollTop = chatWindow.scrollHeight;
        } catch (error) {
            console.error("Error loading messages:", error);
        }
    }

    async function sendMessage(buyerId, sellerId, message) {
        try {
            const query = encodeURIComponent(JSON.stringify({ buyerId, sellerId }));
            const response = await fetch(`${CHAT_API_URL}?q=${query}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": API_KEY,
                },
            });

            const chats = await response.json();
            let chat;

            if (chats.length > 0) {
                // ✅ Update existing chat
                chat = chats[0];
                const messages = JSON.parse(chat.messages || "[]");
                messages.push({ senderId: buyerId, content: message, timestamp: new Date().toISOString() });

                await fetch(`${CHAT_API_URL}/${chat._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-apikey": API_KEY,
                    },
                    body: JSON.stringify({ ...chat, messages: JSON.stringify(messages) }), //  Store as JSON string
                });
            } else {
                // ✅ Create new chat
                chat = {
                    buyerId,
                    sellerId,
                    messages: JSON.stringify([
                        { senderId: buyerId, content: message, timestamp: new Date().toISOString() }
                    ]),
                };

                await fetch(CHAT_API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-apikey": API_KEY,
                    },
                    body: JSON.stringify(chat),
                });
            }

            loadChatMessages(); // Refresh the chat after sending
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
});