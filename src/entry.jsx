// Entry for the single-file preview build (scripts/build-app.mjs).
import { createRoot } from 'react-dom/client';
import { NavProvider } from './lib/nav';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <NavProvider>
    <App />
  </NavProvider>,
);
