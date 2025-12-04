import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ReviewsWrapper = styled.div`
  margin-top: 120px;
  padding: 3rem 0;
`;

const Hero = styled.section`
  padding: 3rem 0;
  background: linear-gradient(120deg, rgba(255,127,169,0.08), rgba(255,226,236,0.3));
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  animation: fadeInUp 0.8s ease;

  h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    margin-bottom: 1rem;
    color: var(--primary-black);
  }

  p {
    font-size: 1.1rem;
    color: var(--gray);
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 3rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  background: var(--white);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }

  .number {
    font-size: 3rem;
    font-weight: 800;
    background: var(--gradient-pink);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .label {
    font-size: 1rem;
    color: var(--gray);
    margin-top: 0.5rem;
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const ReviewCard = styled.div`
  background: var(--white);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;

  &::before {
    content: '"';
    position: absolute;
    top: -20px;
    left: 20px;
    font-size: 8rem;
    color: rgba(255, 105, 180, 0.1);
    font-family: Georgia, serif;
    line-height: 1;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const ReviewerImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--gradient-pink);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 1.5rem;
  font-weight: 600;
  flex-shrink: 0;
`;

const ReviewerInfo = styled.div`
  flex: 1;

  .name {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--primary-black);
    margin-bottom: 0.25rem;
  }

  .date {
    font-size: 0.85rem;
    color: var(--gray);
  }
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;

  i {
    color: #ffc107;
    font-size: 1.1rem;
  }

  .empty {
    color: #ddd;
  }
`;

const ReviewText = styled.p`
  font-size: 1rem;
  color: var(--gray);
  line-height: 1.7;
  position: relative;
  z-index: 1;
`;

const ProductTag = styled.span`
  display: inline-block;
  padding: 0.35rem 0.75rem;
  background: rgba(255, 105, 180, 0.1);
  color: var(--primary-pink);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 1rem;
`;

const WriteReviewSection = styled.section`
  background: var(--off-white);
  padding: 3rem 0;
  margin-top: 3rem;
