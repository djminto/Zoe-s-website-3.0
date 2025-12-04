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

const PrivacyPolicy = () => {
  return (
    <PageWrapper>
      <div className="container">
        <PageTitle>Privacy Policy</PageTitle>
        <LastUpdated>Last Updated: December 4, 2025</LastUpdated>

        <ContentWrapper>
          <Section>
            <SectionTitle><i className="fas fa-shield-alt"></i> Introduction</SectionTitle>
            <SectionContent>
              <p>
                At Zoie's Accessories ("we," "our," or "us"), we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information in compliance with the <strong>Data Protection Act, 2020</strong> of Jamaica and other applicable laws.
              </p>
              <p>
                By using our website and services, you consent to the data practices described in this policy. If you do not agree with this policy, please do not use our website.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-book"></i> Compliance with Jamaica Data Protection Act</SectionTitle>
            <SectionContent>
              <p>
                We comply with the Data Protection Act, 2020 and adhere to the following principles:
              </p>
              <ul>
                <li><strong>Lawfulness, Fairness, and Transparency:</strong> We process personal data lawfully, fairly, and in a transparent manner</li>
                <li><strong>Purpose Limitation:</strong> We collect data only for specified, explicit, and legitimate purposes</li>
                <li><strong>Data Minimization:</strong> We collect only data that is adequate, relevant, and necessary</li>
                <li><strong>Accuracy:</strong> We take reasonable steps to ensure data accuracy</li>
                <li><strong>Storage Limitation:</strong> We retain data only as long as necessary</li>
                <li><strong>Integrity and Confidentiality:</strong> We implement appropriate security measures</li>
                <li><strong>Accountability:</strong> We are responsible for and can demonstrate compliance</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-database"></i> Information We Collect</SectionTitle>
            <SectionContent>
              <p><strong>Personal Information:</strong></p>
              <p>We may collect the following personal information when you make a purchase or interact with our website:</p>
              <ul>
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Delivery address (street address, city, postal code)</li>
                <li>Payment information (for bank transfers)</li>
                <li>Order history and preferences</li>
              </ul>

              <p><strong>Automatically Collected Information:</strong></p>
              <ul>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Date and time of visits</li>
              </ul>

              <p><strong>Cookies and Tracking Technologies:</strong></p>
              <p>
                We use cookies and similar technologies to enhance your browsing experience. You can control cookie settings through your browser preferences.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-tasks"></i> How We Use Your Information</SectionTitle>
            <SectionContent>
              <p>We use your personal information for the following purposes:</p>
              
              <p><strong>Order Processing and Fulfillment:</strong></p>
              <ul>
                <li>Processing and completing your orders</li>
                <li>Sending order confirmations and updates</li>
                <li>Arranging delivery of products</li>
                <li>Processing payments and preventing fraud</li>
              </ul>

              <p><strong>Customer Service:</strong></p>
              <ul>
                <li>Responding to your inquiries and requests</li>
                <li>Providing customer support</li>
                <li>Resolving disputes and troubleshooting issues</li>
              </ul>

              <p><strong>Marketing and Communications:</strong></p>
              <ul>
                <li>Sending promotional emails about new products and special offers (with your consent)</li>
                <li>Conducting surveys and gathering feedback</li>
                <li>Personalizing your shopping experience</li>
              </ul>

              <p><strong>Legal and Business Operations:</strong></p>
              <ul>
                <li>Complying with legal obligations under Jamaican law</li>
                <li>Protecting our legal rights and interests</li>
                <li>Preventing fraud and security threats</li>
                <li>Improving our website and services</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-share-alt"></i> Information Sharing and Disclosure</SectionTitle>
            <SectionContent>
              <p>
                We do not sell, rent, or trade your personal information. We may share your information only in the following circumstances:
              </p>

              <p><strong>Service Providers:</strong></p>
              <ul>
                <li>Delivery services for order fulfillment</li>
                <li>Payment processors for transaction handling</li>
                <li>Technology providers for website hosting and maintenance</li>
              </ul>
              <p>These third parties are contractually obligated to protect your information and use it only for specified purposes.</p>

              <p><strong>Legal Requirements:</strong></p>
              <ul>
                <li>When required by Jamaican law or legal process</li>
                <li>To comply with government requests or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>To prevent fraud or criminal activity</li>
              </ul>

              <p><strong>Business Transfers:</strong></p>
              <p>
                In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity, subject to this Privacy Policy.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-lock"></i> Data Security</SectionTitle>
            <SectionContent>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul>
                <li>Secure data storage systems</li>
                <li>Encryption of sensitive information</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
              </ul>
              <p>
                However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-user-shield"></i> Your Rights Under the Data Protection Act</SectionTitle>
            <SectionContent>
              <p>
                Under the Data Protection Act, 2020, you have the following rights:
              </p>

              <p><strong>Right to Access:</strong></p>
              <ul>
                <li>You can request a copy of the personal data we hold about you</li>
                <li>We will provide this information within 30 days of your request</li>
              </ul>

              <p><strong>Right to Rectification:</strong></p>
              <ul>
                <li>You can request correction of inaccurate or incomplete data</li>
                <li>We will update your information promptly</li>
              </ul>

              <p><strong>Right to Erasure (Right to be Forgotten):</strong></p>
              <ul>
                <li>You can request deletion of your personal data</li>
                <li>We will comply unless we have legal grounds to retain the data</li>
              </ul>

              <p><strong>Right to Restriction of Processing:</strong></p>
              <ul>
                <li>You can request that we limit how we use your data</li>
                <li>We will honor this request where applicable</li>
              </ul>

              <p><strong>Right to Data Portability:</strong></p>
              <ul>
                <li>You can request your data in a structured, machine-readable format</li>
                <li>You can transfer your data to another service provider</li>
              </ul>

              <p><strong>Right to Object:</strong></p>
              <ul>
                <li>You can object to processing of your data for marketing purposes</li>
                <li>You can opt-out of marketing communications at any time</li>
              </ul>

              <p><strong>Right to Withdraw Consent:</strong></p>
              <ul>
                <li>You can withdraw consent for data processing at any time</li>
                <li>This does not affect the lawfulness of processing before withdrawal</li>
              </ul>

              <p>
                To exercise any of these rights, please contact us using the information provided at the end of this policy.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-clock"></i> Data Retention</SectionTitle>
            <SectionContent>
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy:
              </p>
              <ul>
                <li><strong>Order Information:</strong> Retained for 7 years for tax and accounting purposes as required by Jamaican law</li>
                <li><strong>Marketing Data:</strong> Retained until you opt-out or request deletion</li>
                <li><strong>Account Information:</strong> Retained while your account is active</li>
                <li><strong>Website Analytics:</strong> Retained for 2 years for business analysis</li>
              </ul>
              <p>
                After the retention period, we will securely delete or anonymize your data.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-child"></i> Children's Privacy</SectionTitle>
            <SectionContent>
              <p>
                Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately, and we will delete such information.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-envelope-open-text"></i> Marketing Communications</SectionTitle>
            <SectionContent>
              <p>
                With your consent, we may send you promotional emails about:
              </p>
              <ul>
                <li>New product launches</li>
                <li>Special offers and discounts</li>
                <li>Upcoming sales and events</li>
                <li>Tips and inspiration</li>
              </ul>
              <p>
                You can opt-out of marketing emails at any time by:
              </p>
              <ul>
                <li>Clicking the "unsubscribe" link in any marketing email</li>
                <li>Contacting us directly to request removal</li>
                <li>Updating your preferences in your account settings</li>
              </ul>
              <p>
                Note: You will still receive transactional emails related to your orders.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-globe"></i> International Data Transfers</SectionTitle>
            <SectionContent>
              <p>
                Your personal information is primarily stored and processed in Jamaica. If we transfer data outside of Jamaica, we will ensure appropriate safeguards are in place to protect your information in accordance with the Data Protection Act, 2020.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-edit"></i> Changes to This Privacy Policy</SectionTitle>
            <SectionContent>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:
              </p>
              <ul>
                <li>Posting the updated policy on our website</li>
                <li>Updating the "Last Updated" date</li>
                <li>Sending you an email notification (for significant changes)</li>
              </ul>
              <p>
                We encourage you to review this policy periodically to stay informed about how we protect your information.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-exclamation-circle"></i> Complaints and Concerns</SectionTitle>
            <SectionContent>
              <p>
                If you have concerns about how we handle your personal data, you have the right to lodge a complaint with:
              </p>
              <ul>
                <li><strong>The Office of the Information Commissioner of Jamaica</strong></li>
                <li>Email: info@oic.gov.jm</li>
                <li>Website: www.oic.gov.jm</li>
              </ul>
              <p>
                However, we encourage you to contact us first so we can address your concerns directly.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-phone"></i> Contact Us</SectionTitle>
            <SectionContent>
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your data protection rights, please contact us:
              </p>
              <ul>
                <li><strong>Business Name:</strong> Zoie's Accessories</li>
                <li><strong>Email:</strong> privacy@zoiesaccessories.com</li>
                <li><strong>Location:</strong> Jamaica</li>
              </ul>
              <p>
                We will respond to all privacy-related inquiries within 30 days as required by the Data Protection Act, 2020.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle><i className="fas fa-check-circle"></i> Consent</SectionTitle>
            <SectionContent>
              <p>
                By using our website and providing your personal information, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy.
              </p>
            </SectionContent>
          </Section>
        </ContentWrapper>
      </div>
    </PageWrapper>
  );
};

export default PrivacyPolicy;
