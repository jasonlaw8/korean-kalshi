// Standalone entry used to bundle the demo into a single page (scripts/build-demo.mjs).
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')).render(<App />);
