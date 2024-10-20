import { useEffect, useState } from "react"
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

const SignUp = () => {
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ signedIn, setSignedIn ] = useState(false);
  const setMessage = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(signedIn) {
      navigate('/login');
    }
  }, [signedIn])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!username || !password || !email) {
      alert('All Fields are Required!');
      return;
    }
    
    const BC_URL = import.meta.env.VITE_BC_URL;

    try {
      const response = await fetch(`${BC_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          username, 
          email,
          password
        })
      })

      if(!response.ok) {
        const errData = await response.json();
        const errMsg = errData.message || errData.statusText;
        throw new Error(errMsg);
      }

      const data = await response.json();
      setMessage(data.message);

      setUsername('');
      setEmail('');
      setPassword('');

      setTimeout(() => {
        setSignedIn(true);
      }, 2000);

    } catch (error) {
      setMessage(error.message);
    }

  }

  return (
    <main className="text-white">
      <div className="container flex flex-col gap-1 items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-4/5 mx-auto py-10">
          <h1 className="text-3xl font-semibold">Sign Up</h1>

          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="rounded-md bg-transparent w-full h-full px-4 py-3 text-lg text-white outline-none placeholder:text-white  placeholder:opacity-90"
            style={{ background: "#808080" }}
          />

          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-md bg-transparent w-full h-full px-4 py-3 text-lg text-white outline-none placeholder:text-white  placeholder:opacity-90"
            style={{ background: "#808080" }}
          />

          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-md bg-transparent w-full h-full px-4 py-3 text-lg text-white outline-none placeholder:text-white  placeholder:opacity-90"
            style={{ background: "#808080" }}
          />

          <button className="bg-red-500 py-3 rounded-md">Sign Up</button>
        </form>


        <p className="text-lg">or</p>

        <div className="w-4/5 mx-auto flex flex-col gap-7">
          <h1 className="text-3xl font-semibold">Sign In With</h1>

          <button className="border border-white border-opacity-70 py-4 text-xl font-medium">Google</button>

        </div>

        <div className="mt-10 w-4/5 mx-auto flex flex-wrap gap-2">
          <h1 className="opacity-80">Already have an Account?</h1>
          <Link to={'/login'}>Sign In</Link>
        </div>

      </div>
    </main>

  )
}

export default SignUp