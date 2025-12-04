// Chatbot Service - AI responses for customer interactions
const GREETING_PATTERNS = [
  'hello', 'hi', 'hey', 'greetings', 'what\'s up', 'howdy', 'hola'
];

const FAQ_DATA = {
  shipping: {
    keywords: ['shipping', 'delivery', 'how long', 'when', 'arrive', 'track', 'shipping policy'],
    response: `We offer free shipping on orders over $50. Standard shipping takes 5-7 business days, and express shipping takes 2-3 business days. You'll receive a tracking number via email once your order ships. You can check our full shipping policy for more details.`
  },
  returns: {
    keywords: ['return', 'refund', 'exchange', 'money back', 'not satisfied', 'damaged'],
    response: `We offer a 30-day return policy for all unworn items in original condition. To start a return, please contact us at zoesacessories23@gmail.com with your order number and reason for return. We'll provide you with a return shipping label. Once received and inspected, refunds are processed within 5-7 business days.`
  },
  payment: {
    keywords: ['payment', 'pay', 'checkout', 'credit card', 'bank transfer', 'how to pay'],
    response: `We accept multiple payment methods: credit cards, debit cards, bank transfers, and cash on delivery. For bank transfers, we work with JN Bank. You can select your preferred payment method at checkout. All transactions are secure and encrypted.`
  },
  sizing: {
    keywords: ['size', 'fit', 'measurements', 'how it fits', 'bracelet size', 'jewelry size'],
    response: `Our bracelets come in adjustable sizes that fit most wrists. Most pieces are one-size-fits-most with adjustable closures. If you have specific size concerns, please email us at zoesacessories23@gmail.com and we'll help you find the perfect fit!`
  },
  materials: {
    keywords: ['material', 'what is it made of', 'quality', 'durable', 'silk', 'metal', 'allergy'],
    response: `Our accessories are made with premium materials including quality metals, genuine silk, and durable clasps. All materials are carefully selected for durability and comfort. If you have metal allergies, please let us know and we can recommend suitable options.`
  },
  products: {
    keywords: ['product', 'items', 'what do you have', 'do you have', 'available', 'stock', 'inventory'],
    response: `We offer a beautiful selection of handcrafted accessories including bracelets, scrunchies, bows, and custom jewelry. Visit our shop page to browse our full collection. Each item is carefully curated for quality and style!`
  },
  customization: {
    keywords: ['custom', 'personalize', 'customize', 'special order', 'custom design', 'engrave'],
    response: `We love creating custom pieces! We offer custom jewelry and personalized items. Contact us at zoesacessories23@gmail.com or message us on Instagram @zoe._accessories to discuss your custom design ideas.`
  },
  contact: {
    keywords: ['contact', 'reach out', 'call', 'email', 'phone', 'how to contact', 'customer service'],
    response: `You can reach us through multiple channels:\n📧 Email: zoesacessories23@gmail.com\n📱 WhatsApp: +1876-544-0766\n📲 Instagram: @zoe._accessories\nWe typically respond within 24 hours!`
  },
  price: {
    keywords: ['price', 'cost', 'how much', 'expensive', 'discount', 'sale', 'coupon', '$', 'jmd'],
    response: `Here are our current prices:\n\n💎 **Bracelets** - $350.00 JMD each\n   - Pink Beaded Bracelet\n   - Purple Beaded Bracelet\n   - Stunning Male Bracelet\n   - Light Colored Bracelets\n\n✨ **Silk Scrunchies** - $450.00 JMD each\n\n🎀 **Silk Bows** - $450.00 JMD each\n   - Elegant Silk Bow\n   - Female Bows Collection\n\n💍 **Custom Jewelry** - $350.00 JMD (base price, custom orders may vary)\n\nWe offer free shipping on orders over $50 USD. Contact us for custom pricing and special promotions!`
  }
};

export const getChatbotResponse = (userMessage, userName) => {
  const message = userMessage.toLowerCase().trim();
  
  // Closing statements - when user doesn't need help
  if (message.includes('no thanks') || message.includes('no thank you') || message.includes('nope') || 
      message.includes('i\'m good') || message.includes('i am good') || message.includes('all set') ||
      message.includes('that\'s all') || message.includes('that is all') || message.includes('don\'t need') ||
      message.includes('don\'t want') || message.includes('don\'t require') || message.includes('nothing else') ||
      message.includes('no further') || message.includes('no more help') || message.includes('no more questions') ||
      message.includes('bye') || message.includes('goodbye') || message.includes('see you')) {
    return `Thanks so much for visiting, ${userName}! 😊 We appreciate your interest in Zoe's Accessories. Feel free to reach out anytime if you have questions. Happy shopping! 💕`;
  }

  // Greeting response
  if (GREETING_PATTERNS.some(pattern => message.includes(pattern))) {
    return `Hey ${userName}! 👋 Welcome to Zoe's Accessories! How can I help you today? Feel free to ask me about shipping, returns, products, sizing, or anything else!`;
  }

  // FAQ matching
  for (const [category, data] of Object.entries(FAQ_DATA)) {
    if (data.keywords.some(keyword => message.includes(keyword))) {
      return data.response;
    }
  }

  // Thank you responses
  if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
    return `You're welcome, ${userName}! 😊 If you have any other questions, feel free to ask. Happy shopping!`;
  }

  // How are you
  if (message.includes('how are you') || message.includes('how are you doing')) {
    return `I'm doing great, thanks for asking ${userName}! 😄 I'm here to help you with any questions about our products and services. What can I assist you with?`;
  }

  // Order status
  if (message.includes('order') && (message.includes('status') || message.includes('where'))) {
    return `To check your order status, please email us at zoesacessories23@gmail.com with your order number. We'll provide you with tracking information and shipping updates!`;
  }

  // Default response
  return `Great question, ${userName}! 🤔 I'm here to help with information about our products, shipping, returns, sizing, and more. For specific inquiries not covered here, please reach out to our team at zoesacessories23@gmail.com or WhatsApp +1876-544-0766. Is there anything else I can help with?`;
};

export const getAIChatbotResponse = async (userMessage, userName) => {
  // This function can be enhanced to use an actual AI API like OpenAI, Hugging Face, etc.
  // For now, it uses the pattern-matching system above
  return getChatbotResponse(userMessage, userName);
};
