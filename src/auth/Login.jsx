import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  
  const { setUserData, setAccessToken, userData, accessToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    if(Object.keys.length && accessToken) {
      navigate('/');
    }
  }, [accessToken, userData])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!username || !password) {
      alert('Username and Password are required!');
      return;
    }

    const BC_URL = import.meta.env.VITE_BC_URL;
    try {
      const response = await fetch(`${BC_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })

      if(!response.ok) {
        const errData = await response.json();
        const errMsg = errData.message || errData.statusText;
        throw new Error(errMsg);
      }

      const data = await response.json();
      setUserData(data.user_data)
      setAccessToken(data.access_token);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="text-white">
      <section className="container flex flex-col gap-1 items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-4/5 mx-auto py-10">
          <h1 className="text-3xl font-semibold">Login</h1>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="rounded-md bg-transparent w-full h-full px-4 py-3 text-lg text-white outline-none placeholder:text-white  placeholder:opacity-90"
            style={{ background: "#808080" }}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-md bg-transparent w-full h-full px-4 py-3 text-lg text-white outline-none placeholder:text-white  placeholder:opacity-90"
            style={{ background: "#808080" }}
          />

          <button className="bg-red-500 py-3 rounded-md">Sign In</button>
        </form>

        <p className="text-lg">or</p>

        <div className="w-4/5 mx-auto flex flex-col gap-7">
          <h1 className="text-3xl font-semibold">Sign In With</h1>

          <button className="border border-white border-opacity-70 py-4 text-xl font-medium">Google</button>

        </div>

        <div className="mt-10 w-4/5 mx-auto flex flex-wrap gap-2">
          <h1 className="opacity-80">Don't Have an account?</h1>
          <Link>Sign Up</Link>
        </div>
      </section>
    </main>
  );
};

export default Login;
