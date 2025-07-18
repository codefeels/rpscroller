import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from './App'

import './index.css'

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <HashRouter>
    <App />
  </HashRouter>,
)
