import apiService from './api';

class CheckoutService {
  /**
   * Process checkout for authenticated users
   * @param {Object} checkoutData - Checkout information
   * @param {Object} checkoutData.shippingAddress - Shipping address
   * @param {Object} checkoutData.billingAddress - Billing address (optional, defaults to shipping)
   * @param {Object} checkoutData.paymentMethod - Payment method details
   * @param {string} checkoutData.shippingOption - Selected shipping option ID
   * @returns {Promise<Object>} Order confirmation
   */
  async processCheckout(checkoutData) {
    try {
      return await apiService.post('/checkout', checkoutData);
    } catch (error) {
      console.warn('API not available, simulating checkout');
      return this.simulateCheckout(checkoutData);
    }
  }

  /**
   * Process guest checkout (no account required)
   * @param {Object} guestCheckoutData - Guest checkout information
   * @param {string} guestCheckoutData.email - Guest email
   * @param {Object} guestCheckoutData.shippingAddress - Shipping address
   * @param {Object} guestCheckoutData.billingAddress - Billing address (optional)
   * @param {Object} guestCheckoutData.paymentMethod - Payment method details
   * @param {string} guestCheckoutData.shippingOption - Selected shipping option ID
   * @param {Array} guestCheckoutData.items - Cart items
   * @param {boolean} guestCheckoutData.createAccount - Whether to create account after order
   * @returns {Promise<Object>} Order confirmation
   */
  async processGuestCheckout(guestCheckoutData) {
    try {
      return await apiService.post('/guest-checkout', guestCheckoutData);
    } catch (error) {
      console.warn('API not available, simulating guest checkout');
      return this.simulateGuestCheckout(guestCheckoutData);
    }
  }

  /**
   * Validate checkout data before processing
   * @param {Object} checkoutData - Checkout data to validate
   * @returns {Object} Validation result
   */
  validateCheckoutData(checkoutData) {
    const errors = {};

    // Validate email
    if (!checkoutData.email || !this.isValidEmail(checkoutData.email)) {
      errors.email = 'Valid email is required';
    }

    // Validate shipping address
    if (!checkoutData.shippingAddress) {
      errors.shippingAddress = 'Shipping address is required';
    } else {
      const addressErrors = this.validateAddress(checkoutData.shippingAddress);
      if (Object.keys(addressErrors).length > 0) {
        errors.shippingAddress = addressErrors;
      }
    }

    // Validate payment method
    if (!checkoutData.paymentMethod) {
      errors.paymentMethod = 'Payment method is required';
    } else {
      const paymentErrors = this.validatePaymentMethod(checkoutData.paymentMethod);
      if (Object.keys(paymentErrors).length > 0) {
        errors.paymentMethod = paymentErrors;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Calculate order totals
   * @param {Array} items - Cart items
   * @param {Object} shippingOption - Selected shipping option
   * @param {Object} address - Shipping address for tax calculation
   * @returns {Object} Order totals
   */
  calculateOrderTotals(items, shippingOption, address) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = this.getTaxRate(address);
    const tax = subtotal * taxRate;
    const shipping = shippingOption ? shippingOption.price : 0;
    const total = subtotal + tax + shipping;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      currency: 'USD'
    };
  }

  /**
   * Get available payment methods
   * @returns {Promise<Array>} Available payment methods
   */
  async getPaymentMethods() {
    try {
      return await apiService.get('/payment-methods');
    } catch (error) {
      console.warn('API not available, using mock data');
      return this.getMockPaymentMethods();
    }
  }

  /**
   * Process payment
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Payment result
   */
  async processPayment(paymentData) {
    try {
      return await apiService.post('/payments', paymentData);
    } catch (error) {
      console.warn('API not available, simulating payment');
      return this.simulatePayment(paymentData);
    }
  }

  // Validation helper methods
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateAddress(address) {
    const errors = {};
    
    if (!address.firstName) errors.firstName = 'First name is required';
    if (!address.lastName) errors.lastName = 'Last name is required';
    if (!address.address) errors.address = 'Address is required';
    if (!address.city) errors.city = 'City is required';
    if (!address.state) errors.state = 'State is required';
    if (!address.zipCode) errors.zipCode = 'ZIP code is required';
    if (!address.country) errors.country = 'Country is required';

    return errors;
  }

  validatePaymentMethod(paymentMethod) {
    const errors = {};
    
    if (!paymentMethod.type) {
      errors.type = 'Payment method type is required';
    } else if (paymentMethod.type === 'card') {
      if (!paymentMethod.cardNumber) errors.cardNumber = 'Card number is required';
      if (!paymentMethod.expiryDate) errors.expiryDate = 'Expiry date is required';
      if (!paymentMethod.cvv) errors.cvv = 'CVV is required';
      if (!paymentMethod.nameOnCard) errors.nameOnCard = 'Name on card is required';
    }

    return errors;
  }

  getTaxRate(address) {
    // Simplified tax calculation - in real app this would be more complex
    const stateTaxRates = {
      'CA': 0.0875, // California
      'NY': 0.08,   // New York
      'TX': 0.0625, // Texas
      'FL': 0.06,   // Florida
    };

    return stateTaxRates[address?.state] || 0.08; // Default 8%
  }

  // Mock/simulation methods
  simulateCheckout(checkoutData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          orderId: `order-${Date.now()}`,
          status: 'confirmed',
          total: checkoutData.total || 0,
          currency: 'USD',
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          createdAt: new Date().toISOString()
        });
      }, 2000);
    });
  }

  simulateGuestCheckout(guestCheckoutData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          orderId: `guest-order-${Date.now()}`,
          status: 'confirmed',
          email: guestCheckoutData.email,
          total: guestCheckoutData.total || 0,
          currency: 'USD',
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          createdAt: new Date().toISOString(),
          guestOrder: true
        });
      }, 2000);
    });
  }

  simulatePayment(paymentData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          paymentId: `pay-${Date.now()}`,
          status: 'succeeded',
          amount: paymentData.amount,
          currency: paymentData.currency || 'USD',
          method: paymentData.method,
          createdAt: new Date().toISOString()
        });
      }, 1500);
    });
  }

  getMockPaymentMethods() {
    return [
      {
        id: 'card',
        name: 'Credit/Debit Card',
        type: 'card',
        supported: ['visa', 'mastercard', 'amex', 'discover'],
        fees: 0
      },
      {
        id: 'paypal',
        name: 'PayPal',
        type: 'digital_wallet',
        fees: 0
      },
      {
        id: 'apple_pay',
        name: 'Apple Pay',
        type: 'digital_wallet',
        fees: 0
      },
      {
        id: 'google_pay',
        name: 'Google Pay',
        type: 'digital_wallet',
        fees: 0
      }
    ];
  }
}

export const checkoutService = new CheckoutService();
export default checkoutService;

