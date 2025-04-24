import { useState } from 'react';


const NoteForm = ({ onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/notes', { title, content, is_public: isPublic });
            setTitle('');
            setContent('');
            setIsPublic(false);
            onSave();
        } catch (err) {
            setError('Failed to create note.');
            console.error(err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md w-full bg-white shadow-md rounded-2xl p-6 space-y-4"
        >
            <h3 className="text-lg font-semibold text-gray-800">Create Note</h3>
            {error && <p className="text-sm text-red-500">{error}</p>}

            <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter note title"
                    required
                />
            </div>

            <div>
                <label className="block text-sm text-gray-600 mb-1">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your note..."
                    required
                ></textarea>
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    id="public"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="public" className="ml-2 text-sm text-gray-700">
                    Make Public
                </label>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
                Save Note
            </button>
        </form>
    );
};

export default NoteForm;
