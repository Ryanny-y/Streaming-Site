import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { register } from 'swiper/element/bundle';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './components/pages/Landing.jsx';
import Movies from './components/pages/Movies.jsx';
import TvSeries from './components/pages/TvSeries.jsx';

register();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: 'movies',
        element: <Movies />
      },
      {
        path: 'series',
        element: <TvSeries />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router }/>
)
