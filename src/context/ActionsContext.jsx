import { createContext, useContext, useState, useCallback} from 'react'
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export const ActionContext = createContext();

const ActionProvider = ({ children }) => {

  const { userData, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const BC_URL = import.meta.env.VITE_BC_URL;
  const [ added, setAdded ] = useState(false);

  // GET FAVORITES/WATCHLIST
  const fetchList = async (subpath, controller) => {
    try {
      const response = await fetch(`${BC_URL}/${subpath}/${userData?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        signal: controller.signal
      })

      if(!response.ok) {
        const errData = await response.json();
        const errMsg = errData.message || errData.statusText;
        throw new Error(errMsg);
      }
      
      const data = await response.json();
      return data;

    } catch (error) {
      navigate(0);
      alert(error.message)
    }
  };

  // ADD
  const isAuth = useCallback(() => {
    if(!accessToken) {
      navigate('/login');
      return false;
    }
    return true;
  }, [userData, accessToken, navigate])
  
  const handleAdd = async (show_id, subpath) => {
    if(!isAuth()) return;

    if(!show_id) {
      alert('Show Id is required');
      return;
    }

    try {
      const response = await fetch(`${BC_URL}/${subpath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          user_id: userData?.id,
          show_id: String(show_id)
        })
      })

      if(!response.ok) {
        const errData = await response.json();
        const errmsg = errData.message || errData.statusText;
        throw new Error(errmsg);
      }

      const data = await response.json();
      console.log(data);
      setAdded(prev => !prev);

    } catch (error) {
      console.log(error.message)
    }
  };
  
  // REMOVE


  const value = {
    handleAdd, fetchList, added
  }

  return (
    <ActionContext.Provider value={value}> 
      { children }
    </ActionContext.Provider>
  )
}

export default ActionProvider