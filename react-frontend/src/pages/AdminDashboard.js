import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { products as staticProducts } from '../data/products';

const AdminWrapper = styled.div`
  min-height: 100vh;
  padding: 6rem 1rem 3rem;
  background: linear-gradient(135deg, rgba(255,127,169,0.1), rgba(255,226,236,0.3));
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInDown 0.6s ease;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    background: var(--gradient-pink);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--gray);
    font-size: 1.1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: var(--white);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: var(--shadow-3d);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all var(--transition-normal);
  animation: scaleIn 0.5s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(255, 105, 180, 0.3);
  }
`;

const StatIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 15px;
  background: ${props => props.$gradient || 'var(--gradient-pink)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--white);
  box-shadow: var(--shadow-pink);
`;

const StatInfo = styled.div`
  flex: 1;

  h3 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-black);
    margin-bottom: 0.25rem;
  }

  p {
    color: var(--gray);
    font-size: 0.95rem;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: var(--white);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: var(--shadow-3d);
  animation: fadeIn 0.6s ease;

  h2 {
    font-size: 1.5rem;
    color: var(--primary-black);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      color: var(--primary-pink);
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: var(--off-white);
    
    th {
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      color: var(--primary-black);
      font-size: 0.9rem;
      border-radius: 8px;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid var(--off-white);
      transition: background var(--transition-fast);

      &:hover {
        background: rgba(255, 105, 180, 0.05);
      }

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: 1rem;
      color: var(--primary-black);
      font-size: 0.9rem;
    }
  }
`;

const Badge = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;

  &.pending {
    background: #fff3cd;
    color: #856404;
  }

  &.processing {
    background: #cfe2ff;
    color: #084298;
  }

  &.shipped {
    background: #d1e7dd;
    color: #0f5132;
  }

  &.delivered {
    background: #d1e7dd;
    color: #0f5132;
  }
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: var(--gradient-pink);
  color: var(--white);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-pink);
  }

  &.secondary {
    background: var(--off-white);
    color: var(--primary-black);

    &:hover {
      background: var(--primary-pink);
      color: var(--white);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: var(--gray);

  i {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.3;
  }

  p {
    font-size: 1.1rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
`;

const Modal = styled.div`
  background: var(--white);
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: scaleIn 0.3s ease;
  max-height: 90vh;
  overflow-y: auto;

  h2 {
    font-size: 1.8rem;
    color: var(--primary-black);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      color: var(--primary-pink);
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-weight: 600;
    color: var(--primary-black);
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.9rem;
    border: 2px solid var(--off-white);
    border-radius: 10px;
    font-size: 1rem;
    font-family: inherit;
    transition: all var(--transition-fast);

    &:focus {
      outline: none;
      border-color: var(--primary-pink);
      box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
    }

    &::placeholder {
      color: var(--gray);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.9rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;

  &.primary {
    background: var(--gradient-pink);
    color: var(--white);
    box-shadow: var(--shadow-pink);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 105, 180, 0.4);
    }
  }

  &.secondary {
    background: var(--off-white);
    color: var(--primary-black);
    border: 2px solid var(--off-white);

    &:hover {
      background: var(--white);
      border-color: var(--primary-pink);
      transform: translateY(-2px);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  border: 2px solid #28a745;
  color: #155724;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AllOrdersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const OrderCard = styled.div`
  background: var(--off-white);
  border-radius: 15px;
  padding: 1.5rem;
  border-left: 4px solid var(--primary-pink);
  transition: all var(--transition-normal);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  h4 {
    color: var(--primary-black);
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }

  p {
    margin: 0.5rem 0;
    color: var(--gray);
    font-size: 0.9rem;
  }

  .price {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--primary-pink);
    margin-top: 1rem;
  }
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const UserCard = styled.div`
  background: var(--off-white);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  transition: all var(--transition-normal);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: var(--gradient-pink);
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto 1rem;
    box-shadow: var(--shadow-pink);
  }

  h4 {
    color: var(--primary-black);
    margin: 0 0 0.5rem 0;
  }

  p {
    margin: 0.5rem 0;
    color: var(--gray);
    font-size: 0.9rem;
    word-break: break-all;
  }

  .role {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    background: var(--gradient-pink);
    color: var(--white);
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-top: 0.5rem;
  }
`;

