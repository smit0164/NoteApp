import { useSelector, useDispatch } from 'react-redux';
import { logout, fetchUser } from '../features/authSlice';
import { useNavigate,Link } from 'react-router';
import { useEffect } from 'react';

const staticNotes = [
    {
        id: 1,
        title: "Meeting Notes",
        content: "Discuss project timeline and resource allocation.",
        is_public: false,
        created_at: "2025-04-24",
    },
    {
        id: 2,
        title: "Idea Brainstorm",
        content: "New features for note app: tags, search, categories.",
        is_public: true,
        created_at: "2025-04-23",
    },
    {
        id: 3,
        title: "Personal Reminder",
        content: "Schedule team sync for next week.",
        is_public: false,
        created_at: "2025-04-22",
    },
];

const Dashboard = () => {
    const { user, token, loading } = useSelector((state) => state.auth);
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

    if (loading) {
        return (
            <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-50">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-12 h-12 border-4 border-blue-300 border-t-transparent rounded-full animate-spin-slow"></div>
                    </div>
                    <p className="mt-4 text-gray-700 font-medium animate-pulse">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
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

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Welcome Section */}
                <section className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        Welcome, {user?.name || 'User'}!
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Organize your thoughts, share ideas, and stay productive with your notes.
                    </p>
                    <button
                        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        
                    >
                       <Link to="/createnote">
                          + Create a New Note
                       </Link> 
                    </button>
                </section>

                {/* Notes Section */}
                <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Your Notes</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {staticNotes.map((note) => (
                            <div
                                key={note.id}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    {note.title}
                                </h4>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {note.content}
                                </p>
                                <div className="flex justify-between items-center text-xs">
                                    <span
                                        className={`px-2 py-1 rounded-full font-medium ${
                                            note.is_public
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {note.is_public ? 'Public' : 'Private'}
                                    </span>
                                    <span className="text-gray-500">{note.created_at}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;