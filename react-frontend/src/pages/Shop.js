import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { products as staticProducts } from '../data/products';

const ShopWrapper = styled.div`
  margin-top: 120px;
  padding: 2rem 0 4rem;
`;

const ShopContainer = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 220px 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 140px;
  height: fit-content;
  animation: slideInLeft 0.8s ease;

  @media (max-width: 768px) {
    position: relative;
    top: 0;
    display: ${props => props.$isOpen ? 'block' : 'none'};
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const FilterSection = styled.div`
  background: var(--white);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);

  &:hover {
    box-shadow: var(--shadow-lg);
  }

  h3 {
    font-size: clamp(1rem, 2vw, 1.2rem);
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--primary-black);
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      color: var(--primary-pink);
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CategoryItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.95rem;

  &:hover {
    background: var(--off-white);
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: var(--primary-pink);
  }

  span {
    flex: 1;
    color: var(--primary-black);
  }

  .count {
    color: var(--gray);
    font-size: 0.85rem;
  }
`;

const PriceRange = styled.div`
  .price-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  input {
    padding: 0.5rem;
    border: 2px solid var(--off-white);
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all var(--transition-fast);

    &:focus {
      outline: none;
      border-color: var(--primary-pink);
    }
  }

  .price-slider {
    width: 100%;
    height: 6px;
    background: var(--gradient-pink);
    border-radius: 10px;
    appearance: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 18px;
      height: 18px;
      background: var(--primary-pink);
      border-radius: 50%;
      cursor: pointer;
      box-shadow: var(--shadow-md);
    }
  }
`;

const ClearButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border: 2px solid var(--primary-pink);
  background: transparent;
  color: var(--primary-pink);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--gradient-pink);
    color: var(--white);
    transform: translateY(-2px);
  }
`;

const MainContent = styled.div`
  animation: fadeInUp 0.8s ease;
`;

const ShopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-black);
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ResultCount = styled.span`
  color: var(--gray);
  font-size: 0.95rem;
`;

const SortSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid var(--off-white);
  border-radius: 10px;
  background: var(--white);
  color: var(--primary-black);
  font-size: 0.95rem;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:focus {
    outline: none;
    border-color: var(--primary-pink);
  }

  &:hover {
    border-color: var(--primary-pink);
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const NoProducts = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  color: var(--gray);

  i {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: var(--primary-pink);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--primary-black);
  }
`;

const Shop = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('featured');

  // Load products from both static data and localStorage
  useEffect(() => {
    const dynamicProducts = JSON.parse(localStorage.getItem('zoiesProducts') || '[]');
    const allProducts = [...staticProducts, ...dynamicProducts];
    setProducts(allProducts);
  }, []);

  // Get unique categories with counts
  const categories = [...new Set(products.map(p => p.category))].map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length
  }));

  // Filter products
  let filteredProducts = products;

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      selectedCategories.includes(p.category)
    );
  }

  filteredProducts = filteredProducts.filter(p => 
    p.price >= priceRange.min && p.price <= priceRange.max
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 1000 });
    setSortBy('featured');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <ShopWrapper>
      <div className="container">
        <ShopContainer>
          <Sidebar>
            <FilterSection>
              <h3><i className="fas fa-filter"></i> Categories</h3>
              <CategoryList>
                {categories.map(cat => (
                  <CategoryItem key={cat.name}>
                    <input 
                      type="checkbox"
                      id={`category-${cat.name}`}
                      name={`category-${cat.name}`}
                      checked={selectedCategories.includes(cat.name)}
                      onChange={() => handleCategoryChange(cat.name)}
                    />
                    <span>{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}</span>
                    <span className="count">({cat.count})</span>
                  </CategoryItem>
                ))}
              </CategoryList>
            </FilterSection>

            <FilterSection>
              <h3><i className="fas fa-dollar-sign"></i> Price Range</h3>
              <PriceRange>
                <div className="price-inputs">
                  <input 
                    type="number" 
                    id="price-min"
                    name="price-min"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  />
                  <input 
                    type="number" 
                    id="price-max"
                    name="price-max"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  />
                </div>
                <input 
                  type="range"
                  id="price-slider"
                  name="price-slider"
                  min="0"
                  max="1000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="price-slider"
                />
              </PriceRange>
            </FilterSection>

            {(selectedCategories.length > 0 || priceRange.min > 0 || priceRange.max < 1000) && (
              <ClearButton onClick={handleClearFilters}>
                <i className="fas fa-times"></i> Clear Filters
              </ClearButton>
            )}
          </Sidebar>

          <MainContent>
            <ShopHeader>
              <h1>Our Products</h1>
              <Controls>
                <ResultCount>{sortedProducts.length} products</ResultCount>
                <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </SortSelect>
              </Controls>
            </ShopHeader>

            <ProductsGrid>
              {sortedProducts.length > 0 ? (
                sortedProducts.map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={() => {}}
                  />
                ))
              ) : (
                <NoProducts>
                  <i className="fas fa-search"></i>
                  <h3>No products found</h3>
                  <p>Try adjusting your filters</p>
                </NoProducts>
              )}
            </ProductsGrid>
          </MainContent>
        </ShopContainer>
      </div>
    </ShopWrapper>
  );
};

export default Shop;
