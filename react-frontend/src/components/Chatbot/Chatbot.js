import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChatbotContext } from '../../context/ChatbotContext';

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 480px) {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }
`;

const ChatbotToggleButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--gradient-pink);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff4757;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: bold;
  }

  @media (max-width: 480px) {
    width: 55px;
    height: 55px;
    bottom: 1rem !important;
    right: 1rem !important;
  }
`;

const ChatWindow = styled.div`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 400px;
  height: 600px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;
  max-height: 80vh;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    width: calc(100vw - 2rem);
    height: calc(90vh - 80px);
    max-width: 500px;
    bottom: auto;
    right: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    max-height: 90vh;
  }

  @media (max-width: 480px) {
    position: fixed;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100vh;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    transform: none;
    border-radius: 0;
    display: flex;
    flex-direction: column;
  }
`;

const ChatHeader = styled.div`
  background: var(--gradient-pink);
  color: white;
  padding: 1.2rem;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    
    h3 {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    border-radius: 0;
    padding: 0.9rem;
    
    h3 {
      font-size: 0.95rem;
      gap: 0.3rem;
    }
  }
`;

const ChatHeaderButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }
  }

  @media (max-width: 480px) {
    gap: 0.3rem;

    button {
      padding: 0.3rem 0.6rem;
      font-size: 0.8rem;
    }
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background: #f8f9fa;
  min-height: 200px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;

    &:hover {
      background: #999;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;
    min-height: auto;
  }
`;

const Message = styled.div`
  display: flex;
  justify-content: ${props => (props.$sender === 'user' ? 'flex-end' : 'flex-start')};
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  word-wrap: break-word;
  line-height: 1.5;
  background: ${props => (props.$sender === 'user' ? 'var(--gradient-pink)' : '#e9ecef')};
  color: ${props => (props.$sender === 'user' ? 'white' : '#333')};
  font-size: 0.95rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  strong {
    font-weight: 600;
  }

  a {
    color: ${props => (props.$sender === 'user' ? 'white' : 'var(--primary-pink)')};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  @media (max-width: 480px) {
    max-width: 85%;
    padding: 0.7rem 0.9rem;
    font-size: 0.9rem;
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 0.8rem 1rem;
  background: #e9ecef;
  border-radius: 12px;
  width: fit-content;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #999;
    animation: typing 1.4s infinite;

    &:nth-child(1) {
      animation-delay: 0s;
    }

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes typing {
    0%, 60%, 100% {
      opacity: 0.3;
      transform: translateY(0);
    }
    30% {
      opacity: 1;
      transform: translateY(-10px);
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  border-top: 1px solid #eee;
  border-radius: 0 0 12px 12px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 0.8rem;
    gap: 0.4rem;
  }

  @media (max-width: 480px) {
    border-radius: 0;
    padding: 0.75rem;
    gap: 0.4rem;
  }
`;

const InputField = styled.input`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0.7rem 1rem;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: var(--primary-pink);
    box-shadow: 0 0 8px rgba(255, 105, 180, 0.2);
  }

  &::placeholder {
    color: #999;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
    border-radius: 16px;
  }
`;

const SendButton = styled.button`
  background: var(--gradient-pink);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
`;

const Chatbot = () => {
  const { messages, isOpen, isLoading, sendMessage, clearChat, toggleChat } = useContext(ChatbotContext);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const unreadCount = messages.filter(msg => msg.sender === 'bot').length;

  return (
    <ChatbotContainer>
      {isOpen && (
        <ChatWindow>
          <ChatHeader>
            <h3>
              <i className="fas fa-comments"></i>
              Zoe's Assistant
            </h3>
            <ChatHeaderButtons>
              <button onClick={clearChat} title="Clear chat">
                <i className="fas fa-trash"></i>
              </button>
              <button onClick={toggleChat} title="Close">
                <i className="fas fa-times"></i>
              </button>
            </ChatHeaderButtons>
          </ChatHeader>

          <MessagesContainer>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#999', marginTop: 'auto', marginBottom: 'auto' }}>
                <p>👋 Start a conversation!</p>
              </div>
            ) : (
              messages.map(message => (
                <Message key={message.id} $sender={message.sender}>
                  <MessageBubble $sender={message.sender}>
                    {message.text}
                  </MessageBubble>
                </Message>
              ))
            )}
            {isLoading && (
              <Message $sender="bot">
                <TypingIndicator>
                  <span></span>
                  <span></span>
                  <span></span>
                </TypingIndicator>
              </Message>
            )}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          <InputContainer>
            <InputField
              type="text"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
              disabled={isLoading}
            />
            <SendButton onClick={handleSendMessage} disabled={isLoading}>
              <i className="fas fa-paper-plane"></i>
            </SendButton>
          </InputContainer>
        </ChatWindow>
      )}

      <ChatbotToggleButton onClick={toggleChat} title="Open chat">
        <i className="fas fa-comments"></i>
        {unreadCount > 0 && <div className="badge">{unreadCount}</div>}
      </ChatbotToggleButton>
    </ChatbotContainer>
  );
};

export default Chatbot;
