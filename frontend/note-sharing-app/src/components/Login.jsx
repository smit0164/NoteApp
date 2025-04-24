import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { login } from '../features/authSlice';
import { useNavigate, Link } from 'react-router';

const Login = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login({ email, password })).unwrap();
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="max-w-md w-full bg-white bg-opacity-90 rounded-lg shadow-2xl p-8">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>

                {error?.errors && (
                    <div className="mb-4">
                        {Object.entries(error.errors).map(([field, messages]) =>
                            messages.map((msg, i) => (
                                <p key={`${field}-${i}`} className="text-red-500 text-center">
                                    {msg}
                                </p>
                            ))
                        )}
                       
                    </div>
                )}

                {error?.Invalidcredentials && (
                    <p className="text-red-500 text-center">{error.Invalidcredentials}</p>
                )} 
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            disabled={loading}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"

                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200 disabled:bg-indigo-300"
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <Link to="/signup" className="text-indigo-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
