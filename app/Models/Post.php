<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'date',
        'image',
        'desc',
        'user_id',
    ];

    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function getDateAttribute() {
        return Carbon::parse($this->attributes['date'])->format('Y-m-d');
    }
}
