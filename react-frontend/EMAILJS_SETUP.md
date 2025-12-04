# EmailJS Setup Instructions for Zoe's Accessories

## Overview
This project uses EmailJS to send order notifications to both the admin (zoesacessories23@gmail.com) and customers when orders are placed.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month free)
3. Verify your email address

### 2. Set Up Email Service
1. Log in to your EmailJS dashboard
2. Go to **Email Services**
3. Click **Add New Service**
4. Choose your email provider (Gmail recommended)
5. Connect your email account (zoesacessories23@gmail.com)
6. Copy the **Service ID** (you'll need this later)

### 3. Create Email Templates

#### Template 1: Admin Order Notification
1. Go to **Email Templates** → **Create New Template**
2. **Template Name:** Admin Order Notification
3. **Template Content:**

```
Subject: New Order Received - Order #{{order_id}}

Hello Zoe's Accessories Admin,

You have received a new order!

ORDER DETAILS:
Order ID: {{order_id}}
Order Date: {{order_date}}
Payment Method: {{payment_method}}

CUSTOMER INFORMATION:
Name: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}

DELIVERY ADDRESS:
{{delivery_address}}

ORDER ITEMS:
{{order_items}}

ORDER TOTAL: {{order_total}}

SPECIAL NOTES:
{{order_notes}}

Please process this order at your earliest convenience.

---
Zoe's Accessories - Automated Order Notification
```

4. Copy the **Template ID**

#### Template 2: Customer Order Confirmation
1. Create another new template
2. **Template Name:** Customer Order Confirmation
3. **Template Content:**

```
Subject: Order Confirmation - Order #{{order_id}} | Zoe's Accessories

Dear {{customer_name}},

Thank you for your order from Zoe's Accessories! ✨

ORDER SUMMARY:
Order ID: {{order_id}}
Order Date: {{order_date}}

ITEMS ORDERED:
{{order_items}}

Subtotal: {{subtotal}}
Shipping: {{shipping}}
TOTAL: {{order_total}}

DELIVERY ADDRESS:
{{delivery_address}}

PAYMENT METHOD: {{payment_method}}

{{#if payment_method === "Bank Transfer"}}
BANK TRANSFER DETAILS:
Bank Name: {{bank_name}}
Account Name: {{account_name}}
Account Number: {{account_number}}
Branch: {{branch}}
Account Type: {{account_type}}

⚠️ IMPORTANT: Please use your Order ID ({{order_id}}) as the payment reference.
{{/if}}

ORDER STATUS:
{{status_message}}

SPECIAL NOTES:
{{order_notes}}

---
Need help? Contact us at zoesacessories23@gmail.com

Thank you for shopping with Zoe's Accessories! 💕

Follow us on social media for the latest updates!
```

4. Copy the **Template ID**

### 4. Get Your Public Key
1. Go to **Account** → **API Keys**
2. Copy your **Public Key**

### 5. Update Configuration File
1. Open `src/services/emailService.js`
2. Replace the placeholders with your actual values:

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',           // Paste your Service ID here
  adminTemplateId: 'YOUR_ADMIN_TEMPLATE_ID',     // Paste Admin Template ID
  customerTemplateId: 'YOUR_CUSTOMER_TEMPLATE_ID', // Paste Customer Template ID
  publicKey: 'YOUR_PUBLIC_KEY'            // Paste your Public Key here
};
```

Example:
```javascript
const EMAILJS_CONFIG = {
  serviceId: 'service_abc123',
  adminTemplateId: 'template_admin_xyz',
  customerTemplateId: 'template_customer_789',
  publicKey: 'user_aBcDeF123456'
};
```

### 6. Test the Email Functionality
1. Start your React app: `npm start`
2. Add items to cart
3. Go to checkout
4. Fill in the form with a valid email
5. Place an order
6. Check both the customer email and admin email (zoesacessories23@gmail.com)

## Email Templates Customization

### Variables Available:
- `{{order_id}}` - Unique order identifier
- `{{customer_name}}` - Customer's full name
- `{{customer_email}}` - Customer's email
- `{{customer_phone}}` - Customer's phone
- `{{delivery_address}}` - Full delivery address
- `{{payment_method}}` - Bank Transfer or Cash on Delivery
- `{{order_items}}` - List of ordered items
- `{{order_total}}` - Total order amount
- `{{order_notes}}` - Special instructions
- `{{order_date}}` - Date and time of order
- `{{bank_name}}` - JN Bank
- `{{account_name}}` - Mahalia Moore
- `{{account_number}}` - 2094834258
- `{{branch}}` - Spanish Town
- `{{account_type}}` - Savings

## Troubleshooting

### Emails Not Sending?
1. Check browser console for errors
2. Verify all IDs and keys are correct
3. Ensure EmailJS service is connected to your Gmail
4. Check spam/junk folders
5. Verify you haven't exceeded the free tier limit (100 emails/month)

### Testing Tips
1. Use your own email for testing initially
2. Check the EmailJS dashboard for sent email logs
3. Enable "Auto-Reply" in EmailJS for instant testing

## Security Notes
- Never commit your EmailJS keys to public repositories
- Consider using environment variables for production:
  ```javascript
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID
  ```
- The free tier includes EmailJS branding in emails

## Support
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Dashboard: [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)

---
**Note:** Remember to replace the placeholder values in `src/services/emailService.js` with your actual EmailJS credentials!
