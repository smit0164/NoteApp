import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { login } from '../features/authSlice';
import { useNavigate, Link } from 'react-router';


const Login = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [invalidCredentials, setInvalidCredentials] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInvalidCredentials('');
        setEmailError('');
        setPasswordError('');

        try {
            await dispatch(login({ email, password })).unwrap();
            navigate('/dashboard');
        } catch (err) {
            setInvalidCredentials(err.Invalidcredentials || '');
            setEmailError(err.errors?.email?.[0] || '');
            setPasswordError(err.errors?.password?.[0] || '');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            <div className="max-w-md w-full bg-white bg-opacity-95 rounded-xl shadow-2xl p-8 transition duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-gray-500 text-center mb-6">Log in to your account to continue</p>

                {invalidCredentials && (
                    <p className="text-red-600 text-center font-medium mb-4">
                        {invalidCredentials}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <div className="flex items-center border-2 border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-indigo-600">
                            
                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>{
                                     setEmail(e.target.value);
                                     setEmailError('');
                                     setInvalidCredentials('');
                                }}
                                className="w-full p-3 bg-transparent focus:outline-none"
                                placeholder="you@example.com"
                                disabled={loading}
                            />
                        </div>
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <div className="flex items-center border-2 border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-indigo-600">
                           
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)
                                    setPasswordError('');
                                    setInvalidCredentials('');
                                }}
                                className="w-full p-3 bg-transparent focus:outline-none"
                                placeholder="••••••••"
                                disabled={loading}
                            />
                        </div>
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 disabled:opacity-60 flex justify-center items-center gap-2"
                        disabled={loading}
                    >
                        {loading && (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
