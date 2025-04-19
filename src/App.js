import React, { useState } from 'react';
import EarningsWidgetReact from './EarningsWidgetReact';

/**
 * Sample React application that demonstrates how to use the Earnings Widget
 */
function App() {
  const [title, setTitle] = useState('Earnings Calendar');
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>React Integration Example</h1>
        <p>This demonstrates how to use the Benzinga Earnings Widget in a React application</p>
      </header>
      
      <div className="controls">        
        <div className="control-group">
          <label htmlFor="title">Widget Title:</label>
          <input 
            id="title" 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      
      <div className="widget-container">
        <EarningsWidgetReact 
          title={title}
          height="600px"
        />
      </div>
    </div>
  );
}

export default App;
