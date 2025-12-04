import emailjs from '@emailjs/browser';

// EmailJS Configuration
// You'll need to replace these with your actual EmailJS credentials from https://dashboard.emailjs.com/
const EMAILJS_CONFIG = {
  serviceId: 'service_vg7c2n7',      // Replace with your EmailJS Service ID
  adminTemplateId: 'template_nx2dygb',  // Template for admin notification
  customerTemplateId: 'template_7s2j9aj', // Template for customer confirmation
  publicKey: 'gqSQPbyZtgsfnegfH'       // Replace with your EmailJS Public Key
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

/**
 * Send order notification email to admin
 * @param {Object} orderData - Order details
 * @returns {Promise}
 */
export const sendAdminOrderNotification = async (orderData) => {
  try {
    const itemsList = orderData.items.map(item => 
      item.name + ' (Qty: ' + item.quantity + ') - $' + (item.price * item.quantity).toFixed(2)
    ).join(', ');

    const templateParams = {
      to_email: 'zoesacessories23@gmail.com',
      order_id: orderData.orderId || '',
      customer_name: orderData.firstName + ' ' + orderData.lastName,
      customer_email: orderData.email || '',
      customer_phone: orderData.phone || '',
      delivery_address: orderData.address + ', ' + orderData.city + ', ' + orderData.postalCode,
      payment_method: orderData.paymentMethod === 'bank-transfer' ? 'Bank Transfer' : 'Cash on Delivery',
      order_total: orderData.total.toFixed(2),
      order_items: itemsList,
      order_notes: orderData.notes || 'No special instructions',
      order_date: new Date().toLocaleDateString()
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.adminTemplateId,
      templateParams
    );

    console.log('Admin notification sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return { success: false, error };
  }
};

/**
 * Send order confirmation email to customer
 * @param {Object} orderData - Order details
 * @returns {Promise}
 */
export const sendCustomerOrderConfirmation = async (orderData) => {
  try {
    const itemsList = orderData.items.map(item => 
      item.name + ' (Qty: ' + item.quantity + ') - $' + (item.price * item.quantity).toFixed(2)
    ).join(', ');

    const templateParams = {
      to_email: orderData.email || '',
      customer_name: orderData.firstName || '',
      order_id: orderData.orderId || '',
      order_date: new Date().toLocaleDateString(),
      order_items: itemsList,
      subtotal: orderData.subtotal.toFixed(2),
      shipping: 'FREE',
      order_total: orderData.total.toFixed(2),
      payment_method: orderData.paymentMethod === 'bank-transfer' ? 'Bank Transfer' : 'Cash on Delivery',
      delivery_address: orderData.address + ', ' + orderData.city + ', ' + orderData.postalCode,
      bank_name: 'JN Bank',
      account_name: 'Mahalia Moore',
      account_number: '2094834258',
      branch: 'Spanish Town',
      account_type: 'Savings',
      order_notes: orderData.notes || 'None'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.customerTemplateId,
      templateParams
    );

    console.log('Customer confirmation sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send customer confirmation:', error);
    return { success: false, error };
  }
};

/**
 * Send both admin notification and customer confirmation
 * @param {Object} orderData - Order details
 * @returns {Promise}
 */
export const sendOrderEmails = async (orderData) => {
  try {
    // Send both emails in parallel
    const [adminResult, customerResult] = await Promise.all([
      sendAdminOrderNotification(orderData),
      sendCustomerOrderConfirmation(orderData)
    ]);

    return {
      success: adminResult.success && customerResult.success,
      adminResult,
      customerResult
    };
  } catch (error) {
    console.error('Failed to send order emails:', error);
    return { success: false, error };
  }
};
