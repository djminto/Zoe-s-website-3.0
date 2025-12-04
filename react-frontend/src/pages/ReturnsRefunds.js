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

const ReturnsRefunds = () => {
  return (
    <PageWrapper>
      <div className="container">
        <PageTitle>Returns & Refunds Policy</PageTitle>
        <LastUpdated>Last Updated: December 4, 2025</LastUpdated>

        <ContentWrapper>
          <Section>
            <SectionTitle><i className="fas fa-info-circle"></i> Our Commitment</SectionTitle>
            <SectionContent>
              <p>
                At Zoie's Accessories, we want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help. This Returns and Refunds Policy outlines the conditions and procedures for returning products and obtaining refunds.
              </p>
              <p>
                All returns and refunds are subject to the terms outlined below and comply with the Consumer Protection Act of Jamaica.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-undo"></i> Return Eligibility</SectionTitle>
            <SectionContent>
              <p><strong>You may return items within 14 days of delivery if:</strong></p>
              <ul>
                <li>The item is unused and in its original condition</li>
                <li>Original packaging and tags are intact</li>
                <li>You have proof of purchase (order confirmation or receipt)</li>
                <li>The item is not damaged due to misuse or wear</li>
              </ul>

              <p><strong>Items That Cannot Be Returned:</strong></p>
              <ul>
                <li>Personalized or custom-made items</li>
                <li>Items marked as "Final Sale"</li>
                <li>Products damaged by customer after delivery</li>
                <li>Items without original packaging or tags</li>
                <li>Gift cards or promotional items</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-list-ol"></i> How to Return an Item</SectionTitle>
            <SectionContent>
              <p><strong>Step 1: Contact Us</strong></p>
              <p>
                Before returning any item, please contact us at returns@zoiesaccessories.com or through our contact form with:
              </p>
              <ul>
                <li>Your order number</li>
                <li>The item(s) you wish to return</li>
                <li>Reason for return</li>
                <li>Photos of the item (if defective or damaged)</li>
              </ul>

              <p><strong>Step 2: Receive Return Authorization</strong></p>
              <p>
                We will review your request and provide you with:
              </p>
              <ul>
                <li>A Return Authorization Number (RAN)</li>
                <li>Return shipping instructions</li>
                <li>Return address</li>
              </ul>
              <p>
                <em>Important: Do not ship items back without a Return Authorization Number.</em>
              </p>

              <p><strong>Step 3: Pack Your Return</strong></p>
              <ul>
                <li>Place items in original packaging with all tags attached</li>
                <li>Include a copy of your order confirmation</li>
                <li>Write the RAN clearly on the outside of the package</li>
                <li>Securely seal the package</li>
              </ul>

              <p><strong>Step 4: Ship Your Return</strong></p>
              <ul>
                <li>Ship to the address provided in your return authorization</li>
                <li>Use a trackable shipping method</li>
                <li>Keep your shipping receipt as proof of return</li>
              </ul>
              <p>
                <em>Note: Customer is responsible for return shipping costs unless the item is defective or we made an error.</em>
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-money-bill-wave"></i> Refund Process</SectionTitle>
            <SectionContent>
              <p><strong>Processing Time:</strong></p>
              <ul>
                <li>We will inspect your return within 3-5 business days of receiving it</li>
                <li>Approved refunds will be processed within 7-10 business days</li>
                <li>You will receive an email confirmation once your refund is processed</li>
              </ul>

              <p><strong>Refund Method:</strong></p>
              <ul>
                <li><strong>Bank Transfer:</strong> Refunded to your original bank account (3-5 business days)</li>
                <li><strong>Cash on Delivery:</strong> Store credit or bank transfer based on your preference</li>
              </ul>

              <p><strong>Refund Amount:</strong></p>
              <ul>
                <li>Full refund of product price for eligible returns</li>
                <li>Original shipping fees are non-refundable (unless item is defective)</li>
                <li>Return shipping costs are deducted from refund (unless our error)</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-exchange-alt"></i> Exchanges</SectionTitle>
            <SectionContent>
              <p>
                We currently do not offer direct exchanges. If you would like a different item:
              </p>
              <ol>
                <li>Return the unwanted item following our return process</li>
                <li>Receive your refund</li>
                <li>Place a new order for the desired item</li>
              </ol>
              <p>
                This ensures you receive the correct item quickly and your refund is processed properly.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-exclamation-triangle"></i> Damaged or Defective Items</SectionTitle>
            <SectionContent>
              <p>
                If you receive a damaged or defective item, please contact us immediately:
              </p>

              <p><strong>Within 48 Hours of Delivery:</strong></p>
              <ul>
                <li>Email us at support@zoiesaccessories.com</li>
                <li>Include your order number and clear photos of the damage</li>
                <li>Describe the issue in detail</li>
              </ul>

              <p><strong>We Will:</strong></p>
              <ul>
                <li>Investigate the issue promptly</li>
                <li>Provide a free replacement if available</li>
                <li>Offer a full refund including shipping costs</li>
                <li>Cover return shipping expenses</li>
              </ul>

              <p><strong>Quality Guarantee:</strong></p>
              <p>
                All our products are handcrafted with care. If you receive an item with a manufacturing defect, we will replace it or provide a full refund at no cost to you.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-box"></i> Wrong Item Received</SectionTitle>
            <SectionContent>
              <p>
                If we send you the wrong item by mistake:
              </p>
              <ul>
                <li>Contact us within 48 hours of delivery</li>
                <li>We will arrange for pickup of the incorrect item at no cost to you</li>
                <li>We will ship the correct item immediately</li>
                <li>You will not be charged any additional fees</li>
              </ul>
              <p>
                We apologize for any inconvenience and will make it right as quickly as possible.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-ban"></i> Non-Returnable Situations</SectionTitle>
            <SectionContent>
              <p>
                We cannot accept returns in the following cases:
              </p>
              <ul>
                <li>Returns requested after the 14-day return window</li>
                <li>Items that have been worn, used, or altered</li>
                <li>Items with removed or damaged tags</li>
                <li>Items returned without Return Authorization Number</li>
                <li>Products not purchased directly from Zoie's Accessories</li>
                <li>Items damaged due to improper care or storage</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-shipping-fast"></i> Return Shipping</SectionTitle>
            <SectionContent>
              <p><strong>Shipping Costs:</strong></p>
              <ul>
                <li><strong>Customer Returns:</strong> You are responsible for return shipping costs</li>
                <li><strong>Defective/Wrong Items:</strong> We cover all shipping costs</li>
                <li><strong>Changed Mind:</strong> Customer pays return shipping</li>
              </ul>

              <p><strong>Shipping Tips:</strong></p>
              <ul>
                <li>Use a trackable shipping service</li>
                <li>Insure valuable items</li>
                <li>Keep proof of shipment</li>
                <li>Allow 5-7 business days for delivery to us</li>
              </ul>

              <p><strong>Lost Returns:</strong></p>
              <p>
                We are not responsible for returns lost in transit. Please use a trackable method and keep your receipt.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-credit-card"></i> Partial Refunds</SectionTitle>
            <SectionContent>
              <p>
                In some cases, we may offer a partial refund:
              </p>
              <ul>
                <li>Items returned without original packaging (up to 20% deduction)</li>
                <li>Items with slight signs of use (case-by-case basis)</li>
                <li>Items returned after 14 days but within 30 days (50% refund)</li>
              </ul>
              <p>
                We will always contact you before processing a partial refund to discuss options.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-store"></i> Store Credit</SectionTitle>
            <SectionContent>
              <p>
                As an alternative to a refund, you may choose store credit:
              </p>
              <ul>
                <li>Receive full value as store credit (no deductions)</li>
                <li>Credit never expires</li>
                <li>Can be used for any future purchase</li>
                <li>Credit can be combined with promotional offers</li>
              </ul>
              <p>
                Store credit is a great option if you'd like to try a different product.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-balance-scale"></i> Your Consumer Rights</SectionTitle>
            <SectionContent>
              <p>
                Under the Consumer Protection Act of Jamaica, you have rights regarding:
              </p>
              <ul>
                <li>Products that are not as described</li>
                <li>Items that are not of satisfactory quality</li>
                <li>Goods that are not fit for purpose</li>
              </ul>
              <p>
                This returns policy does not affect your statutory rights as a consumer. If you have concerns, you may contact the Consumer Affairs Commission of Jamaica.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-question-circle"></i> Questions About Returns</SectionTitle>
            <SectionContent>
              <p>
                If you have any questions about our Returns and Refunds Policy:
              </p>
              <ul>
                <li><strong>Email:</strong> returns@zoiesaccessories.com</li>
                <li><strong>Response Time:</strong> Within 24-48 hours</li>
                <li><strong>Customer Service:</strong> Available Monday-Friday, 9am-5pm</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-edit"></i> Policy Updates</SectionTitle>
            <SectionContent>
              <p>
                We may update this Returns and Refunds Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Continued use of our website constitutes acceptance of the updated policy.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-envelope"></i> Contact Information</SectionTitle>
            <SectionContent>
              <p><strong>Zoie's Accessories</strong></p>
              <ul>
                <li><strong>Email:</strong> returns@zoiesaccessories.com</li>
                <li><strong>General Support:</strong> support@zoiesaccessories.com</li>
                <li><strong>Location:</strong> Jamaica</li>
              </ul>
              <p>
                We're here to ensure you have the best shopping experience possible!
              </p>
            </SectionContent>
          </Section>
        </ContentWrapper>
      </div>
    </PageWrapper>
  );
};

export default ReturnsRefunds;
