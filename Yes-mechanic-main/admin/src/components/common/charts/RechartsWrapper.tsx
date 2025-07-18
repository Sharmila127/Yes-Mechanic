// Recharts wrapper to ensure React is available before loading charts
import '../../../react-shim'; // Ensure React shim is loaded first

// Re-export Recharts components with React shim loaded
export * from 'recharts';