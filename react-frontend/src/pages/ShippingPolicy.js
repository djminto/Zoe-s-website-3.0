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

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;

    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid var(--off-white);
    }

    th {
      background: var(--off-white);
      font-weight: 600;
      color: var(--primary-black);
    }

    tr:hover {
      background: rgba(255, 105, 180, 0.05);
    }
  }
`;

const ShippingPolicy = () => {
  return (
    <PageWrapper>
      <div className="container">
        <PageTitle>Shipping Policy</PageTitle>
        <LastUpdated>Last Updated: December 4, 2025</LastUpdated>

        <ContentWrapper>
          <Section>
            <SectionTitle><i className="fas fa-shipping-fast"></i> Shipping Overview</SectionTitle>
            <SectionContent>
              <p>
                At Zoie's Accessories, we want to get your beautiful handcrafted products to you as quickly and safely as possible. This Shipping Policy outlines our shipping methods, delivery times, and costs for orders within Jamaica.
              </p>
              <p>
                We currently ship to all parishes across Jamaica and are working on expanding to international shipping in the future.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-map-marked-alt"></i> Shipping Locations</SectionTitle>
            <SectionContent>
              <p><strong>We Ship Throughout Jamaica:</strong></p>
              <ul>
                <li>Kingston & St. Andrew</li>
                <li>St. Catherine</li>
                <li>Clarendon</li>
                <li>Manchester</li>
                <li>St. Elizabeth</li>
                <li>Westmoreland</li>
                <li>Hanover</li>
                <li>St. James</li>
                <li>Trelawny</li>
                <li>St. Ann</li>
                <li>St. Mary</li>
                <li>Portland</li>
                <li>St. Thomas</li>
              </ul>
              <p>
                <em>Note: Remote or hard-to-reach areas may require additional delivery time. Please contact us if you have concerns about delivery to your location.</em>
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-clock"></i> Processing Time</SectionTitle>
            <SectionContent>
              <p><strong>Order Processing:</strong></p>
              <ul>
                <li><strong>Standard Orders:</strong> 1-2 business days</li>
                <li><strong>Custom Orders:</strong> 3-5 business days</li>
                <li><strong>Pre-Orders:</strong> As specified on product page</li>
              </ul>

              <p><strong>Processing Notes:</strong></p>
              <ul>
                <li>Orders are processed Monday-Friday (excluding public holidays)</li>
                <li>Orders placed on weekends will be processed on the next business day</li>
                <li>Bank transfer orders are processed after payment confirmation</li>
                <li>You will receive a confirmation email when your order ships</li>
              </ul>

              <p><strong>Busy Periods:</strong></p>
              <p>
                During peak seasons (Christmas, Valentine's Day, Mother's Day), processing times may be extended by 1-2 days. We will notify you if delays are expected.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-truck"></i> Delivery Times</SectionTitle>
            <SectionContent>
              <p><strong>Estimated Delivery Times (after processing):</strong></p>
              
              <table>
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Standard Delivery</th>
                    <th>Express Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kingston & St. Andrew</td>
                    <td>1-2 business days</td>
                    <td>Same day/Next day</td>
                  </tr>
                  <tr>
                    <td>Spanish Town & Portmore</td>
                    <td>1-3 business days</td>
                    <td>Next day</td>
                  </tr>
                  <tr>
                    <td>Mandeville & May Pen</td>
                    <td>2-3 business days</td>
                    <td>Next day</td>
                  </tr>
                  <tr>
                    <td>Montego Bay & Ocho Rios</td>
                    <td>2-4 business days</td>
                    <td>1-2 business days</td>
                  </tr>
                  <tr>
                    <td>Other Parishes</td>
                    <td>3-5 business days</td>
                    <td>2-3 business days</td>
                  </tr>
                </tbody>
              </table>

              <p>
                <em>Note: These are estimated times and may vary based on courier availability, weather conditions, and other unforeseen circumstances.</em>
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-dollar-sign"></i> Shipping Costs</SectionTitle>
            <SectionContent>
              <p><strong>FREE SHIPPING:</strong></p>
              <ul>
                <li>✨ All orders qualify for FREE standard shipping across Jamaica! ✨</li>
              </ul>

              <p><strong>Express Shipping Rates:</strong></p>
              <table>
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kingston & St. Andrew</td>
                    <td>JMD $500</td>
                  </tr>
                  <tr>
                    <td>Spanish Town & Portmore</td>
                    <td>JMD $600</td>
                  </tr>
                  <tr>
                    <td>Other Major Towns</td>
                    <td>JMD $800</td>
                  </tr>
                  <tr>
                    <td>Remote Areas</td>
                    <td>JMD $1,000</td>
                  </tr>
                </tbody>
              </table>

              <p>
                Express shipping rates are calculated at checkout based on your delivery address.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-box-open"></i> Order Tracking</SectionTitle>
            <SectionContent>
              <p><strong>Stay Updated on Your Order:</strong></p>
              <ul>
                <li>You will receive an email confirmation when your order is shipped</li>
                <li>Tracking information will be provided for all orders</li>
                <li>You can track your package using the provided tracking number</li>
                <li>Contact us anytime for order status updates</li>
              </ul>

              <p><strong>Delivery Notifications:</strong></p>
              <ul>
                <li>SMS notification when package is out for delivery</li>
                <li>Email notification upon successful delivery</li>
                <li>Delivery confirmation with recipient signature</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-home"></i> Delivery Methods</SectionTitle>
            <SectionContent>
              <p><strong>Standard Delivery:</strong></p>
              <ul>
                <li>Delivery to your doorstep during business hours (9am-5pm)</li>
                <li>Signature required for delivery confirmation</li>
                <li>If you're not available, courier will leave a notification</li>
                <li>You can arrange redelivery or pickup</li>
              </ul>

              <p><strong>Cash on Delivery (COD):</strong></p>
              <ul>
                <li>Pay for your order when it's delivered to you</li>
                <li>Available for all locations across Jamaica</li>
                <li>Please have the exact amount ready for payment</li>
                <li>Inspect your order before making payment</li>
              </ul>

              <p><strong>Contactless Delivery:</strong></p>
              <ul>
                <li>Available upon request</li>
                <li>Package left at your door with photo confirmation</li>
                <li>Payment must be made in advance (bank transfer)</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-gift"></i> Special Delivery Instructions</SectionTitle>
            <SectionContent>
              <p>
                You can provide special delivery instructions during checkout:
              </p>
              <ul>
                <li>Leave package at the gate/security</li>
                <li>Call upon arrival</li>
                <li>Deliver to workplace</li>
                <li>Specific delivery time preferences</li>
                <li>Alternative contact person</li>
              </ul>
              <p>
                We will do our best to accommodate your requests, though some may not always be possible.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-exclamation-triangle"></i> Delivery Issues</SectionTitle>
            <SectionContent>
              <p><strong>Failed Delivery Attempts:</strong></p>
              <ul>
                <li>If delivery fails, courier will attempt redelivery the next business day</li>
                <li>After 2 failed attempts, you will be contacted to arrange pickup</li>
                <li>Packages held for more than 5 days may be returned to us</li>
                <li>Return shipping fees may apply for unclaimed packages</li>
              </ul>

              <p><strong>Wrong Address:</strong></p>
              <ul>
                <li>If you provide an incorrect address, additional delivery fees may apply</li>
                <li>Contact us immediately if you need to change your delivery address</li>
                <li>Address changes may not be possible once shipped</li>
              </ul>

              <p><strong>Lost or Damaged Packages:</strong></p>
              <ul>
                <li>If your package is lost or damaged during shipping, contact us immediately</li>
                <li>We will file a claim with the courier</li>
                <li>You will receive a replacement or full refund</li>
                <li>All packages are insured for their full value</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-shield-alt"></i> Package Protection</SectionTitle>
            <SectionContent>
              <p><strong>How We Protect Your Order:</strong></p>
              <ul>
                <li>All items are carefully packaged with bubble wrap and protective materials</li>
                <li>Fragile items receive extra padding and "Fragile" stickers</li>
                <li>Packages are sealed and tamper-evident</li>
                <li>Weather-resistant packaging for rainy conditions</li>
                <li>Quality checks before shipping</li>
              </ul>

              <p><strong>Insurance:</strong></p>
              <p>
                All shipments are automatically insured at no additional cost to you. In the rare event of loss or damage, you're fully covered.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-calendar-alt"></i> Public Holidays & Delays</SectionTitle>
            <SectionContent>
              <p><strong>Jamaica Public Holidays:</strong></p>
              <p>
                No orders are processed or shipped on public holidays. Deliveries scheduled for public holidays will be delivered on the next business day.
              </p>

              <p><strong>Potential Delays:</strong></p>
              <ul>
                <li>Severe weather conditions (hurricanes, heavy rain)</li>
                <li>Road closures or traffic incidents</li>
                <li>High order volumes during peak seasons</li>
                <li>Customs delays (if applicable)</li>
                <li>Courier service disruptions</li>
              </ul>
              <p>
                We will notify you promptly if any delays are expected and provide updated delivery estimates.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-globe-americas"></i> International Shipping</SectionTitle>
            <SectionContent>
              <p>
                We currently ship only within Jamaica. However, we are working on expanding our shipping options to include:
              </p>
              <ul>
                <li>Caribbean islands</li>
                <li>United States</li>
                <li>Canada</li>
                <li>United Kingdom</li>
              </ul>
              <p>
                If you're interested in international shipping, please contact us at international@zoiesaccessories.com, and we'll do our best to accommodate your request.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-users"></i> Multiple Addresses</SectionTitle>
            <SectionContent>
              <p><strong>Sending Gifts to Different Addresses:</strong></p>
              <ul>
                <li>Each delivery address requires a separate order</li>
                <li>You can include a gift message with each order</li>
                <li>Gift wrapping available upon request</li>
                <li>We do not include invoices in gift shipments</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-question-circle"></i> Shipping Questions</SectionTitle>
            <SectionContent>
              <p>
                If you have questions about shipping:
              </p>
              <ul>
                <li><strong>Email:</strong> shipping@zoiesaccessories.com</li>
                <li><strong>Phone:</strong> Contact us through our website</li>
                <li><strong>Response Time:</strong> Within 24 hours</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-envelope"></i> Contact Us</SectionTitle>
            <SectionContent>
              <p><strong>Zoie's Accessories</strong></p>
              <ul>
                <li><strong>Email:</strong> shipping@zoiesaccessories.com</li>
                <li><strong>Support:</strong> support@zoiesaccessories.com</li>
                <li><strong>Location:</strong> Jamaica</li>
              </ul>
              <p>
                We're committed to delivering your orders safely and on time!
              </p>
            </SectionContent>
          </Section>
        </ContentWrapper>
      </div>
    </PageWrapper>
  );
};

export default ShippingPolicy;
