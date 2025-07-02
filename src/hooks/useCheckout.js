import { useState, useCallback } from 'react';
import checkoutService from '../services/checkoutService';
import { useCart } from '../contexts/CartContext';

/**
 * Hook for managing checkout process
 * @returns {Object} Checkout state and methods
 */
export const useCheckout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);

  /**
   * Process checkout for authenticated users
   * @param {Object} checkoutData - Checkout data
   * @returns {Promise<Object>} Order result
   */
  const processCheckout = useCallback(async (checkoutData) => {
    setLoading(true);
    setError(null);

    try {
      // Validate checkout data
      const validation = checkoutService.validateCheckoutData(checkoutData);
      if (!validation.isValid) {
        throw new Error('Invalid checkout data: ' + JSON.stringify(validation.errors));
      }

      // Calculate totals
      const selectedShipping = shippingOptions.find(option => option.id === checkoutData.shippingOption);
      const totals = checkoutService.calculateOrderTotals(items, selectedShipping, checkoutData.shippingAddress);

      // Process the order
      const orderData = {
        ...checkoutData,
        items,
        totals
      };

      const result = await checkoutService.processCheckout(orderData);
      setOrder(result);
      
      // Clear cart on successful order
      clearCart();
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [items, shippingOptions, clearCart]);

  /**
   * Process guest checkout
   * @param {Object} guestCheckoutData - Guest checkout data
   * @returns {Promise<Object>} Order result
   */
  const processGuestCheckout = useCallback(async (guestCheckoutData) => {
    setLoading(true);
    setError(null);

    try {
      // Validate checkout data
      const validation = checkoutService.validateCheckoutData(guestCheckoutData);
      if (!validation.isValid) {
        throw new Error('Invalid checkout data: ' + JSON.stringify(validation.errors));
      }

      // Calculate totals
      const selectedShipping = shippingOptions.find(option => option.id === guestCheckoutData.shippingOption);
      const totals = checkoutService.calculateOrderTotals(items, selectedShipping, guestCheckoutData.shippingAddress);

      // Process the guest order
      const orderData = {
        ...guestCheckoutData,
        items,
        totals
      };

      const result = await checkoutService.processGuestCheckout(orderData);
      setOrder(result);
      
      // Clear cart on successful order
      clearCart();
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [items, shippingOptions, clearCart]);

  /**
   * Calculate order totals
   * @param {Object} shippingOption - Selected shipping option
   * @param {Object} address - Shipping address
   * @returns {Object} Order totals
   */
  const calculateTotals = useCallback((shippingOption, address) => {
    return checkoutService.calculateOrderTotals(items, shippingOption, address);
  }, [items]);

  /**
   * Get available payment methods
   * @returns {Promise<Array>} Payment methods
   */
  const getPaymentMethods = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const methods = await checkoutService.getPaymentMethods();
      setPaymentMethods(methods);
      return methods;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get shipping options for address
   * @param {Object} address - Shipping address
   * @returns {Promise<Array>} Shipping options
   */
  const getShippingOptions = useCallback(async (address) => {
    setLoading(true);
    setError(null);

    try {
      const options = await checkoutService.getShippingOptions ? 
        await checkoutService.getShippingOptions(address) :
        await checkoutService.getMockShippingOptions();
      
      setShippingOptions(options);
      return options;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Process payment
   * @param {Object} paymentData - Payment data
   * @returns {Promise<Object>} Payment result
   */
  const processPayment = useCallback(async (paymentData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await checkoutService.processPayment(paymentData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Validate checkout form data
   * @param {Object} formData - Form data to validate
   * @returns {Object} Validation result
   */
  const validateCheckoutData = useCallback((formData) => {
    return checkoutService.validateCheckoutData(formData);
  }, []);

  /**
   * Clear checkout error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Reset checkout state
   */
  const resetCheckout = useCallback(() => {
    setOrder(null);
    setError(null);
    setPaymentMethods([]);
    setShippingOptions([]);
  }, []);

  return {
    // State
    loading,
    error,
    order,
    paymentMethods,
    shippingOptions,
    
    // Cart data
    items,
    cartTotal: getCartTotal(),
    
    // Methods
    processCheckout,
    processGuestCheckout,
    calculateTotals,
    getPaymentMethods,
    getShippingOptions,
    processPayment,
    validateCheckoutData,
    clearError,
    resetCheckout,
    
    // Utility methods
    isValidEmail: checkoutService.isValidEmail || ((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  };
};

export default useCheckout;

