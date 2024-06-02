<?php

namespace App\Http\Controllers\Admin\Post;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function __construct(
        public $title = "Posts"
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
                ->orderBy('id', 'ASC')
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
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('post.index')
            ->with([
                'message_type' => 'success',
                'message' => 'Data Berhasil Dihapus!',
            ]);
    }
}
