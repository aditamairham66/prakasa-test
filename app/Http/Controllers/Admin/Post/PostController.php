<?php

namespace App\Http\Controllers\Admin\Post;

use App\Enums\TypeMessage;
use App\Helpers\Upload;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Post\AddRequest;
use App\Http\Requests\Admin\Post\EditRequest;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function __construct(
        public $title = "Post"
    )
    {}
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return inertia('Post/Index', [
            'title' => $this->title,
            'table' => Post::query()
                ->with(['user'])
                ->when($request->input('q'), function ($query, $search) {
                    $query->where('title', 'like', '%' . $search . '%');
                    $query->orWhere('desc', 'like', '%' . $search . '%');
                })
                ->orderBy('id', 'DESC')
                ->paginate(10),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Post/Form', [
            'title' => "Add ".$this->title,
            'form' => new Post(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AddRequest $request)
    {
        $userId = Auth::user()->id ?? 1;
        $image = Upload::store('image', 'posts');

        $data = [
            'title' => $request->title,
            'date' => Carbon::parse($request->date)->format('Y-m-d'),
            'desc' => $request->desc,
            'user_id' => $userId,
        ];
        
        if ($image) {
            $data['image'] = $image;
        }

        $post = Post::create($data);

        return redirect()->route('post.index')
            ->with([
                'message_type' => TypeMessage::SUCCESS,
                'message' => 'Successfully insert data.',
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return inertia('Post/Detail', [
            'title' => "Detail ".$this->title,
            'form' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return inertia('Post/Form', [
            'title' => "Edit ".$this->title,
            'form' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditRequest $request, Post $post)
    {
        $userId = Auth::user()->id ?? 1;
        $image = Upload::store('image', 'posts');
        
        $data = [
            'title' => $request->title,
            'date' => Carbon::parse($request->date)->format('Y-m-d'),
            'desc' => $request->desc,
            'user_id' => $userId,
        ];
        
        if ($image) {
            $data['image'] = $image;
        }
        
        $post->update($data);        

        return redirect()->route('post.index')
            ->with([
                'message_type' => TypeMessage::SUCCESS,
                'message' => 'Successfully updated data.',
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('post.index')
            ->with([
                'message_type' => TypeMessage::SUCCESS,
                'message' => 'Successfully deleted data.',
            ]);
    }

    public function deleteImage(Request $request, Post $post)
    {
        $field = $request->field;

        // remove the image
        Upload::remove($post->$field);

        // update the image
        $post->$field = null;
        $post->save();

        return redirect()->back()
            ->with([
                'message_type' => TypeMessage::WARNING,
                'message' => 'Successfully deleted image.',
            ]);
    }
}
