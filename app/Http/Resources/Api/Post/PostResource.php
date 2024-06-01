<?php

namespace App\Http\Resources\Api\Post;

use App\Http\Resources\Api\User\UserResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => !empty($this->id) ? $this->id : 0,
            "title" => !empty($this->title) ? $this->title : "",
            "date" => !empty($this->date) ? Carbon::parse($this->date)->format('Y-m-d H:i') : "",
            "image" => !empty($this->image) ? url($this->image) : "",
            "desc" => !empty($this->desc) ? $this->desc : "",
            "user" => new UserResource($this->user),
        ];
    }
}
