import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axios';

// Async thunk to create a new note
export const createnote = createAsyncThunk(
  'notes/createnote',
  async ({ title, content, isPublic }, { rejectWithValue }) => {
    try {
       
      const response = await axiosInstance.post(
        'createnote',
        {
          title,
          content,
          is_public: isPublic,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'Error creating note');
    }
  }
);

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('notes');
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data || 'Error In fetching notes');
    }

});
export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (noteId, { rejectWithValue }) => {
      try {
          const response = await axiosInstance.delete( `deletenote/${noteId}`);
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response?.data || 'Error deleting note');
      }
  });
  
const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createnote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createnote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload);
      })
      .addCase(createnote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create note';
      });
      builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes=action.payload.notes;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetching note';
      });
    builder
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter(note => note.id != action.payload.id);
        console.log(state.notes)
      })     
      .addCase(deleteNote.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete note';
      })
    }
});

export const { clearError } = notesSlice.actions;

export default notesSlice.reducer;
