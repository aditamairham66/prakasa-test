<?php

namespace App\Http\Controllers\Api\Post;

use App\Helpers\Upload;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Post\AddRequest;
use App\Http\Requests\Api\Post\EditRequest;
use App\Http\Requests\Api\Post\IndexRequest;
use App\Http\Resources\Api\Post\PostResource;
use App\Models\Post;
use App\Traits\ApiRespond;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    use ApiRespond;

    public function index(IndexRequest $request) 
    {
        $data = Post::query()
            ->with(['user'])
            ->orderBy('id', 'DESC')
            ->paginate($request->limit)
            ->items();

        return $this->respondWithMessage(PostResource::collection($data), 'Success');
    }

    public function store(AddRequest $request) 
    {
        $userId = Auth::guard('api')->user()->id;
        $image = Upload::store('image', 'posts');

        $save = Post::create([
            'title' => $request->title,
            'date' => Carbon::parse($request->date)->format('Y-m-d H:i:s'),
            'image' => $image,
            'desc' => $request->desc,
            'user_id' => $userId,
        ]);

        return $this->respondWithMessage(new PostResource($save), 'Success Created');
    }

    public function update(EditRequest $request, Post $post) 
    {
        $userId = Auth::guard('api')->user()->id;
        $image = Upload::store('image', 'posts');

        $post->update([
            'title' => $request->title,
            'date' => Carbon::parse($request->date)->format('Y-m-d H:i:s'),
            'image' => $image,
            'desc' => $request->desc,
            'user_id' => $userId,
        ]);

        return $this->respondWithMessage(new PostResource($post), 'Success Updated');
    }

    public function destroy(Post $post) 
    {
        $post->delete();

        return $this->respondWithMessage(new PostResource($post), 'Success');
    }
}
