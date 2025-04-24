import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { signup } from '../features/authSlice';
import { useNavigate, Link } from 'react-router';

const Signup = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const a=
            await dispatch(signup({ name, email, password })).unwrap();
            // if (!a.payload.errors || a.payload.errors.length === 0) {
            //     navigate('dashboard');
            // }
            navigate('/dashboard')
           
        } catch (err) {
            console.log("error")
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Create Account</h2>
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


                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-60 flex justify-center items-center gap-2"
                        disabled={loading}
                    >
                        {loading && (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/" className="text-indigo-600 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