`;

const WriteReviewForm = styled.form`
  max-width: 700px;
  margin: 0 auto;
  background: var(--white);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: var(--shadow-lg);
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--primary-black);
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--primary-black);
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  border: 2px solid var(--off-white);
  border-radius: 10px;
  font-size: 1rem;
  transition: all var(--transition-fast);
  background: var(--off-white);

  &:focus {
    outline: none;
    border-color: var(--primary-pink);
    background: var(--white);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.9rem 1rem;
  border: 2px solid var(--off-white);
  border-radius: 10px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  resize: vertical;
  min-height: 120px;
  transition: all var(--transition-fast);
  background: var(--off-white);

  &:focus {
    outline: none;
    border-color: var(--primary-pink);
    background: var(--white);
  }
`;

const StarRatingInput = styled.div`
  display: flex;
  gap: 0.5rem;

  i {
    font-size: 2rem;
    color: #ddd;
    cursor: pointer;
    transition: all var(--transition-fast);

    &.active,
    &:hover {
      color: #ffc107;
      transform: scale(1.2);
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--gradient-pink);
  color: var(--white);
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-pink);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(255, 105, 180, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    review: ''
  });

  const staticReviews = [
    {
      id: 1,
      name: 'Jessica Brown',
      initial: 'J',
      date: 'January 15, 2024',
      rating: 5,
      product: 'Pink Beaded Bracelet',
      text: 'Absolutely love this bracelet! The quality is amazing and it matches everything. I\'ve already ordered two more for my friends. Highly recommend!'
    },
    {
      id: 2,
      name: 'Michael Chen',
      initial: 'M',
      date: 'January 10, 2024',
      rating: 5,
      product: 'Silk Scrunchies',
      text: 'These scrunchies are so soft and don\'t damage my hair at all. Perfect for sensitive hair. The colors are vibrant and beautiful!'
    },
    {
      id: 3,
      name: 'Sarah Williams',
      initial: 'S',
      date: 'January 8, 2024',
      rating: 4,
      product: 'Custom Jewelry',
      text: 'Beautiful custom piece! The attention to detail is impressive. Delivery was quick too. Would definitely order again.'
    },
    {
      id: 4,
      name: 'Emily Taylor',
      initial: 'E',
      date: 'January 5, 2024',
      rating: 5,
      product: 'Elegant Silk Bow',
      text: 'This bow is stunning! Perfect for special occasions. The silk material feels luxurious. Worth every penny!'
    },
    {
      id: 5,
      name: 'David Martinez',
      initial: 'D',
      date: 'December 28, 2023',
      rating: 5,
      product: 'Purple Beaded Bracelet',
      text: 'Bought this as a gift for my sister and she absolutely loves it! The packaging was beautiful and the quality exceeded expectations.'
    },
    {
      id: 6,
      name: 'Amanda Johnson',
      initial: 'A',
      date: 'December 20, 2023',
      rating: 5,
      product: 'Bright Colored Bracelet',
      text: 'These colors are so vibrant and fun! I get compliments every time I wear this bracelet. Great quality and fast shipping!'
    }
  ];

  const [userReviews, setUserReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    // Load user reviews from localStorage
    const savedReviews = JSON.parse(localStorage.getItem('zoiesReviews') || '[]');
    setUserReviews(savedReviews);
    
    // Combine static and user reviews
    const combined = [...savedReviews, ...staticReviews];
    setAllReviews(combined);
  }, []);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    // Create new review
    const newReview = {
      id: Date.now(),
      name: formData.name,
      initial: formData.name.charAt(0).toUpperCase(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      rating: rating,
      product: formData.product,
      text: formData.review
    };

    // Save to localStorage
    const updatedUserReviews = [newReview, ...userReviews];
    localStorage.setItem('zoiesReviews', JSON.stringify(updatedUserReviews));
    setUserReviews(updatedUserReviews);
    
    // Update all reviews
    const updatedAllReviews = [newReview, ...allReviews];
    setAllReviews(updatedAllReviews);

    // Reset form
    setFormData({ name: '', email: '', product: '', review: '' });
    setRating(0);
    
    // Show success message
    alert('Thank you for your review! ✨');
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <i 
        key={index}
        className={`fas fa-star ${index < rating ? '' : 'empty'}`}
      />
    ));
  };

  return (
    <ReviewsWrapper>
      <Hero>
        <div className="container">
          <HeroContent>
            <h1>Customer <span className="gradient-text">Reviews</span></h1>
            <p>See what our happy customers are saying about us!</p>
          </HeroContent>
        </div>
      </Hero>

      <div className="container">
        <Stats>
          <StatCard>
            <div className="number">500+</div>
            <div className="label">Happy Customers</div>
          </StatCard>
          <StatCard>
            <div className="number">4.9</div>
            <div className="label">Average Rating</div>
          </StatCard>
          <StatCard>
            <div className="number">98%</div>
            <div className="label">Satisfaction Rate</div>
          </StatCard>
        </Stats>

        <ReviewsGrid>
          {allReviews.map(review => (
            <ReviewCard key={review.id}>
              <ReviewHeader>
                <ReviewerImage>{review.initial}</ReviewerImage>
                <ReviewerInfo>
                  <div className="name">{review.name}</div>
                  <div className="date">{review.date}</div>
                </ReviewerInfo>
              </ReviewHeader>
              <StarRating>{renderStars(review.rating)}</StarRating>
              <ReviewText>{review.text}</ReviewText>
              <ProductTag>{review.product}</ProductTag>
            </ReviewCard>
          ))}
        </ReviewsGrid>
      </div>

      <WriteReviewSection>
        <div className="container">
          <WriteReviewForm onSubmit={handleSubmit}>
            <FormTitle>Write a Review</FormTitle>
            
            <FormGroup>
              <Label>Your Rating *</Label>
              <StarRatingInput>
                {[1, 2, 3, 4, 5].map((value) => (
                  <i
                    key={value}
                    className={`fas fa-star ${value <= (hoveredRating || rating) ? 'active' : ''}`}
                    onClick={() => handleRatingClick(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                  />
                ))}
              </StarRatingInput>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="name">Your Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                autoComplete="name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Your Email *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="product">Product *</Label>
              <Input
                type="text"
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="Which product are you reviewing?"
                autoComplete="off"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="review">Your Review *</Label>
              <TextArea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleChange}
                placeholder="Share your experience..."
                required
              />
            </FormGroup>

            <SubmitButton type="submit">
              <i className="fas fa-paper-plane"></i> Submit Review
            </SubmitButton>
          </WriteReviewForm>
        </div>
      </WriteReviewSection>
    </ReviewsWrapper>
  );
};

export default Reviews;
