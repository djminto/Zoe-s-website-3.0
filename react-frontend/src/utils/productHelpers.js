/**
 * Utility functions for product management
 */

/**
 * Get all products (static + dynamic from localStorage)
 * @returns {Array} Combined array of all products
 */
export const getAllProducts = (staticProducts) => {
  const dynamicProducts = JSON.parse(localStorage.getItem('zoiesProducts') || '[]');
  return [...staticProducts, ...dynamicProducts];
};

/**
 * Format category name to lowercase for consistency
 * @param {string} category - Category name
 * @returns {string} Lowercase category
 */
export const formatCategory = (category) => {
  return category.toLowerCase().trim();
};

/**
 * Get unique categories from products
 * @param {Array} products - Array of products
 * @returns {Array} Unique categories with counts
 */
export const getCategories = (products) => {
  return [...new Set(products.map(p => p.category))]
    .map(cat => ({
      name: cat,
      count: products.filter(p => p.category === cat).length
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Filter products by criteria
 * @param {Array} products - Array of products
 * @param {Array} selectedCategories - Selected category filters
 * @param {Object} priceRange - Price range {min, max}
 * @returns {Array} Filtered products
 */
export const filterProducts = (products, selectedCategories, priceRange) => {
  let filtered = [...products];

  if (selectedCategories.length > 0) {
    filtered = filtered.filter(p =>
      selectedCategories.includes(p.category.toLowerCase())
    );
  }

  filtered = filtered.filter(p =>
    p.price >= priceRange.min && p.price <= priceRange.max
  );

  return filtered;
};

/**
 * Sort products by criteria
 * @param {Array} products - Array of products
 * @param {string} sortBy - Sort method
 * @returns {Array} Sorted products
 */
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};

/**
 * Get featured products (with badge or first few)
 * @param {Array} products - Array of products
 * @param {number} count - Number of featured products to return
 * @returns {Array} Featured products
 */
export const getFeaturedProducts = (products, count = 4) => {
  // First try to get products with 'Featured' badge
  let featured = products.filter(p => p.badge === 'Featured');
  
  // If not enough, fill with first products
  if (featured.length < count) {
    const remaining = products.filter(p => p.badge !== 'Featured');
    featured = [...featured, ...remaining].slice(0, count);
  }

  return featured.slice(0, count);
};
