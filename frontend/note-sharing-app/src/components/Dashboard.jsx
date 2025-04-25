import { useSelector, useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router';
import { useEffect } from 'react';
import { fetchNotes,deleteNote } from '../features/notesSlice';




const Dashboard = () => {
    const { user, token, loading } = useSelector((state) => state.auth);
    const { notes } = useSelector((state) => state.notes);
    const dispatch = useDispatch();
  

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);
    const handleDelete = (noteId) => {
            console.log("first",noteId)
            dispatch(deleteNote(noteId));  // Dispatch delete action
        
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
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p
            
            
            
            y-12">
                {/* Welcome Section */}
                <section className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        Welcome, {user?.name || 'User'}!
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Organize your thoughts, share ideas, and stay productive with your notes.
                    </p>
                    <Link to="/createnote">
                        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                            + Create a New Note
                        </button>
                    </Link>
                </section>
    
                {/* Notes Section */}
                <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Your Notes</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.length > 0 ? (
                            notes.map((note) => (
                                <div
                                    key={note.id}
                                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                        {note.title}
                                    </h4>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 overflow-ellipsis">
                                            {note.content}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center text-xs mt-4">
                                        <span
                                            className={`px-2 py-1 rounded-full font-medium ${
                                                note.is_public == 1
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {note.is_public == 1 ? 'Public' : 'Private'}
                                        </span>
                                        <span className="text-gray-500">
                                            {note.created_at ? note.created_at.split(' ')[0] : 'Unknown date'}
                                        </span>
                                        <div className="mt-4 text-right">
                                            <button
                                                onClick={() => handleDelete(note.id)}
                                                className="text-white bg-red-600 hover:bg-red-800 font-medium py-1 px-2 rounded-md transition-colors duration-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center">
                                No notes found. Start by creating one!
                            </p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
    
};

export default Dashboard;