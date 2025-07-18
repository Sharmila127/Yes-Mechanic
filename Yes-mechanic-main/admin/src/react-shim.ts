// React compatibility shim for libraries that expect React to be globally available
import * as React from 'react';

// Immediately make React available globally to prevent initialization issues
const makeReactGlobal = () => {
  const reactInstance = React;
  
  // Ensure React is available in all possible global contexts
  if (typeof window !== 'undefined') {
    (window as any).React = reactInstance;
    // Also ensure it's available on the global object
    if (typeof (window as any).global === 'undefined') {
      (window as any).global = window;
    }
    (window as any).global.React = reactInstance;
  }

  // Make it available on globalThis for Node.js environments
  if (typeof globalThis !== 'undefined') {
    (globalThis as any).React = reactInstance;
  }

  // Also make it available on the global object if it exists
  try {
    const globalObj = (globalThis as any).global;
    if (globalObj) {
      globalObj.React = reactInstance;
    }
  } catch (e) {
    // Ignore if global is not available
  }

  return reactInstance;
};

// Execute immediately
const reactGlobal = makeReactGlobal();

export default reactGlobal;