import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('users'); // Ensure the correct endpoint
                setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        };

        getUsers();
    }, [axiosPrivate, navigate, location]);

    return (
        <article>
            <h2>Users List</h2>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>{user.username}</li> // Assuming user has a username field
                    ))}
                </ul>
            ) : (
                <p>No users to display</p>
            )}
        </article>
    );
};

export default Users;