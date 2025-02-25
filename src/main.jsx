import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './Redux/Store.jsx';
import "antd/dist/reset.css";  // ✅ Ant Design CSS Import 

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  
 
)
