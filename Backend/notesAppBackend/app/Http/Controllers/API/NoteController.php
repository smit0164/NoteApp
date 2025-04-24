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
            'is_public' => $request->is_public ?? false,
        ]);
    
        return response()->json([
            'message' => 'Note created successfully',
            'note' => new NoteResource($note),
        ], 201);
    }
    public function index()
    {
        $notes = Note::where('user_id', Auth::id())->get();
        return NoteResource::collection($notes);
    }
    

}
