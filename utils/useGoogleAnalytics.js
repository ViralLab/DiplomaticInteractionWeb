import { useEffect } from 'react';
import { useRouter } from 'next/router'; // If using Next.js
// OR import { useLocation } from 'react-router-dom'; // If using React Router

export const useGoogleAnalytics = () => {
  const router = useRouter(); // For Next.js
  // OR const location = useLocation(); // For React Router

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('config', 'G-4QY8YT7STT', {
          page_path: url,
        });
      }
    };

    // For Next.js
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
    
    // For React Router
    // handleRouteChange(location.pathname + location.search);
  }, [router]); // or [location] for React Router
}; 