import apiService from './api';

class AuthService {
  /**
   * Login user with email and password
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise<Object>} Authentication result
   */
  async login(credentials) {
    try {
      const response = await apiService.post('/auth/login', credentials);
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      console.warn('API not available, simulating login');
      return this.simulateLogin(credentials);
    }
  }

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password
   * @param {string} userData.firstName - User first name
   * @param {string} userData.lastName - User last name
   * @returns {Promise<Object>} Registration result
   */
  async register(userData) {
    try {
      const response = await apiService.post('/auth/register', userData);
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      console.warn('API not available, simulating registration');
      return this.simulateRegister(userData);
    }
  }

  /**
   * Logout current user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.warn('API not available for logout');
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  /**
   * Get current user profile
   * @returns {Promise<Object>} User profile data
   */
  async getCurrentUser() {
    try {
      return await apiService.get('/auth/me');
    } catch (error) {
      console.warn('API not available, using local storage');
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
  }

  /**
   * Update user profile
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} Updated user profile
   */
  async updateProfile(userData) {
    try {
      const response = await apiService.put('/auth/me', userData);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    } catch (error) {
      console.warn('API not available');
      throw new Error('Profile update not available');
    }
  }

  /**
   * Change user password
   * @param {Object} passwordData - Password change data
   * @param {string} passwordData.currentPassword - Current password
   * @param {string} passwordData.newPassword - New password
   * @returns {Promise<Object>} Password change result
   */
  async changePassword(passwordData) {
    try {
      return await apiService.put('/auth/password', passwordData);
    } catch (error) {
      console.warn('API not available');
      throw new Error('Password change not available');
    }
  }

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<Object>} Password reset request result
   */
  async requestPasswordReset(email) {
    try {
      return await apiService.post('/auth/password-reset', { email });
    } catch (error) {
      console.warn('API not available');
      throw new Error('Password reset not available');
    }
  }

  /**
   * Reset password with token
   * @param {Object} resetData - Password reset data
   * @param {string} resetData.token - Reset token
   * @param {string} resetData.newPassword - New password
   * @returns {Promise<Object>} Password reset result
   */
  async resetPassword(resetData) {
    try {
      return await apiService.post('/auth/password-reset/confirm', resetData);
    } catch (error) {
      console.warn('API not available');
      throw new Error('Password reset not available');
    }
  }

  /**
   * Verify email address
   * @param {string} token - Verification token
   * @returns {Promise<Object>} Verification result
   */
  async verifyEmail(token) {
    try {
      return await apiService.post('/auth/verify-email', { token });
    } catch (error) {
      console.warn('API not available');
      throw new Error('Email verification not available');
    }
  }

  /**
   * Resend email verification
   * @returns {Promise<Object>} Resend result
   */
  async resendEmailVerification() {
    try {
      return await apiService.post('/auth/verify-email/resend');
    } catch (error) {
      console.warn('API not available');
      throw new Error('Email verification not available');
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  /**
   * Get stored auth token
   * @returns {string|null} Auth token
   */
  getToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Get stored user data
   * @returns {Object|null} User data
   */
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} Validation result
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {Object} Validation result with strength score
   */
  validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const score = [
      password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar
    ].filter(Boolean).length;

    let strength = 'weak';
    if (score >= 4) strength = 'strong';
    else if (score >= 3) strength = 'medium';

    return {
      isValid: score >= 3,
      strength,
      score,
      requirements: {
        minLength: password.length >= minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar
      }
    };
  }

  // Mock/simulation methods
  simulateLogin(credentials) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
          const mockUser = {
            id: 'user-1',
            email: credentials.email,
            firstName: 'Demo',
            lastName: 'User',
            emailVerified: true,
            createdAt: '2024-01-01T00:00:00Z'
          };
          
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          localStorage.setItem('authToken', mockToken);
          localStorage.setItem('user', JSON.stringify(mockUser));
          
          resolve({
            success: true,
            token: mockToken,
            user: mockUser
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  simulateRegister(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.isValidEmail(userData.email)) {
          const mockUser = {
            id: 'user-' + Date.now(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            emailVerified: false,
            createdAt: new Date().toISOString()
          };
          
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          localStorage.setItem('authToken', mockToken);
          localStorage.setItem('user', JSON.stringify(mockUser));
          
          resolve({
            success: true,
            token: mockToken,
            user: mockUser
          });
        } else {
          reject(new Error('Invalid email format'));
        }
      }, 1000);
    });
  }
}

export const authService = new AuthService();
export default authService;

