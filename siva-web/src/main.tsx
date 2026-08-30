import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
      <App />
    </MotionConfig>
  </StrictMode>
);