import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createnote } from '../features/notesSlice';
const NoteForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(null);
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [isPublicError, setIsPublicError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
  const handleSubmit =  async(e) => {
    e.preventDefault();
    setIsPublicError('');
    setTitleError('');
    setIsPublicError('');
    let hasError = false;
    if (!title || title.length < 3) {
       setTitleError('Title must be at least 3 characters long');
       hasError = true;
    }
    if (!content || content.length < 10) {
      setContentError('Content must be at least 10 characters long');
      hasError = true;
    }
    if(hasError){
        setIsLoading(false);
        return;
    }
    try{
        await dispatch(createnote({ title,content,isPublic })).unwrap();
        navigate('/dashboard')
    }catch(err){
        console.log("error",err);
        setIsLoading(false);
    }    
  
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-8 space-y-8 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">📝 Create a New Note</h2>

        <form onSubmit={(e) =>handleSubmit(e)} className="space-y-6" method='POST'>
          {/* Title Field */}
          <div className="space-y-3">
            <label htmlFor="title" className="text-sm text-gray-700 font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter a catchy title"
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition border-gray-300"
              disabled={isLoading}
              onChange={(e) => {
                 setTitle(e.target.value)
                 setTitleError('')
              }}
              value={title}
            />
            {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
          </div>

          {/* Content Field */}
          <div className="space-y-3">
            <label htmlFor="content" className="text-sm text-gray-700 font-medium">
              Content
            </label>
            <textarea
              id="content"
              placeholder="Write something meaningful..."
              className="w-full px-4 py-3 border rounded-lg text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 transition border-gray-300"
              disabled={isLoading}
              onChange={(e) => 
                {setContent(e.target.value)
                setContentError('')}  
            }
              value={content}
            ></textarea>
            {contentError && <p className="text-red-500 text-sm">{contentError}</p>}
          </div>

          {/* Public Checkbox */}
          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              id="public"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
              onChange={(e) => setIsPublic(e.target.checked)}
              checked={isPublic}
            />
            <label htmlFor="public" className="text-sm text-gray-700">
              Make this note public
            </label>
            {isPublicError && <p className="text-red-500 text-sm">{isPublicError}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-60 flex justify-center items-center gap-2 mt-6"
            onClick={() => {
              setIsLoading(true);

            }}
          >
            {isLoading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {isLoading ? 'Saving...' : 'Save Note'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
