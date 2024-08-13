import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Import service worker registration
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

// import ErrorBoundary from './ErrorBoundary';

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
    <App />
    {/* </ErrorBoundary> */}
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register() //change the service worker registration from 'unregistered' to 'registered'
