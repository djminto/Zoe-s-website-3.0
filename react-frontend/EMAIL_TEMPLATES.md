# EMAIL TEMPLATES FOR EMAILJS

## TEMPLATE 1: ADMIN ORDER NOTIFICATION

### Template Settings:
- **Template Name:** Admin Order Notification
- **To Email:** {{to_email}} (will be set to zoesacessories23@gmail.com)
- **From Name:** Zoe's Accessories Order System
- **Subject:** 🛍️ New Order Received - Order #{{order_id}}

### Email Content (HTML Format):
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff69b4, #ff1493); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .section { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .section h3 { color: #ff69b4; margin-top: 0; border-bottom: 2px solid #ff69b4; padding-bottom: 10px; }
        .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .info-row:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #666; }
        .value { color: #333; }
        .total { background: #ff69b4; color: white; padding: 15px; text-align: center; border-radius: 8px; font-size: 20px; font-weight: bold; margin: 20px 0; }
        .items { background: #fff; padding: 15px; border-radius: 8px; white-space: pre-line; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛍️ NEW ORDER RECEIVED!</h1>
            <p>Order #{{order_id}}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>📋 ORDER DETAILS</h3>
                <div class="info-row">
                    <span class="label">Order ID:</span>
                    <span class="value">{{order_id}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Order Date:</span>
                    <span class="value">{{order_date}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Payment Method:</span>
                    <span class="value">{{payment_method}}</span>
                </div>
            </div>

            <div class="section">
                <h3>👤 CUSTOMER INFORMATION</h3>
                <div class="info-row">
                    <span class="label">Name:</span>
                    <span class="value">{{customer_name}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Email:</span>
                    <span class="value">{{customer_email}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Phone:</span>
                    <span class="value">{{customer_phone}}</span>
                </div>
            </div>

            <div class="section">
                <h3>📍 DELIVERY ADDRESS</h3>
                <p style="margin: 0;">{{delivery_address}}</p>
            </div>

            <div class="section">
                <h3>🛒 ORDER ITEMS</h3>
                <div class="items">{{order_items}}</div>
            </div>

            <div class="total">
                ORDER TOTAL: {{order_total}}
            </div>

            <div class="section">
                <h3>📝 SPECIAL NOTES</h3>
                <p style="margin: 0;">{{order_notes}}</p>
            </div>

            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #856404;">
                    <strong>⚠️ Action Required:</strong> Please process this order at your earliest convenience.
                    {{#if payment_method == "Bank Transfer"}}
                    Remember to verify the bank transfer payment before shipping.
                    {{/if}}
                </p>
            </div>
        </div>

        <div class="footer">
            <p>Zoe's Accessories - Automated Order Notification<br>
            This is an automated email, please do not reply.</p>
        </div>
    </div>
</body>
</html>
```

---

## TEMPLATE 2: CUSTOMER ORDER CONFIRMATION

### Template Settings:
- **Template Name:** Customer Order Confirmation
- **To Email:** {{to_email}} (will be the customer's email)
- **From Name:** Zoe's Accessories
- **Reply To:** zoesacessories23@gmail.com
- **Subject:** ✨ Order Confirmation #{{order_id}} - Zoe's Accessories

### Email Content (HTML Format):
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff69b4, #ff1493); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0 0 10px 0; font-size: 28px; }
        .header p { margin: 0; font-size: 16px; opacity: 0.9; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .greeting { background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
        .greeting h2 { color: #ff69b4; margin: 0 0 10px 0; }
        .section { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .section h3 { color: #ff69b4; margin-top: 0; border-bottom: 2px solid #ff69b4; padding-bottom: 10px; }
        .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .info-row:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #666; }
        .value { color: #333; text-align: right; }
        .items { background: #f9f9f9; padding: 15px; border-radius: 8px; white-space: pre-line; margin: 15px 0; }
        .total-box { background: linear-gradient(135deg, #ff69b4, #ff1493); color: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
        .total-box .amount { font-size: 32px; font-weight: bold; margin: 10px 0; }
        .bank-details { background: #fff3cd; border: 2px solid #ffc107; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .bank-details h4 { color: #856404; margin-top: 0; }
        .bank-info { background: white; padding: 15px; border-radius: 5px; margin-top: 15px; }
        .status-message { background: #d1e7dd; border-left: 4px solid #0f5132; padding: 15px; border-radius: 8px; color: #0f5132; margin: 20px 0; }
        .footer { background: white; padding: 25px; text-align: center; border-radius: 8px; margin-top: 20px; }
        .footer .social { margin: 15px 0; }
        .footer .social a { color: #ff69b4; text-decoration: none; margin: 0 10px; }
        .bottom-note { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✨ ORDER CONFIRMED ✨</h1>
            <p>Thank you for shopping with Zoe's Accessories!</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                <h2>Hi {{customer_name}}! 💕</h2>
                <p>We've received your order and we're so excited to get your items to you!</p>
            </div>

            <div class="section">
                <h3>📋 ORDER SUMMARY</h3>
                <div class="info-row">
                    <span class="label">Order ID:</span>
                    <span class="value">{{order_id}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Order Date:</span>
                    <span class="value">{{order_date}}</span>
                </div>
            </div>

            <div class="section">
                <h3>🛒 YOUR ITEMS</h3>
                <div class="items">{{order_items}}</div>
                
                <div class="info-row" style="border-top: 2px solid #ff69b4; margin-top: 15px; padding-top: 15px;">
                    <span class="label">Subtotal:</span>
                    <span class="value">{{subtotal}}</span>
                </div>
                <div class="info-row">
                    <span class="label">Shipping:</span>
                    <span class="value" style="color: #28a745; font-weight: bold;">{{shipping}}</span>
                </div>
            </div>

            <div class="total-box">
                <div>ORDER TOTAL</div>
                <div class="amount">{{order_total}}</div>
            </div>

            <div class="section">
                <h3>📍 DELIVERY ADDRESS</h3>
                <p style="margin: 0; font-size: 16px;">{{delivery_address}}</p>
            </div>

            <div class="section">
                <h3>💳 PAYMENT METHOD</h3>
                <p style="margin: 0; font-size: 16px; font-weight: bold; color: #ff69b4;">{{payment_method}}</p>
            </div>

            {{#if payment_method == "Bank Transfer"}}
            <div class="bank-details">
                <h4>🏦 BANK TRANSFER DETAILS</h4>
                <p style="margin: 10px 0;">Please transfer the total amount to the following account:</p>
                <div class="bank-info">
                    <div class="info-row">
                        <span class="label">Bank Name:</span>
                        <span class="value">{{bank_name}}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Account Name:</span>
                        <span class="value">{{account_name}}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Account Number:</span>
                        <span class="value">{{account_number}}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Branch:</span>
                        <span class="value">{{branch}}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Account Type:</span>
                        <span class="value">{{account_type}}</span>
                    </div>
                </div>
                <p style="margin: 15px 0 0 0; font-weight: bold; color: #856404;">
                    ⚠️ IMPORTANT: Use your Order ID ({{order_id}}) as the payment reference!
                </p>
            </div>
            {{/if}}

            <div class="status-message">
                <strong>📦 ORDER STATUS:</strong><br>
                {{status_message}}
            </div>

            {{#if order_notes != "None"}}
            <div class="section">
                <h3>📝 YOUR NOTES</h3>
                <p style="margin: 0;">{{order_notes}}</p>
            </div>
            {{/if}}

            <div class="footer">
                <h3 style="color: #ff69b4; margin-top: 0;">Need Help?</h3>
                <p>Contact us at <strong>zoesacessories23@gmail.com</strong></p>
                <p>We're here to help with any questions about your order!</p>
                
                <div class="social">
                    <p>Follow us on social media! 💕</p>
                    <p style="font-size: 24px;">
                        📱 💌 ✨
                    </p>
                </div>
            </div>
        </div>

        <div class="bottom-note">
            <p>Thank you for choosing Zoe's Accessories! ✨<br>
            This is an automated confirmation email.<br>
            Please do not reply to this email. For support, contact zoesacessories23@gmail.com</p>
        </div>
    </div>
</body>
</html>
```

---

## PLAIN TEXT VERSIONS (Fallback)

### Admin Template (Plain Text):
```
NEW ORDER RECEIVED - Order #{{order_id}}

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

Action Required: Please process this order at your earliest convenience.

---
Zoe's Accessories - Automated Order Notification
```

### Customer Template (Plain Text):
```
ORDER CONFIRMED - Zoe's Accessories

Hi {{customer_name}},

Thank you for your order! We're excited to get your items to you.

ORDER SUMMARY:
Order ID: {{order_id}}
Order Date: {{order_date}}

YOUR ITEMS:
{{order_items}}

Subtotal: {{subtotal}}
Shipping: {{shipping}}
ORDER TOTAL: {{order_total}}

DELIVERY ADDRESS:
{{delivery_address}}

PAYMENT METHOD: {{payment_method}}

{{#if payment_method == "Bank Transfer"}}
BANK TRANSFER DETAILS:
Bank Name: {{bank_name}}
Account Name: {{account_name}}
Account Number: {{account_number}}
Branch: {{branch}}
Account Type: {{account_type}}

IMPORTANT: Use your Order ID ({{order_id}}) as the payment reference!
{{/if}}

ORDER STATUS:
{{status_message}}

{{#if order_notes != "None"}}
YOUR NOTES:
{{order_notes}}
{{/if}}

Need help? Contact us at zoesacessories23@gmail.com

Thank you for shopping with Zoe's Accessories!
---
This is an automated email. Please do not reply.
```

---

## VARIABLES REFERENCE

### ⚠️ IMPORTANT: USE ONLY THESE VARIABLES

**Admin Template Variables (template_nx2dygb):**
```
{{order_id}}
{{customer_name}}
{{customer_email}}
{{customer_phone}}
{{delivery_address}}
{{payment_method}}
{{order_total}}
{{order_items}}
{{order_notes}}
{{order_date}}
```

**Customer Template Variables (template_7s2j9aj):**
```
{{customer_name}}
{{order_id}}
{{order_date}}
{{order_items}}
{{subtotal}}
{{shipping}}
{{order_total}}
{{payment_method}}
{{delivery_address}}
{{bank_name}}
{{account_name}}
{{account_number}}
{{branch}}
{{account_type}}
{{order_notes}}
```

### ✅ BOTH TEMPLATES USE {{to_email}}:
- **Admin Template "To Email" field:** `{{to_email}}` 
- **Customer Template "To Email" field:** `{{to_email}}`

### 🚫 REMOVE THESE FROM YOUR TEMPLATE HTML:
- ❌ **{{status_message}}** - This variable is NOT sent! It causes corruption!
- ❌ The entire `<div class="status-message">` section with {{status_message}}
- ❌ Any conditional logic like `{{#if payment_method == "Bank Transfer"}}`

### ⚠️ CRITICAL FIX NEEDED:
Go to your EmailJS Customer Template and **DELETE** this entire section:
```html
<div class="status-message">
    <strong>📦 ORDER STATUS:</strong><br>
    {{status_message}}
</div>
```

Also **DELETE** all `{{#if}}` conditional logic - EmailJS doesn't support it without special configuration.

### Variable Details:

- **{{order_id}}** - Unique order identifier (e.g., ZOE1733356800000)
- **{{order_date}}** - Date of order (format: MM/DD/YYYY)
- **{{customer_name}}** - Customer's full name (First + Last)
- **{{customer_email}}** - Customer's email address
- **{{customer_phone}}** - Customer's phone number
- **{{delivery_address}}** - Complete delivery address (Address, City, Postal Code)
- **{{payment_method}}** - "Bank Transfer" or "Cash on Delivery"
- **{{order_items}}** - Comma-separated list of items with quantities and prices
- **{{subtotal}}** - Order subtotal amount (format: XX.XX)
- **{{shipping}}** - Shipping cost (always "FREE")
- **{{order_total}}** - Total order amount (format: XX.XX)
- **{{order_notes}}** - Customer's special instructions (or "No special instructions"/"None")
- **{{bank_name}}** - JN Bank
- **{{account_name}}** - Mahalia Moore
- **{{account_number}}** - 2094834258
- **{{branch}}** - Spanish Town
- **{{account_type}}** - Savings

---

## QUICK SETUP CHECKLIST

1. ✅ Create EmailJS account
2. ✅ Add email service (Gmail with zoesacessories23@gmail.com)
3. ✅ Create "Admin Order Notification" template (copy HTML above)
4. ✅ Create "Customer Order Confirmation" template (copy HTML above)
5. ✅ Copy Service ID, Template IDs, and Public Key
6. ✅ Update src/services/emailService.js with your IDs
7. ✅ Test with a real order!
