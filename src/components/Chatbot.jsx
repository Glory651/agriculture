import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! How can I help you?" }
  ]);
  const [input, setInput] = useState("");

  // Response rules
  const responses = [
    {
      keywords: ["hello", "hi"],
      reply: "Hi there! 👋"
    },
    {
      keywords: ["price", "cost"],
      reply: "Our prices are affordable 💰"
    },
    {
      keywords: ["maggot", "waste"],
      reply:
        "Maggots help convert organic waste into high-quality protein and organic fertilizer used in sustainable farming."
    },
    {
      keywords: ["product", "buy", "shop"],
      reply:
        "🛒 You can explore maggot farming kits, organic feed, and waste processing tools in our Products section."
    },
    {
      keywords: ["training", "learn", "course"],
      reply:
        "🎓 We offer training on maggot farming, waste conversion systems, and sustainable agriculture. Check the Training section."
    },
    {
      keywords: ["sign up", "register"],
      reply:
        "🔐 To sign up, enter your name, email, and password, then verify your email address."
    },
    {
      keywords: ["sign in", "login"],
      reply:
        "🔑 To sign in, use your registered email and password. Use 'Forgot Password' if needed."
    }
  ];

  const getReply = (text) => {
    const lowerText = text.toLowerCase();

    for (let item of responses) {
      if (item.keywords.some((word) => lowerText.includes(word))) {
        return item.reply;
      }
    }

    return "I don't understand 🤔";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const botReply = getReply(input);

    const botMessage = { role: "bot", content: botReply };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div >
      {/* Chat Area */}
      <div className="text-center  " >
        {messages.map((msg, i) => (
          <div key={i} >
            <strong>{msg.role === "bot" ? "Officer: " : "Guest: "}</strong>
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="text-center">
        <input
          className="text-center"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;