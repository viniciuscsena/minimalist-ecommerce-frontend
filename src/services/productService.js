import apiService from './api';

class ProductService {
  /**
   * Get all products with optional filtering and pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.category - Filter by category
   * @param {string} params.search - Search term
   * @returns {Promise<Object>} Products data with pagination info
   */
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    
    try {
      return await apiService.get(endpoint);
    } catch (error) {
      // Fallback to mock data for development
      console.warn('API not available, using mock data');
      return this.getMockProducts(params);
    }
  }

  /**
   * Get a single product by ID
   * @param {string} id - Product ID
   * @returns {Promise<Object>} Product data
   */
  async getProduct(id) {
    try {
      return await apiService.get(`/products/${id}`);
    } catch (error) {
      // Fallback to mock data for development
      console.warn('API not available, using mock data');
      return this.getMockProduct(id);
    }
  }

  /**
   * Search products
   * @param {string} query - Search query
   * @param {Object} filters - Additional filters
   * @returns {Promise<Object>} Search results
   */
  async searchProducts(query, filters = {}) {
    const params = { search: query, ...filters };
    return this.getProducts(params);
  }

  /**
   * Get product reviews
   * @param {string} productId - Product ID
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Reviews data
   */
  async getProductReviews(productId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/products/${productId}/reviews${queryString ? `?${queryString}` : ''}`;
    
    try {
      return await apiService.get(endpoint);
    } catch (error) {
      console.warn('API not available, using mock data');
      return this.getMockReviews(productId);
    }
  }

  // Mock data methods for development
  getMockProducts(params = {}) {
    const mockProducts = [
      {
        id: 'black-tshirt',
        name: 'Essential Black T-Shirt',
        description: 'The perfect foundation for any wardrobe. Made from 100% organic cotton with a comfortable, relaxed fit that works for any occasion.',
        price: 29,
        originalPrice: 39,
        currency: 'USD',
        images: [
          '/api/placeholder/600/600',
          '/api/placeholder/600/600',
          '/api/placeholder/600/600'
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black'],
        category: 'clothing',
        tags: ['essential', 'cotton', 'basic'],
        rating: 4.8,
        reviewCount: 127,
        inStock: true,
        inventory: {
          XS: 10,
          S: 15,
          M: 20,
          L: 18,
          XL: 12,
          XXL: 8
        },
        features: [
          '100% organic cotton',
          'Pre-shrunk fabric',
          'Reinforced seams',
          'Machine washable',
          'Ethically sourced'
        ],
        specifications: {
          material: '100% Organic Cotton',
          weight: '180 GSM',
          fit: 'Regular',
          care: 'Machine wash cold, tumble dry low'
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      }
    ];

    // Apply basic filtering for mock data
    let filteredProducts = mockProducts;
    
    if (params.search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(params.search.toLowerCase()) ||
        product.description.toLowerCase().includes(params.search.toLowerCase())
      );
    }

    if (params.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === params.category
      );
    }

    return {
      products: filteredProducts,
      pagination: {
        page: parseInt(params.page) || 1,
        limit: parseInt(params.limit) || 10,
        total: filteredProducts.length,
        pages: Math.ceil(filteredProducts.length / (parseInt(params.limit) || 10))
      }
    };
  }

  getMockProduct(id) {
    const mockProducts = this.getMockProducts().products;
    const product = mockProducts.find(p => p.id === id);
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    return product;
  }

  getMockReviews(productId) {
    return {
      reviews: [
        {
          id: '1',
          userId: 'user1',
          userName: 'John D.',
          rating: 5,
          title: 'Perfect fit and quality',
          comment: 'Exactly what I was looking for. Great quality cotton and the fit is perfect.',
          createdAt: '2024-01-10T00:00:00Z',
          verified: true
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Sarah M.',
          rating: 4,
          title: 'Good basic tee',
          comment: 'Nice quality for the price. Would recommend.',
          createdAt: '2024-01-08T00:00:00Z',
          verified: true
        }
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 2,
        pages: 1
      },
      summary: {
        averageRating: 4.8,
        totalReviews: 127,
        ratingDistribution: {
          5: 89,
          4: 28,
          3: 7,
          2: 2,
          1: 1
        }
      }
    };
  }
}

export const productService = new ProductService();
export default productService;

