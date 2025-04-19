import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const EarningsWidgetReact = ({
  apiKey = 'f090a778d74f4450a11ad417ad72740c',
  title = 'Earnings Calendar',
  logo = 'BZ',
  daysToShow = 5,
  quarter = 'Q1',
  height = '600px',
  width = '100%',
}) => {
  const containerRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  // Use a key to force re-render of the container when props change
  const [key, setKey] = useState(0);

  // Load the web component script if it hasn't been loaded yet
  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[src*="earnings-widget.js"]')) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    // Use specific commit hash to bypass CDN caching
    script.src = 'https://cdn.jsdelivr.net/gh/sabhareesh1009/benzinga-project@v1.1.1/dist/webcomponent/earnings-widget.js';
    script.async = true;
    
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    
    document.head.appendChild(script);
  }, []);

  // Force re-render when props change
  useEffect(() => {
    if (isScriptLoaded) {
      // Increment key to force container re-render
      setKey(prevKey => prevKey + 1);
    }
  }, [isScriptLoaded, apiKey, title, logo, daysToShow, quarter]);

  // Create and setup the web component
  const setupWebComponent = useCallback(() => {
    if (!containerRef.current) return;
    
    // Clear any existing content
    containerRef.current.innerHTML = '';
    
    // Create a new web component instance
    const widgetElement = document.createElement('benzinga-earnings-widget');
    
    // Set all attributes
    if (apiKey) widgetElement.setAttribute('api-key', apiKey);
    if (title) widgetElement.setAttribute('title', title);
    if (logo) widgetElement.setAttribute('logo', logo);
    widgetElement.setAttribute('days-to-show', daysToShow.toString());
    widgetElement.setAttribute('quarter', quarter);
    
    // Append to container
    containerRef.current.appendChild(widgetElement);
  }, [apiKey, daysToShow, logo, quarter, title]);

  // Create the web component when the container is rendered or key changes
  useEffect(() => {
    // Skip if script isn't loaded
    if (!isScriptLoaded) return;

    // Setup the web component
    setupWebComponent();
    
    // No cleanup needed as we'll completely replace the content on next render
  }, [isScriptLoaded, key, setupWebComponent]);

  return (
    <div 
      key={key} // Key forces re-creation of this div when props change
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
  quarter: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default EarningsWidgetReact;
