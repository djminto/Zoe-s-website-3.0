import styled from 'styled-components';

const Badge = styled.span`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

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
`;

const StockBadge = ({ stock }) => {
  if (stock === undefined || stock === null) {
    return <Badge className="in-stock">In Stock</Badge>;
  }

  if (stock > 5) {
    return <Badge className="in-stock">✓ In Stock</Badge>;
  } else if (stock > 0) {
    return <Badge className="low-stock">⚠ Low Stock ({stock})</Badge>;
  } else {
    return <Badge className="out-of-stock">✗ Out of Stock</Badge>;
  }
};

export default StockBadge;
