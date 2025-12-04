import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-pink: #ff69b4;
    --secondary-pink: #ff1493;
    --light-pink: #ffb6c1;
    --pale-pink: #ffe4e9;
    --dark-pink: #c71585;
    
    --primary-black: #1a1a1a;
    --secondary-black: #2d2d2d;
    --light-black: #404040;
    
    --white: #ffffff;
    --off-white: #f8f9fa;
    --light-gray: #e9ecef;
    --gray: #6c757d;
    
    --gradient-pink: linear-gradient(135deg, #ff69b4 0%, #ff1493 100%);
    --gradient-pink-light: linear-gradient(135deg, #ffb6c1 0%, #ff69b4 100%);
    --gradient-dark: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
    
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.2);
    --shadow-pink: 0 8px 24px rgba(255, 105, 180, 0.4);
    --shadow-3d: 0 10px 40px rgba(255, 105, 180, 0.3);
    
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: var(--off-white);
    color: var(--primary-black);
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: var(--transition-normal);
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
  }

  ::selection {
    background: var(--primary-pink);
    color: var(--white);
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--light-gray);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gradient-pink);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--gradient-pink-light);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes float3d {
    0%, 100% {
      transform: perspective(1000px) translateY(0) rotateX(0);
    }
    50% {
      transform: perspective(1000px) translateY(-15px) rotateX(5deg);
    }
  }

  .animate-fade-in { animation: fadeIn 0.6s ease; }
  .animate-fade-up { animation: fadeInUp 0.8s ease; }
  .animate-slide-left { animation: slideInLeft 0.8s ease; }
  .animate-slide-right { animation: slideInRight 0.8s ease; }
  .animate-scale { animation: scaleIn 0.6s ease; }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 0.75rem;
    }
  }

  @media (max-width: 320px) {
    .container {
      padding: 0 0.5rem;
    }

    * {
      font-size: 14px;
    }
  }

  .gradient-text {
    background: var(--gradient-pink);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;
