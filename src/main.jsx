import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { register } from 'swiper/element/bundle';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './components/pages/Landing.jsx';
import Movies from './components/pages/Movies.jsx';
import TvSeries from './components/pages/TvSeries.jsx';
import Genres from './components/pages/Genres.jsx';
import Countries from './components/pages/Countries.jsx'
import NotFound from './components/pages/NotFound.jsx';

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
      },
      {
        path: 'genres',
        element: <Genres />
      },
      {
        path: 'countries',
        element: <Countries />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router }/>
)