const ChartContainer = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: var(--off-white);
  border-radius: 15px;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--white);

  &:last-child {
    border-bottom: none;
  }

  .label {
    font-weight: 600;
    color: var(--primary-black);
  }

  .value {
    font-weight: 700;
    color: var(--primary-pink);
    font-size: 1.1rem;
  }

  .bar {
    flex: 1;
    height: 8px;
    background: var(--white);
    border-radius: 4px;
    margin: 0 1rem;
    overflow: hidden;

    .fill {
      height: 100%;
      background: var(--gradient-pink);
      border-radius: 4px;
    }
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ProductManageCard = styled.div`
  background: var(--off-white);
  border-radius: 15px;
  padding: 1.5rem;
  transition: all var(--transition-normal);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .product-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 1rem;
  }

  h4 {
    color: var(--primary-black);
    margin: 0;
    font-size: 1.1rem;
    flex: 1;
  }

  .price {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--primary-pink);
    margin: 0.5rem 0;
  }

  .stock {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    margin: 0.5rem 0;

    &.in-stock {
      background: rgba(67, 233, 123, 0.2);
      color: #43e97b;
    }

    &.low-stock {
      background: rgba(255, 193, 7, 0.2);
      color: #ffc107;
    }

    &.out-of-stock {
      background: rgba(245, 87, 108, 0.2);
      color: #f5576c;
    }
  }

  p {
    margin: 0.5rem 0;
    color: var(--gray);
    font-size: 0.9rem;
  }

  .actions {
    display: flex;
    gap: 0.8rem;
    margin-top: 1rem;

    button {
      flex: 1;
      padding: 0.6rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-normal);
      font-size: 0.85rem;

      &.edit {
        background: var(--gradient-pink);
        color: var(--white);

        &:hover {
          box-shadow: var(--shadow-pink);
          transform: scale(1.05);
        }
      }

      &.delete {
        background: rgba(245, 87, 108, 0.15);
        color: #f5576c;
        border: 1px solid #f5576c;

        &:hover {
          background: #f5576c;
          color: var(--white);
        }
      }
    }
  }
`;

const OrderManageCard = styled.div`
  background: var(--off-white);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all var(--transition-normal);

  &:hover {
    box-shadow: var(--shadow-md);
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .order-id {
    font-weight: 700;
    color: var(--primary-black);
    font-size: 1.1rem;
  }

  .customer-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1rem 0;

    p {
      margin: 0;
      font-size: 0.9rem;
      color: var(--gray);

      strong {
        color: var(--primary-black);
      }
    }
  }

  .status-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 1rem;

    button {
      padding: 0.5rem 1rem;
      border: 2px solid var(--white);
      border-radius: 8px;
      background: var(--white);
      color: var(--primary-black);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-normal));
      font-size: 0.85rem;

      &:hover {
        transform: scale(1.05);
        box-shadow: var(--shadow-md);
      }

      &.active {
        background: var(--gradient-pink);
        color: var(--white);
        border-color: var(--primary-pink);
      }
    }
  }

  .order-total {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--primary-pink);
    margin-top: 1rem;
  }
`;

const DeleteConfirmation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ConfirmModal = styled.div`
  background: var(--white);
  border-radius: 15px;
  padding: 2rem;
  max-width: 400px;
  text-align: center;
  box-shadow: var(--shadow-lg);

  h3 {
    color: var(--primary-black);
    margin-bottom: 1rem;
  }

  p {
    color: var(--gray);
    margin-bottom: 2rem;
  }

  .actions {
    display: flex;
    gap: 1rem;

    button {
      flex: 1;
      padding: 0.8rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-normal));

      &.cancel {
        background: var(--white);
        color: var(--gray);
        border: 1px solid var(--white);

        &:hover {
          background: var(--off-white);
        }
      }

      &.confirm {
        background: #f5576c;
        color: var(--white);

        &:hover {
          box-shadow: 0 8px 25px rgba(245, 87, 108, 0.3);
          transform: translateY(-2px);
        }
      }
    }
  }
`;


const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Add Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    stock: ''
  });

  // Edit Product State
  const [editingProduct, setEditingProduct] = useState(null);

  // Products State
  const [products, setProducts] = useState([]);

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/');
      return;
    }

    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('zoiesOrders') || '[]');
    setOrders(savedOrders);

    // Load users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('zoiesUsers') || '[]');
    setUsers(savedUsers);

    // Load all products (static + dynamic from localStorage)
    const dynamicProducts = JSON.parse(localStorage.getItem('zoiesProducts') || '[]');
    const allProducts = [...staticProducts, ...dynamicProducts];
    setProducts(allProducts);
  }, [isAuthenticated, isAdmin, navigate]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    
    if (!productForm.name || !productForm.price || !productForm.category) {
      alert('Please fill in all required fields');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: productForm.name,
      price: parseFloat(productForm.price),
      category: productForm.category,
      description: productForm.description,
      image: productForm.image || '/Image/Zoies logo.png',
      stock: parseInt(productForm.stock) || 0,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingProducts = JSON.parse(localStorage.getItem('zoiesProducts') || '[]');
    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem('zoiesProducts', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    setSuccessMessage(`✅ Product "${productForm.name}" added successfully!`);
    setTimeout(() => {
      setProductForm({ name: '', price: '', category: '', description: '', image: '', stock: '' });
      setActiveModal(null);
      setSuccessMessage('');
    }, 1500);
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    
    if (!productForm.name || !productForm.price || !productForm.category) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if this is a static product or dynamic product
    const isStaticProduct = staticProducts.some(p => p.id === editingProduct.id);
    
    if (isStaticProduct) {
      alert('Cannot edit static products. Please contact the administrator.');
      return;
    }

    // Update only dynamic products in localStorage
    const dynamicProducts = JSON.parse(localStorage.getItem('zoiesProducts') || '[]');
    const updatedDynamic = dynamicProducts.map(product =>
      product.id === editingProduct.id
        ? {
            ...product,
            name: productForm.name,
            price: parseFloat(productForm.price),
            category: productForm.category,
            description: productForm.description,
            image: productForm.image || product.image,
            stock: parseInt(productForm.stock) || 0
          }
        : product
    );

    localStorage.setItem('zoiesProducts', JSON.stringify(updatedDynamic));
    
    // Update all products state with both static and updated dynamic
    const allProducts = [...staticProducts, ...updatedDynamic];
    setProducts(allProducts);

    setSuccessMessage(`✅ Product "${productForm.name}" updated successfully!`);
    setTimeout(() => {
      setProductForm({ name: '', price: '', category: '', description: '', image: '', stock: '' });
      setEditingProduct(null);
      setActiveModal(null);
      setSuccessMessage('');
    }, 1500);
  };

  const handleDeleteProduct = (productId) => {
    // Check if this is a static product
    const isStaticProduct = staticProducts.some(p => p.id === productId);
    
    if (isStaticProduct) {
      alert('Cannot delete static products. Please contact the administrator.');
      setDeleteConfirm(null);
      return;
    }

    // Delete only from dynamic products
    const dynamicProducts = JSON.parse(localStorage.getItem('zoiesProducts') || '[]');
    const updatedDynamic = dynamicProducts.filter(product => product.id !== productId);
    localStorage.setItem('zoiesProducts', JSON.stringify(updatedDynamic));
    
    // Update all products state
    const allProducts = [...staticProducts, ...updatedDynamic];
    setProducts(allProducts);
    
    setDeleteConfirm(null);
    setSuccessMessage('✅ Product deleted successfully!');
    setTimeout(() => setSuccessMessage(''), 1500);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image,
      stock: product.stock?.toString() || '0'
    });
    setActiveModal('editProduct');
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('zoiesOrders', JSON.stringify(updatedOrders));
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  const stats = [
    {
      icon: 'fas fa-shopping-bag',
      title: orders.length,
      label: 'Total Orders',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: 'fas fa-users',
      title: users.length,
      label: 'Total Users',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: 'fas fa-box',
      title: products.length + 8,
      label: 'Total Products',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: 'fas fa-dollar-sign',
      title: `$${orders.reduce((sum, order) => sum + (order.total || 0), 0).toFixed(2)}`,
      label: 'Total Revenue',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <AdminWrapper>
      <Container>
        <Header>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {currentUser?.username}!</p>
        </Header>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatIcon $gradient={stat.gradient}>
                <i className={stat.icon}></i>
              </StatIcon>
              <StatInfo>
                <h3>{stat.title}</h3>
                <p>{stat.label}</p>
              </StatInfo>
            </StatCard>
          ))}
        </StatsGrid>

        <DashboardGrid>
          <Card>
            <h2>
              <i className="fas fa-shopping-bag"></i>
              Recent Orders
            </h2>
            {orders.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order, index) => (
                    <tr key={index}>
                      <td>{order.orderId}</td>
                      <td>{order.firstName} {order.lastName}</td>
                      <td>${order.total?.toFixed(2) || '0.00'}</td>
                      <td>
                        <Badge className={order.status || 'pending'}>
                          {order.status || 'Pending'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <EmptyState>
                <i className="fas fa-shopping-bag"></i>
                <p>No orders yet</p>
              </EmptyState>
            )}
          </Card>

          <Card>
            <h2>
              <i className="fas fa-users"></i>
              Registered Users
            </h2>
            {users.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 5).map((user, index) => (
                    <tr key={index}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <Badge className={user.role === 'admin' ? 'processing' : 'pending'}>
                          {user.role}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <EmptyState>
                <i className="fas fa-users"></i>
                <p>No registered users yet</p>
              </EmptyState>
            )}
          </Card>
        </DashboardGrid>

        <Card style={{ marginTop: '2rem' }}>
          <h2>
            <i className="fas fa-cog"></i>
            Quick Actions
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <ActionButton onClick={() => setActiveModal('addProduct')}>
              <i className="fas fa-plus"></i>
              Add Product
            </ActionButton>
            <ActionButton className="secondary" onClick={() => setActiveModal('manageProducts')}>
              <i className="fas fa-edit"></i>
              Manage Products
            </ActionButton>
            <ActionButton className="secondary" onClick={() => setActiveModal('manageOrders')}>
              <i className="fas fa-file-invoice"></i>
              Manage Orders
            </ActionButton>
            <ActionButton className="secondary" onClick={() => setActiveModal('allOrders')}>
              <i className="fas fa-file-invoice"></i>
              View All Orders
            </ActionButton>
            <ActionButton className="secondary" onClick={() => setActiveModal('manageUsers')}>
              <i className="fas fa-users-cog"></i>
              Manage Users
            </ActionButton>
            <ActionButton className="secondary" onClick={() => setActiveModal('analytics')}>
              <i className="fas fa-chart-line"></i>
              View Analytics
            </ActionButton>
          </div>
        </Card>
      </Container>

      {/* ADD PRODUCT MODAL */}
      <ModalOverlay $isOpen={activeModal === 'addProduct'} onClick={() => setActiveModal(null)}>
        <Modal onClick={e => e.stopPropagation()}>
          {successMessage && <SuccessMessage><i className="fas fa-check-circle"></i> {successMessage}</SuccessMessage>}
          <h2><i className="fas fa-plus"></i> Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <FormGroup>
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                placeholder="e.g., Pink Beaded Bracelet"
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="price">Price ($) *</label>
              <input
                type="number"
                id="price"
                step="0.01"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                placeholder="e.g., 350"
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="Bracelets">Bracelets</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Earrings">Earrings</option>
                <option value="Scrunchies">Scrunchies</option>
                <option value="Bows">Bows</option>
                <option value="Other">Other</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label htmlFor="stock">Stock Quantity *</label>
              <input
                type="number"
                id="stock"
                value={productForm.stock}
                onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                placeholder="e.g., 10"
                required
                min="0"
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                placeholder="Enter product description"
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                id="image"
                value={productForm.image}
                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                placeholder="e.g., /Image/product-name.jpg"
              />
            </FormGroup>

            <ButtonGroup>
              <Button type="button" className="secondary" onClick={() => setActiveModal(null)}>
                <i className="fas fa-times"></i> Cancel
              </Button>
              <Button type="submit" className="primary">
                <i className="fas fa-save"></i> Add Product
              </Button>
            </ButtonGroup>
          </form>
        </Modal>
      </ModalOverlay>

      {/* VIEW ALL ORDERS MODAL */}
      <ModalOverlay $isOpen={activeModal === 'allOrders'} onClick={() => setActiveModal(null)}>
        <Modal onClick={e => e.stopPropagation()}>
          <h2><i className="fas fa-shopping-bag"></i> All Orders</h2>
          {orders.length > 0 ? (
            <AllOrdersGrid>
              {orders.map((order, index) => (
                <OrderCard key={index}>
                  <h4>{order.firstName} {order.lastName}</h4>
                  <p><strong>Order ID:</strong> {order.orderId}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Items:</strong> {order.items?.length || 0}</p>
                  <p><strong>Payment:</strong> {order.paymentMethod === 'bank-transfer' ? 'Bank Transfer' : 'Cash on Delivery'}</p>
                  <p><strong>Status:</strong> <Badge className={order.status || 'pending'}>{order.status || 'Pending'}</Badge></p>
                  <div className="price">${order.total?.toFixed(2)}</div>
                </OrderCard>
              ))}
            </AllOrdersGrid>
          ) : (
            <EmptyState>
              <i className="fas fa-shopping-bag"></i>
              <p>No orders found</p>
            </EmptyState>
          )}
          <ButtonGroup style={{ marginTop: '2rem' }}>
            <Button type="button" className="secondary" onClick={() => setActiveModal(null)}>
              <i className="fas fa-times"></i> Close
            </Button>
          </ButtonGroup>
        </Modal>
      </ModalOverlay>

      {/* MANAGE USERS MODAL */}
      <ModalOverlay $isOpen={activeModal === 'manageUsers'} onClick={() => setActiveModal(null)}>
        <Modal onClick={e => e.stopPropagation()}>
          <h2><i className="fas fa-users-cog"></i> Manage Users</h2>
          {users.length > 0 ? (
            <UserGrid>
              {users.map((user, index) => (
                <UserCard key={index}>
                  <div className="avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <h4>{user.username}</h4>
                  <p>{user.email}</p>
                  <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                  <div className="role">{user.role}</div>
                </UserCard>
              ))}
            </UserGrid>
          ) : (
            <EmptyState>
              <i className="fas fa-users"></i>
              <p>No registered users</p>
            </EmptyState>
          )}
          <ButtonGroup style={{ marginTop: '2rem' }}>
            <Button type="button" className="secondary" onClick={() => setActiveModal(null)}>
              <i className="fas fa-times"></i> Close
            </Button>
          </ButtonGroup>
        </Modal>
      </ModalOverlay>

      {/* ANALYTICS MODAL */}
      <ModalOverlay $isOpen={activeModal === 'analytics'} onClick={() => setActiveModal(null)}>
        <Modal onClick={e => e.stopPropagation()}>
          <h2><i className="fas fa-chart-line"></i> Analytics</h2>
          <ChartContainer>
            <h3 style={{ marginTop: 0, color: 'var(--primary-black)' }}>📊 Business Overview</h3>
            <StatRow>
              <div className="label">Total Orders</div>
              <div style={{ flex: 1, marginLeft: '1rem' }}>
                <div className="bar">
                  <div className="fill" style={{ width: `${Math.min(orders.length * 10, 100)}%` }}></div>
                </div>
              </div>
              <div className="value">{orders.length}</div>
            </StatRow>

            <StatRow>
              <div className="label">Total Revenue</div>
              <div style={{ flex: 1, marginLeft: '1rem' }}>
                <div className="bar">
                  <div className="fill" style={{ width: `${Math.min((orders.reduce((sum, order) => sum + (order.total || 0), 0)) / 50, 100)}%` }}></div>
                </div>
              </div>
              <div className="value">${orders.reduce((sum, order) => sum + (order.total || 0), 0).toFixed(2)}</div>
            </StatRow>

            <StatRow>
              <div className="label">Registered Users</div>
              <div style={{ flex: 1, marginLeft: '1rem' }}>
                <div className="bar">
                  <div className="fill" style={{ width: `${Math.min(users.length * 5, 100)}%` }}></div>
                </div>
              </div>
              <div className="value">{users.length}</div>
            </StatRow>

            <StatRow>
              <div className="label">Avg Order Value</div>
              <div style={{ flex: 1, marginLeft: '1rem' }}>
                <div className="bar">
                  <div className="fill" style={{ width: `${Math.min((orders.reduce((sum, order) => sum + (order.total || 0), 0) / orders.length) / 10, 100)}%` }}></div>
                </div>
              </div>
              <div className="value">${orders.length > 0 ? (orders.reduce((sum, order) => sum + (order.total || 0), 0) / orders.length).toFixed(2) : '0.00'}</div>
            </StatRow>

            <StatRow>
              <div className="label">Pending Orders</div>
              <div style={{ flex: 1, marginLeft: '1rem' }}>
                <div className="bar">
                  <div className="fill" style={{ width: `${Math.min(orders.filter(o => o.status === 'pending').length * 20, 100)}%` }}></div>
                </div>
              </div>
              <div className="value">{orders.filter(o => o.status === 'pending').length}</div>
            </StatRow>

            <StatRow>
              <div className="label">Processing Orders</div>
              <div style={{ flex: 1, marginLeft: '1rem' }}>
                <div className="bar">
                  <div className="fill" style={{ width: `${Math.min(orders.filter(o => o.status === 'processing').length * 20, 100)}%` }}></div>
                </div>
              </div>
              <div className="value">{orders.filter(o => o.status === 'processing').length}</div>
            </StatRow>

            <StatRow>
              <div className="label">Shipped Orders</div>
              <div style={{ flex: 1, marginLeft: '1rem' }}>
                <div className="bar">
                  <div className="fill" style={{ width: `${Math.min(orders.filter(o => o.status === 'shipped').length * 20, 100)}%` }}></div>
                </div>
              </div>
              <div className="value">{orders.filter(o => o.status === 'shipped').length}</div>
            </StatRow>
          </ChartContainer>
          <ButtonGroup style={{ marginTop: '2rem' }}>
            <Button type="button" className="secondary" onClick={() => setActiveModal(null)}>
              <i className="fas fa-times"></i> Close
            </Button>
          </ButtonGroup>
        </Modal>
      </ModalOverlay>

      {/* EDIT PRODUCT MODAL */}
      <ModalOverlay $isOpen={activeModal === 'editProduct'} onClick={() => setActiveModal(null)}>
        <Modal onClick={e => e.stopPropagation()}>
          {successMessage && <SuccessMessage><i className="fas fa-check-circle"></i> {successMessage}</SuccessMessage>}
          <h2><i className="fas fa-edit"></i> Edit Product</h2>
          <form onSubmit={handleEditProduct}>
            <FormGroup>
              <label htmlFor="edit-name">Product Name *</label>
              <input
                type="text"
                id="edit-name"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                placeholder="e.g., Pink Beaded Bracelet"
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="edit-price">Price ($) *</label>
              <input
                type="number"
                id="edit-price"
                step="0.01"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                placeholder="e.g., 350"
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="edit-category">Category *</label>
              <select
                id="edit-category"
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="Bracelets">Bracelets</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Earrings">Earrings</option>
                <option value="Scrunchies">Scrunchies</option>
                <option value="Bows">Bows</option>
                <option value="Other">Other</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label htmlFor="edit-stock">Stock Quantity *</label>
              <input
                type="number"
                id="edit-stock"
                value={productForm.stock}
                onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                placeholder="e.g., 10"
                required
                min="0"
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="edit-description">Description</label>
              <textarea
                id="edit-description"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                placeholder="Enter product description"
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="edit-image">Image URL</label>
              <input
                type="text"
                id="edit-image"
                value={productForm.image}
                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                placeholder="e.g., /Image/product-name.jpg"
              />
            </FormGroup>

            <ButtonGroup>
              <Button type="button" className="secondary" onClick={() => { setEditingProduct(null); setActiveModal(null); }}>
                <i className="fas fa-times"></i> Cancel
              </Button>
              <Button type="submit" className="primary">
                <i className="fas fa-save"></i> Update Product
              </Button>
            </ButtonGroup>
          </form>
        </Modal>
      </ModalOverlay>

      {/* MANAGE PRODUCTS MODAL */}
      <ModalOverlay $isOpen={activeModal === 'manageProducts'} onClick={() => setActiveModal(null)}>
        <Modal onClick={e => e.stopPropagation()}>
          <h2><i className="fas fa-edit"></i> Manage Products</h2>
          {products.length > 0 ? (
            <ProductGrid>
              {products.map((product) => (
                <ProductManageCard key={product.id}>
                  <div className="product-header">
                    <h4>{product.name}</h4>
                  </div>
                  <p><strong>Category:</strong> {product.category}</p>
                  <div className="price">${product.price.toFixed(2)}</div>
                  <span className={`stock ${product.stock > 5 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
                    {product.stock > 0 ? (product.stock <= 5 ? `Low Stock (${product.stock})` : `In Stock (${product.stock})`) : 'Out of Stock'}
                  </span>
                  {product.description && <p><strong>Description:</strong> {product.description}</p>}
                  <div className="actions">
                    <button className="edit" onClick={() => openEditModal(product)}>
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button className="delete" onClick={() => setDeleteConfirm(product.id)}>
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </div>
                </ProductManageCard>
              ))}
            </ProductGrid>
          ) : (
            <EmptyState>
              <i className="fas fa-box"></i>
              <p>No products to manage</p>
            </EmptyState>
          )}
          <ButtonGroup style={{ marginTop: '2rem' }}>
            <Button type="button" className="secondary" onClick={() => setActiveModal(null)}>
              <i className="fas fa-times"></i> Close
            </Button>
          </ButtonGroup>
        </Modal>
      </ModalOverlay>

      {/* MANAGE ORDERS MODAL */}
      <ModalOverlay $isOpen={activeModal === 'manageOrders'} onClick={() => setActiveModal(null)}>
        <Modal onClick={e => e.stopPropagation()} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <h2><i className="fas fa-file-invoice"></i> Manage Orders</h2>
          {orders.length > 0 ? (
            <div>
              {orders.map((order, index) => (
                <OrderManageCard key={index}>
                  <div className="order-header">
                    <span className="order-id">Order #{order.orderId}</span>
                  </div>
                  <div className="customer-info">
                    <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Phone:</strong> {order.phone}</p>
                    <p><strong>Items:</strong> {order.items?.length || 0}</p>
                  </div>
                  <div className="status-buttons">
                    <button
                      className={order.status === 'pending' ? 'active' : ''}
                      onClick={() => handleUpdateOrderStatus(order.orderId, 'pending')}
                    >
                      <i className="fas fa-hourglass-start"></i> Pending
                    </button>
                    <button
                      className={order.status === 'processing' ? 'active' : ''}
                      onClick={() => handleUpdateOrderStatus(order.orderId, 'processing')}
                    >
                      <i className="fas fa-cogs"></i> Processing
                    </button>
                    <button
                      className={order.status === 'shipped' ? 'active' : ''}
                      onClick={() => handleUpdateOrderStatus(order.orderId, 'shipped')}
                    >
                      <i className="fas fa-truck"></i> Shipped
                    </button>
                    <button
                      className={order.status === 'delivered' ? 'active' : ''}
                      onClick={() => handleUpdateOrderStatus(order.orderId, 'delivered')}
                    >
                      <i className="fas fa-check-circle"></i> Delivered
                    </button>
                  </div>
                  <div className="order-total">Total: ${order.total?.toFixed(2)}</div>
                </OrderManageCard>
              ))}
            </div>
          ) : (
            <EmptyState>
              <i className="fas fa-shopping-bag"></i>
              <p>No orders to manage</p>
            </EmptyState>
          )}
          <ButtonGroup style={{ marginTop: '2rem' }}>
            <Button type="button" className="secondary" onClick={() => setActiveModal(null)}>
              <i className="fas fa-times"></i> Close
            </Button>
          </ButtonGroup>
        </Modal>
      </ModalOverlay>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <DeleteConfirmation>
          <ConfirmModal>
            <h3><i className="fas fa-exclamation-triangle"></i> Delete Product?</h3>
            <p>Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="actions">
              <button className="cancel" onClick={() => setDeleteConfirm(null)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="confirm" onClick={() => handleDeleteProduct(deleteConfirm)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </ConfirmModal>
        </DeleteConfirmation>
      )}
    </AdminWrapper>
  );
};

export default AdminDashboard;
