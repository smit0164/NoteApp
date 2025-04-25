<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\NoteRequest;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Support\Facades\Auth;
class NoteController extends Controller
{
   

    public function store(NoteRequest $request)
    {
        
        $note = Note::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'content' => $request->content,
            'is_public' => $request->is_public ? 1 : 0,
        ]);
    
        return response()->json([
            'message' => 'Note created successfully',
            'note' => new NoteResource($note),
        ], 201);
    }

    public function fetchNotes()
    {
        $notes = Note::where('user_id', Auth::id())->get();
        return response()->json([
            'notes' => NoteResource::collection($notes),
        ]);
    }

    public function delete( $id){
        $user = Auth::user();
        $note = Note::where('user_id', $user->id)->where('id', $id)->first();
        if (!$note) {
            return response()->json(['message' => 'Note not found'], 404);
        }
        
            $note->delete();
            return response()->json(['message' => 'Note deleted successfully','id'=>$id], 200);
        
    }
    

}
