"use client";
import { useState } from "react";

import ChatBox from "./components/ChatBox";
import NavBar from "./components/NavBar";
import MessageItem from "./components/MessageItem";

let chatRequest = {
  messages: [],
  context: {
    overrides: {
      use_advanced_flow: true,
      top: 3,
      retrieval_mode: "hybrid",
      temperature: 0.3,
    },
  },
  sessionState: null,
};

export default function Home() {
  const [chatMessages, setChatMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState("");

  const createNewMessage = async () => {
    try {
      const newMessage = { content: activeMessage, role: "user" };
      let updatedMessages = [...chatMessages, newMessage];

      setActiveMessage("");

      setChatMessages(updatedMessages);

      const completion = await getCompletion(updatedMessages);

      setChatMessages([...updatedMessages, { content: completion, role: "assistant" }]);

    } catch (e) {
      console.log(e);
    }
  };

  const startNewChat = () => {
    setChatMessages([]);
  };

  const getCompletion = async (messages) => {
    chatRequest.messages = messages;

    const response = await fetch(
      "https://pf-rag-postgres-azi-ca.orangesmoke-87d745a1.eastus2.azurecontainerapps.io/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatRequest),
      }
    );
    const data = await response.json();
    return data.message.content;
  };

  return (
    <div className="is-flex is-flex-direction-column is-full-height">
      <div className="is-flex-grow-1 no-scrollbar">
        <NavBar handleNewChatButtonClick={startNewChat}></NavBar>
        <div className="columns is-full-height is-gapless is-relative is-mobile">
          <div className="column is-flex is-flex-direction-column">
            <div
              id="thread"
              className="overflow-scroll is-flex-grow-1 no-scrollbar"
            >
              {chatMessages.map((message, index) => (
                <MessageItem key={index} message={message} />
              ))}
            </div>
            <footer>
              <ChatBox
                activeMessage={activeMessage}
                setActiveMessage={setActiveMessage}
                handleSendButtonClick={createNewMessage}
              ></ChatBox>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
