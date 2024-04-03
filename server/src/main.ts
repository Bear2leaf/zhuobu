import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css'
import App from './components/App'


const root = createRoot(
  document.getElementById('root') as HTMLElement,
)

root.render(App())