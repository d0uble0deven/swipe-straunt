import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// import ErrorBoundary from './ErrorBoundary';

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
      <App />
    {/* </ErrorBoundary> */}
  </React.StrictMode>
)
