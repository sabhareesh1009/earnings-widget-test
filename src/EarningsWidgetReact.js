import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const EarningsWidgetReact = ({
  apiKey = 'f090a778d74f4450a11ad417ad72740c',
  title = 'Earnings Calendar',
  logo = 'BZ',
  daysToShow = 5,
  height = '600px',
  width = '100%',
}) => {
  const containerRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Load the web component script if it hasn't been loaded yet
  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[src*="earnings-widget.js"]')) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/sabhareesh1009/benzinga-project/dist/webcomponent/earnings-widget.js';
    script.async = true;
    
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    
    document.head.appendChild(script);

    return () => {
      // Cleanup function - we don't remove the script as it might be used by other instances
    };
  }, []);

  // This effect handles both creation and updates
  useEffect(() => {
    if (!isScriptLoaded || !containerRef.current) return;

    // Clear any existing content
    containerRef.current.innerHTML = '';
    
    // Create a completely new instance with all the current props
    const widgetElement = document.createElement('benzinga-earnings-widget');
    
    // Set all attributes
    widgetElement.setAttribute('api-key', apiKey);
    widgetElement.setAttribute('title', title);
    widgetElement.setAttribute('logo', logo);
    widgetElement.setAttribute('days-to-show', daysToShow.toString());
    
    // Append to container
    containerRef.current.appendChild(widgetElement);
    
    // Return cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [isScriptLoaded, apiKey, title, logo, daysToShow]); // Re-run when any prop changes

  return (
    <div 
      ref={containerRef} 
      style={{ width, height }}
      className="earnings-widget-container"
    >
      {!isScriptLoaded && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Loading Earnings Widget...
        </div>
      )}
    </div>
  );
};

EarningsWidgetReact.propTypes = {
  apiKey: PropTypes.string,
  title: PropTypes.string,
  logo: PropTypes.string,
  daysToShow: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default EarningsWidgetReact;
