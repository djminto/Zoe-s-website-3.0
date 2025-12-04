import React, { useState } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  margin-top: 120px;
  padding: 3rem 0;
  min-height: 60vh;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-black);
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  text-align: center;
  color: var(--gray);
  margin-bottom: 3rem;
  font-size: 1.1rem;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const SearchBox = styled.div`
  margin-bottom: 3rem;
  position: relative;

  input {
    width: 100%;
    padding: 1rem 3rem 1rem 1.5rem;
    border: 2px solid var(--off-white);
    border-radius: 50px;
    font-size: 1rem;
    transition: all var(--transition-fast);

    &:focus {
      outline: none;
      border-color: var(--primary-pink);
      box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
    }
  }

  i {
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray);
    font-size: 1.2rem;
  }
`;

const FAQSection = styled.div`
  margin-bottom: 2rem;
`;

const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-pink);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  i {
    font-size: 1.5rem;
  }
`;

const FAQItem = styled.div`
  background: var(--white);
  border-radius: 15px;
  margin-bottom: 1rem;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all var(--transition-normal);

  &:hover {
    box-shadow: var(--shadow-md);
  }
`;

const Question = styled.button`
  width: 100%;
  padding: 1.5rem;
  background: ${props => props.$isOpen ? 'var(--off-white)' : 'transparent'};
  border: none;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-black);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--off-white);
  }

  i {
    color: var(--primary-pink);
    font-size: 1.2rem;
    transition: transform var(--transition-fast);
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const Answer = styled.div`
  padding: ${props => props.$isOpen ? '0 1.5rem 1.5rem' : '0 1.5rem'};
  max-height: ${props => props.$isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: all var(--transition-normal);
  color: var(--primary-black);
  line-height: 1.8;

  p {
    margin-bottom: 0.75rem;
  }

  ul {
    margin-left: 1.5rem;
    margin-bottom: 0.75rem;

    li {
      margin-bottom: 0.5rem;
    }
  }

  strong {
    color: var(--primary-pink);
  }
`;

const ContactSection = styled.div`
  margin-top: 4rem;
  padding: 2.5rem;
  background: var(--gradient-pink);
  border-radius: 20px;
  text-align: center;
  color: var(--white);

  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 14px 32px;
    background: var(--white);
    color: var(--primary-pink);
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    transition: all var(--transition-normal);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
  }
`;

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqData = [
    {
      category: 'Orders & Payments',
      icon: 'fas fa-shopping-cart',
      questions: [
        {
          id: 'order-1',
          question: 'How do I place an order?',
          answer: 'Simply browse our products, add items to your cart, and proceed to checkout. Fill in your delivery information and choose your payment method (Bank Transfer or Cash on Delivery). You\'ll receive an order confirmation email once your order is placed.'
        },
        {
          id: 'order-2',
          question: 'What payment methods do you accept?',
          answer: 'We accept Bank Transfer to our JN Bank account and Cash on Delivery. For bank transfers, use your Order ID as the reference. Payment details will be provided in your order confirmation email.'
        },
        {
          id: 'order-3',
          question: 'Is Cash on Delivery available in my area?',
          answer: 'Yes! Cash on Delivery is available across all parishes in Jamaica. Simply select this option at checkout, and you can pay in cash when your order is delivered to you.'
        },
        {
          id: 'order-4',
          question: 'Can I modify or cancel my order?',
          answer: 'Yes, you can modify or cancel your order before it ships. Contact us immediately at support@zoiesaccessories.com with your order number. Once shipped, you can return items according to our Returns Policy.'
        },
        {
          id: 'order-5',
          question: 'Do I need to create an account to order?',
          answer: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, and enjoy a faster checkout experience for future purchases.'
        }
      ]
    },
    {
      category: 'Shipping & Delivery',
      icon: 'fas fa-shipping-fast',
      questions: [
        {
          id: 'ship-1',
          question: 'Do you offer free shipping?',
          answer: 'Yes! We offer FREE standard shipping on all orders across Jamaica. Express shipping is available for an additional fee based on your location.'
        },
        {
          id: 'ship-2',
          question: 'How long does delivery take?',
          answer: 'Delivery times vary by location: Kingston & St. Andrew (1-2 business days), Spanish Town & Portmore (1-3 business days), Mandeville & May Pen (2-3 business days), Montego Bay & Ocho Rios (2-4 business days), and other parishes (3-5 business days). Express shipping is faster.'
        },
        {
          id: 'ship-3',
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive an email with tracking information. You can use the tracking number to monitor your package\'s progress. We also send SMS notifications when your order is out for delivery.'
        },
        {
          id: 'ship-4',
          question: 'What if I\'m not home during delivery?',
          answer: 'Our courier will leave a notification and attempt redelivery the next business day. After 2 failed attempts, we\'ll contact you to arrange pickup or schedule a convenient delivery time.'
        },
        {
          id: 'ship-5',
          question: 'Do you ship internationally?',
          answer: 'Currently, we only ship within Jamaica. We\'re working on expanding to the Caribbean, USA, Canada, and UK. Contact us at international@zoiesaccessories.com if you\'re interested in international shipping.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      icon: 'fas fa-undo',
      questions: [
        {
          id: 'return-1',
          question: 'What is your return policy?',
          answer: 'You can return items within 14 days of delivery if they\'re unused, in original condition with tags attached. Contact us for a Return Authorization Number before shipping items back. See our full Returns & Refunds Policy for details.'
        },
        {
          id: 'return-2',
          question: 'How do I return an item?',
          answer: 'Contact us at returns@zoiesaccessories.com with your order number and reason for return. We\'ll provide a Return Authorization Number and instructions. Pack items securely with original packaging and ship to the provided address.'
        },
        {
          id: 'return-3',
          question: 'How long does a refund take?',
          answer: 'Once we receive and inspect your return (3-5 business days), approved refunds are processed within 7-10 business days. You\'ll receive an email confirmation, and funds will be returned via your original payment method.'
        },
        {
          id: 'return-4',
          question: 'What if I receive a damaged or defective item?',
          answer: 'Contact us immediately within 48 hours of delivery with photos of the damage. We\'ll provide a free replacement or full refund including shipping costs. You won\'t pay for return shipping on defective items.'
        },
        {
          id: 'return-5',
          question: 'Can I exchange an item?',
          answer: 'We don\'t offer direct exchanges. Return the unwanted item for a refund, then place a new order for the item you want. This ensures you get the right product quickly.'
        }
      ]
    },
    {
      category: 'Products',
      icon: 'fas fa-gem',
      questions: [
        {
          id: 'prod-1',
          question: 'Are your products handmade?',
          answer: 'Yes! All our bracelets, scrunchies, silk bows, and candles are lovingly handcrafted. Each piece is unique and made with premium materials. Slight variations add to the charm and authenticity of handmade items.'
        },
        {
          id: 'prod-2',
          question: 'What materials do you use?',
          answer: 'We use only high-quality materials including glass beads, natural stones, silk fabric, cotton, and premium wax for candles. All materials are carefully selected for durability, beauty, and comfort.'
        },
        {
          id: 'prod-3',
          question: 'Do you offer custom designs?',
          answer: 'Yes! We love creating custom pieces. Contact us with your ideas, preferred colors, and any special requirements. Custom orders typically take 3-5 business days to create plus shipping time.'
        },
        {
          id: 'prod-4',
          question: 'How do I care for my products?',
          answer: '<strong>Bracelets:</strong> Avoid water and chemicals. Store in provided pouch. <strong>Scrunchies & Bows:</strong> Hand wash gently, air dry. <strong>Candles:</strong> Trim wick to 1/4", burn for 2-4 hours, keep away from drafts.'
        },
        {
          id: 'prod-5',
          question: 'Are your products suitable for sensitive skin?',
          answer: 'We use hypoallergenic materials whenever possible. However, if you have specific allergies or sensitivities, please contact us before ordering so we can recommend suitable products.'
        }
      ]
    },
    {
      category: 'Account & Privacy',
      icon: 'fas fa-user-shield',
      questions: [
        {
          id: 'acc-1',
          question: 'Is my personal information safe?',
          answer: 'Absolutely! We comply with Jamaica\'s Data Protection Act, 2020. Your information is encrypted, securely stored, and never sold to third parties. Read our Privacy Policy for complete details on how we protect your data.'
        },
        {
          id: 'acc-2',
          question: 'How do I create an account?',
          answer: 'Click "Register" in the top menu, fill in your details, and create a password. You\'ll receive a confirmation email. An account lets you track orders, save addresses, and checkout faster.'
        },
        {
          id: 'acc-3',
          question: 'I forgot my password. What should I do?',
          answer: 'Click "Forgot Password" on the login page, enter your email, and we\'ll send you a reset link. If you don\'t receive it within 5 minutes, check your spam folder or contact us.'
        },
        {
          id: 'acc-4',
          question: 'How do I unsubscribe from emails?',
          answer: 'Click the "unsubscribe" link at the bottom of any marketing email, or contact us at privacy@zoiesaccessories.com. You\'ll still receive important order-related emails.'
        },
        {
          id: 'acc-5',
          question: 'Can I delete my account?',
          answer: 'Yes, you have the right to delete your account and personal data under the Data Protection Act. Contact us at privacy@zoiesaccessories.com with your request, and we\'ll process it within 30 days.'
        }
      ]
    },
    {
      category: 'General',
      icon: 'fas fa-question-circle',
      questions: [
        {
          id: 'gen-1',
          question: 'Where are you located?',
          answer: 'We\'re proudly based in Jamaica and ship to all parishes across the island. Our handcrafted products are made locally with love and attention to detail.'
        },
        {
          id: 'gen-2',
          question: 'How can I contact customer service?',
          answer: 'Email us at support@zoiesaccessories.com, use our contact form, or message us on social media. We respond within 24-48 hours, Monday-Friday, 9am-5pm.'
        },
        {
          id: 'gen-3',
          question: 'Do you have a physical store?',
          answer: 'Currently, we operate online only, which allows us to offer competitive prices and FREE shipping. However, local pickup may be available in some areas - contact us to inquire.'
        },
        {
          id: 'gen-4',
          question: 'Do you offer gift wrapping?',
          answer: 'Yes! We offer complimentary gift wrapping for all orders. Just add a note at checkout requesting gift wrapping and include your personalized message.'
        },
        {
          id: 'gen-5',
          question: 'How often do you add new products?',
          answer: 'We add new designs and products monthly! Follow us on social media or subscribe to our newsletter to be the first to know about new releases, special collections, and exclusive offers.'
        }
      ]
    }
  ];

  const filteredData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <PageWrapper>
      <div className="container">
        <PageTitle>Frequently Asked Questions</PageTitle>
        <Subtitle>Find answers to common questions about our products and services</Subtitle>

        <ContentWrapper>
          <SearchBox>
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </SearchBox>

          {filteredData.map((section) => (
            <FAQSection key={section.category}>
              <CategoryTitle>
                <i className={section.icon}></i>
                {section.category}
              </CategoryTitle>

              {section.questions.map((item) => (
                <FAQItem key={item.id}>
                  <Question
                    onClick={() => toggleItem(item.id)}
                    $isOpen={openItems[item.id]}
                  >
                    {item.question}
                    <i className="fas fa-chevron-down"></i>
                  </Question>
                  <Answer
                    $isOpen={openItems[item.id]}
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </FAQItem>
              ))}
            </FAQSection>
          ))}

          {filteredData.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <i className="fas fa-search" style={{ fontSize: '3rem', color: 'var(--gray)', marginBottom: '1rem' }}></i>
              <h3 style={{ color: 'var(--primary-black)', marginBottom: '0.5rem' }}>No results found</h3>
              <p style={{ color: 'var(--gray)' }}>Try different keywords or contact us directly</p>
            </div>
          )}

          <ContactSection>
            <h3>Still have questions?</h3>
            <p>Our friendly customer service team is here to help!</p>
            <a href="/contact">
              <i className="fas fa-envelope"></i> Contact Us
            </a>
          </ContactSection>
        </ContentWrapper>
      </div>
    </PageWrapper>
  );
};

export default FAQ;
