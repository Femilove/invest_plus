import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

import axios from "../api/axios";


const Loan = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newLoan = { name:name,amount:amount}
        try {
            const response = await axios.post('/loan', newLoan);
            setMessage(`Loan approved! Amount: ${response.data.amount}`);
        } catch (error) {
            setMessage('Error applying for loan');
        }
    };

    const logout = async () => {
        try {
            await axios.post('/logout'); // Call the logout endpoint
        } catch (err) {
            console.error('Logout failed:', err);
        }
        setAuth({});
        localStorage.removeItem('auth'); // Clear localStorage
        navigate('/linkpage');
    }

  return (
    <div>
        <h1>Loan Application</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Loan Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button type="submit">Apply for Loan</button>
            </form>
            
            {message && <p>{message}</p>}
            
            <div>
                <button onClick={logout}>Sign Out</button>
            </div>
    </div>
  )
}

export default Loan