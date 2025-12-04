import React from 'react';
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

const LastUpdated = styled.p`
  text-align: center;
  color: var(--gray);
  margin-bottom: 3rem;
  font-size: 0.95rem;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: var(--white);
  padding: 3rem;
  border-radius: 15px;
  box-shadow: var(--shadow-md);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-pink);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    font-size: 1.2rem;
  }
`;

const SectionContent = styled.div`
  color: var(--primary-black);
  line-height: 1.8;
  font-size: 1rem;

  p {
    margin-bottom: 1rem;
  }

  ul, ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;

    li {
      margin-bottom: 0.5rem;
    }
  }

  strong {
    color: var(--primary-black);
    font-weight: 600;
  }
`;

const TermsConditions = () => {
  return (
    <PageWrapper>
      <div className="container">
        <PageTitle>Terms and Conditions</PageTitle>
        <LastUpdated>Last Updated: December 4, 2025</LastUpdated>

        <ContentWrapper>
          <Section>
            <SectionTitle><i className="fas fa-info-circle"></i> Introduction</SectionTitle>
            <SectionContent>
              <p>
                Welcome to Zoie's Accessories ("we," "our," or "us"). These Terms and Conditions govern your use of our website and the purchase of products from our online store. By accessing or using our website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations of Jamaica.
              </p>
              <p>
                If you do not agree with any part of these terms, please do not use our website or purchase our products.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-gavel"></i> Governing Law</SectionTitle>
            <SectionContent>
              <p>
                These Terms and Conditions are governed by and construed in accordance with the laws of Jamaica. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Jamaica.
              </p>
              <p>
                Our operations comply with:
              </p>
              <ul>
                <li>The Consumer Protection Act of Jamaica</li>
                <li>The Data Protection Act, 2020</li>
                <li>The Electronic Transactions Act</li>
                <li>All other relevant Jamaican legislation</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-user-check"></i> Eligibility</SectionTitle>
            <SectionContent>
              <p>
                By using our website and making purchases, you represent that:
              </p>
              <ul>
                <li>You are at least 18 years of age or have parental/guardian consent</li>
                <li>You have the legal capacity to enter into binding contracts</li>
                <li>You will provide accurate and complete information</li>
                <li>You will use the website only for lawful purposes</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-shopping-cart"></i> Products and Orders</SectionTitle>
            <SectionContent>
              <p><strong>Product Information:</strong></p>
              <ul>
                <li>We strive to display accurate product descriptions, colors, and prices</li>
                <li>Colors may vary slightly due to monitor settings</li>
                <li>We reserve the right to limit quantities and discontinue products</li>
                <li>All products are handcrafted and may have slight variations</li>
              </ul>

              <p><strong>Pricing:</strong></p>
              <ul>
                <li>All prices are listed in Jamaican Dollars (JMD) unless otherwise stated</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to correct pricing errors</li>
                <li>The price at the time of order placement will be honored</li>
              </ul>

              <p><strong>Order Acceptance:</strong></p>
              <ul>
                <li>Your order is an offer to purchase products from us</li>
                <li>We reserve the right to accept or decline any order</li>
                <li>Order confirmation does not guarantee acceptance</li>
                <li>We may contact you for additional verification</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-credit-card"></i> Payment Terms</SectionTitle>
            <SectionContent>
              <p>
                We accept the following payment methods:
              </p>
              <ul>
                <li><strong>Bank Transfer:</strong> Direct transfer to our JN Bank account</li>
                <li><strong>Cash on Delivery:</strong> Payment in cash when your order is delivered</li>
              </ul>

              <p><strong>Payment Security:</strong></p>
              <ul>
                <li>All payment information is kept secure and confidential</li>
                <li>We do not store your banking details</li>
                <li>Payment confirmation is required before order processing</li>
              </ul>

              <p><strong>Bank Transfer Instructions:</strong></p>
              <ul>
                <li>Use your Order ID as the payment reference</li>
                <li>Orders will be processed once payment is verified (1-2 business days)</li>
                <li>Retain your payment receipt for record-keeping</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-shield-alt"></i> Intellectual Property</SectionTitle>
            <SectionContent>
              <p>
                All content on this website, including but not limited to text, graphics, logos, images, and product designs, is the property of Zoie's Accessories and is protected by Jamaican and international copyright laws.
              </p>
              <ul>
                <li>You may not reproduce, distribute, or modify any content without written permission</li>
                <li>Product designs are original creations and protected intellectual property</li>
                <li>Unauthorized use may result in legal action</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-ban"></i> Prohibited Activities</SectionTitle>
            <SectionContent>
              <p>You agree not to:</p>
              <ul>
                <li>Use the website for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the website</li>
                <li>Upload malicious code or viruses</li>
                <li>Harass, abuse, or harm other users or our staff</li>
                <li>Impersonate any person or entity</li>
                <li>Collect user information without consent</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-exclamation-triangle"></i> Limitation of Liability</SectionTitle>
            <SectionContent>
              <p>
                To the fullest extent permitted by Jamaican law:
              </p>
              <ul>
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>Our total liability shall not exceed the amount you paid for the product</li>
                <li>We are not responsible for delays or failures due to circumstances beyond our control</li>
                <li>We do not guarantee uninterrupted or error-free website operation</li>
              </ul>
              <p>
                This does not affect your statutory rights under Jamaican consumer protection law.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-balance-scale"></i> Indemnification</SectionTitle>
            <SectionContent>
              <p>
                You agree to indemnify and hold harmless Zoie's Accessories, its owners, employees, and affiliates from any claims, damages, or expenses arising from:
              </p>
              <ul>
                <li>Your violation of these Terms and Conditions</li>
                <li>Your use or misuse of our products</li>
                <li>Your violation of any third-party rights</li>
                <li>Any unlawful activities</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-handshake"></i> Dispute Resolution</SectionTitle>
            <SectionContent>
              <p>
                In the event of any dispute:
              </p>
              <ul>
                <li>We encourage you to contact us first to resolve the issue amicably</li>
                <li>If resolution cannot be reached, disputes will be subject to Jamaican law</li>
                <li>Legal proceedings must be brought in the courts of Jamaica</li>
                <li>You may also seek assistance from the Consumer Affairs Commission of Jamaica</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-edit"></i> Changes to Terms</SectionTitle>
            <SectionContent>
              <p>
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of the website after changes constitutes acceptance of the modified terms.
              </p>
              <p>
                We recommend reviewing these terms periodically to stay informed of any updates.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-envelope"></i> Contact Information</SectionTitle>
            <SectionContent>
              <p>
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <ul>
                <li><strong>Business Name:</strong> Zoe's Accessories</li>
                <li><strong>Email:</strong> zoesacessories23@gmail.com</li>
                <li><strong>Location:</strong> Jamaica</li>
              </ul>
              <p>
                We will respond to all inquiries within 2-3 business days.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-check-circle"></i> Acceptance</SectionTitle>
            <SectionContent>
              <p>
                By using our website and placing an order, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </SectionContent>
          </Section>
        </ContentWrapper>
      </div>
    </PageWrapper>
  );
};

export default TermsConditions;
