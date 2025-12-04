import React, { createContext, useState, useCallback } from 'react';
import { getAIChatbotResponse } from '../services/chatbotService';

export const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message, sender) => {
    setMessages(prev => [...prev, { id: Date.now(), text: message, sender, timestamp: new Date() }]);
  }, []);

  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim()) return;

    // Get user name from localStorage or use default
    const userName = JSON.parse(localStorage.getItem('user'))?.firstName || 'Friend';
    
    // Add user message
    addMessage(userMessage, 'user');
    setIsLoading(true);

    try {
      // Get AI response
      const response = await getAIChatbotResponse(userMessage, userName);
      
      // Add a small delay for more natural feel
      setTimeout(() => {
        addMessage(response, 'bot');
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.error('Chatbot error:', error);
      addMessage('Sorry, I encountered an error. Please try again or contact our support team.', 'bot');
      setIsLoading(false);
    }
  }, [addMessage]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
    if (!isOpen && messages.length === 0) {
      const userName = JSON.parse(localStorage.getItem('user'))?.firstName || 'Friend';
      addMessage(`Hi ${userName}! 👋 Welcome to Zoe's Accessories. How can I help you today?`, 'bot');
    }
  }, [isOpen, messages.length, addMessage]);

  return (
    <ChatbotContext.Provider value={{ messages, isOpen, isLoading, sendMessage, clearChat, toggleChat, addMessage }}>
      {children}
    </ChatbotContext.Provider>
  );
};
