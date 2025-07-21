import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='text-white container grow text-center gap-5 flex flex-col items-center justify-center' style={{ height: '450px'}}>
      <h1 className='font-bold text-6xl sm:text-7xl'>404 Not found</h1>
      <p>We're sorry. We can't find the page you're looking for.</p>
      <Link to='/' className='text-red-600 hover:text-lg duration-300'>Go to Home Page</Link>
    </div>
  )
}

export default NotFound