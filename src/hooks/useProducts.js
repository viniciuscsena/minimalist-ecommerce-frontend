import { useState, useEffect } from 'react';
import productService from '../services/productService';

/**
 * Hook for managing products data
 * @param {Object} options - Hook options
 * @param {boolean} options.autoFetch - Whether to fetch data automatically on mount
 * @param {Object} options.initialParams - Initial query parameters
 * @returns {Object} Products state and methods
 */
export const useProducts = (options = {}) => {
  const { autoFetch = true, initialParams = {} } = options;
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productService.getProducts({ ...initialParams, ...params });
      setProducts(response.products);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query, filters = {}) => {
    return fetchProducts({ search: query, ...filters });
  };

  const loadMore = async () => {
    if (pagination.page < pagination.pages) {
      const nextPage = pagination.page + 1;
      setLoading(true);
      
      try {
        const response = await productService.getProducts({
          ...initialParams,
          page: nextPage
        });
        
        setProducts(prev => [...prev, ...response.products]);
        setPagination(response.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch]);

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    searchProducts,
    loadMore,
    hasMore: pagination.page < pagination.pages
  };
};

/**
 * Hook for managing single product data
 * @param {string} productId - Product ID
 * @param {Object} options - Hook options
 * @returns {Object} Product state and methods
 */
export const useProduct = (productId, options = {}) => {
  const { autoFetch = true } = options;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = async (id = productId) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const productData = await productService.getProduct(id);
      setProduct(productData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && productId) {
      fetchProduct();
    }
  }, [productId, autoFetch]);

  return {
    product,
    loading,
    error,
    fetchProduct,
    refetch: () => fetchProduct(productId)
  };
};

/**
 * Hook for managing product reviews
 * @param {string} productId - Product ID
 * @param {Object} options - Hook options
 * @returns {Object} Reviews state and methods
 */
export const useProductReviews = (productId, options = {}) => {
  const { autoFetch = true, initialParams = {} } = options;
  
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const fetchReviews = async (params = {}) => {
    if (!productId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await productService.getProductReviews(productId, {
        ...initialParams,
        ...params
      });
      
      setReviews(response.reviews);
      setSummary(response.summary);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreReviews = async () => {
    if (pagination.page < pagination.pages) {
      const nextPage = pagination.page + 1;
      setLoading(true);
      
      try {
        const response = await productService.getProductReviews(productId, {
          ...initialParams,
          page: nextPage
        });
        
        setReviews(prev => [...prev, ...response.reviews]);
        setPagination(response.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (autoFetch && productId) {
      fetchReviews();
    }
  }, [productId, autoFetch]);

  return {
    reviews,
    summary,
    loading,
    error,
    pagination,
    fetchReviews,
    loadMoreReviews,
    hasMoreReviews: pagination.page < pagination.pages
  };
};

export default useProducts;

