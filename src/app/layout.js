import '../styles.css';
import App from '../App';

export const metadata = {
  title: 'Hanpan 한판',
  description: 'The Korean-American home for sports, the won, and predictions.',
};

export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

// The whole UI lives in <App/>, which reads the URL itself so state and the
// tab bar persist across navigations. Route pages render nothing.
export default function RootLayout() {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=IBM+Plex+Mono:wght@500;600&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <App />
      </body>
    </html>
  );
}
