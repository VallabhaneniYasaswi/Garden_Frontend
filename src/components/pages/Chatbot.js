import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([{
    text: "Hello! I'm your Virtual Garden Assistant. I can help you with plant care, garden planning, and growing tips. What would you like to know?",
    type: 'assistant'
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Predefined gardening responses
  const gardeningResponses = {
    watering: {
      keywords: ['water', 'watering', 'dry', 'moisture'],
      response: "For most garden plants, it's best to water deeply but less frequently. This encourages deeper root growth. Water early in the morning to reduce evaporation. Remember to check soil moisture before watering - if the top inch feels dry, it's time to water."
    },
    planting: {
      keywords: ['plant', 'seed', 'sow', 'start', 'growing'],
      response: "When starting your virtual garden, consider the season and your local climate. Most vegetables need full sun (6-8 hours daily). Space plants according to their mature size, and group plants with similar water needs together."
    },
    soil: {
      keywords: ['soil', 'dirt', 'fertilizer', 'compost', 'nutrient'],
      response: "Good soil is crucial for a healthy garden. In your virtual garden, ensure you're using well-draining soil enriched with compost. Regular fertilization with organic matter will keep your plants thriving."
    },
    pests: {
      keywords: ['pest', 'bug', 'insect', 'disease', 'eating'],
      response: "For natural pest control in your garden, try companion planting. Marigolds repel many insects, while basil can protect tomatoes. You can also use neem oil as an organic pesticide. Monitor your plants regularly for early signs of problems."
    },
    harvest: {
      keywords: ['harvest', 'pick', 'collect', 'ripe'],
      response: "Harvest most vegetables when they're young and tender. For fruits, wait until they reach their full color. Regular harvesting encourages more production. Remember to use clean, sharp tools to avoid damaging the plants."
    },
    planning: {
      keywords: ['plan', 'design', 'layout', 'space'],
      response: "When planning your virtual garden, consider companion planting, succession planting, and crop rotation. Tall plants should go on the north side to avoid shading shorter ones. Leave enough space between plants for good air circulation."
    }
  };

  const getGardeningResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    for (const category in gardeningResponses) {
      if (gardeningResponses[category].keywords.some(keyword => input.includes(keyword))) {
        return gardeningResponses[category].response;
      }
    }
    
    return "I'm here to help with your virtual garden! Could you rephrase your question about planting, watering, soil, pests, harvesting, or garden planning?";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, type: 'user' }]);
    
    // Get and add assistant response
    setTimeout(() => {
      const response = getGardeningResponse(inputMessage);
      setMessages(prev => [...prev, {
        text: response,
        type: 'assistant'
      }]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="garden-icon">🌱</div>
        <h2>Virtual Garden Assistant</h2>
        <p>Your personal guide to successful gardening!</p>
      </div>

      <div className="garden-tip">
        <h4>Gardening Tip of the Day</h4>
        <p>Try companion planting! Plant basil near tomatoes to improve their flavor and repel pests.</p>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}-message`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask about planting, watering, pests, or garden planning..."
          className="chat-input"
        />
        <button type="submit" className="send-button">
          Send
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default Chatbot; 