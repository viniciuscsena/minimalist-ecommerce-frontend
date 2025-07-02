import apiService from './api';

class CartService {
  /**
   * Get current user's cart
   * @returns {Promise<Object>} Cart data
   */
  async getCart() {
    try {
      return await apiService.get('/cart');
    } catch (error) {
      console.warn('API not available, using local storage');
      return this.getLocalCart();
    }
  }

  /**
   * Add item to cart
   * @param {Object} item - Item to add
   * @param {string} item.productId - Product ID
   * @param {string} item.size - Selected size
   * @param {number} item.quantity - Quantity to add
   * @returns {Promise<Object>} Updated cart
   */
  async addToCart(item) {
    try {
      return await apiService.post('/cart/items', item);
    } catch (error) {
      console.warn('API not available, using local storage');
      return this.addToLocalCart(item);
    }
  }

  /**
   * Update cart item quantity
   * @param {string} itemId - Cart item ID
   * @param {number} quantity - New quantity
   * @returns {Promise<Object>} Updated cart
   */
  async updateCartItem(itemId, quantity) {
    try {
      return await apiService.put(`/cart/items/${itemId}`, { quantity });
    } catch (error) {
      console.warn('API not available, using local storage');
      return this.updateLocalCartItem(itemId, quantity);
    }
  }

  /**
   * Remove item from cart
   * @param {string} itemId - Cart item ID
   * @returns {Promise<Object>} Updated cart
   */
  async removeFromCart(itemId) {
    try {
      return await apiService.delete(`/cart/items/${itemId}`);
    } catch (error) {
      console.warn('API not available, using local storage');
      return this.removeFromLocalCart(itemId);
    }
  }

  /**
   * Clear entire cart
   * @returns {Promise<Object>} Empty cart
   */
  async clearCart() {
    try {
      return await apiService.delete('/cart');
    } catch (error) {
      console.warn('API not available, using local storage');
      return this.clearLocalCart();
    }
  }

  /**
   * Apply coupon code to cart
   * @param {string} couponCode - Coupon code
   * @returns {Promise<Object>} Updated cart with discount
   */
  async applyCoupon(couponCode) {
    try {
      return await apiService.post('/cart/coupon', { code: couponCode });
    } catch (error) {
      console.warn('API not available');
      throw new Error('Coupon service not available');
    }
  }

  /**
   * Remove coupon from cart
   * @returns {Promise<Object>} Updated cart without discount
   */
  async removeCoupon() {
    try {
      return await apiService.delete('/cart/coupon');
    } catch (error) {
      console.warn('API not available');
      throw new Error('Coupon service not available');
    }
  }

  /**
   * Calculate shipping options for cart
   * @param {Object} address - Shipping address
   * @returns {Promise<Array>} Available shipping options
   */
  async getShippingOptions(address) {
    try {
      return await apiService.post('/cart/shipping-options', address);
    } catch (error) {
      console.warn('API not available, using mock data');
      return this.getMockShippingOptions();
    }
  }

  // Local storage fallback methods
  getLocalCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      return JSON.parse(cart);
    }
    return {
      id: 'local-cart',
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      currency: 'USD'
    };
  }

  addToLocalCart(item) {
    const cart = this.getLocalCart();
    const existingItem = cart.items.find(
      cartItem => cartItem.productId === item.productId && cartItem.size === item.size
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.items.push({
        id: `item-${Date.now()}`,
        ...item,
        addedAt: new Date().toISOString()
      });
    }

    this.updateLocalCartTotals(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }

  updateLocalCartItem(itemId, quantity) {
    const cart = this.getLocalCart();
    const item = cart.items.find(item => item.id === itemId);
    
    if (item) {
      if (quantity <= 0) {
        cart.items = cart.items.filter(item => item.id !== itemId);
      } else {
        item.quantity = quantity;
      }
    }

    this.updateLocalCartTotals(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }

  removeFromLocalCart(itemId) {
    const cart = this.getLocalCart();
    cart.items = cart.items.filter(item => item.id !== itemId);
    
    this.updateLocalCartTotals(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }

  clearLocalCart() {
    const emptyCart = {
      id: 'local-cart',
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      currency: 'USD'
    };
    
    localStorage.setItem('cart', JSON.stringify(emptyCart));
    return emptyCart;
  }

  updateLocalCartTotals(cart) {
    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.tax = cart.subtotal * 0.08; // 8% tax
    cart.shipping = cart.subtotal >= 50 ? 0 : 5.99;
    cart.total = cart.subtotal + cart.tax + cart.shipping;
  }

  getMockShippingOptions() {
    return [
      {
        id: 'standard',
        name: 'Standard Shipping',
        description: '5-7 business days',
        price: 5.99,
        estimatedDays: 7
      },
      {
        id: 'express',
        name: 'Express Shipping',
        description: '2-3 business days',
        price: 12.99,
        estimatedDays: 3
      },
      {
        id: 'overnight',
        name: 'Overnight Shipping',
        description: 'Next business day',
        price: 24.99,
        estimatedDays: 1
      }
    ];
  }
}

export const cartService = new CartService();
export default cartService;

