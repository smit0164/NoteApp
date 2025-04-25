import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate} from 'react-router';
import { useEffect } from 'react';
import { fetchUser, logout } from '../features/authSlice'; 

const Header = () => {
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
     useEffect(() => {
            if (token) {
                dispatch(fetchUser());
            }
        }, [token, dispatch]);
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Note Sharing App</h1>
                <div className="flex items-center space-x-4">
                    <div className="text-sm text-right hidden sm:block">
                        <p className="font-semibold">{user?.name || 'User'}</p>
                        <p className="text-xs text-blue-100">{user?.email || 'email@example.com'}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header