<?php

namespace App\Models;
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'is_public',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
