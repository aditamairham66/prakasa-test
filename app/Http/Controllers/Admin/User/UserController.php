<?php

namespace App\Http\Controllers\Admin\User;

use App\Enums\TypeMessage;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\AddRequest;
use App\Http\Requests\Admin\User\EditRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct(
        public $title = "Users"
    )
    {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return inertia('User/Index', [
            'title' => $this->title,
            'table' => User::query()
                ->when($request->input('q'), function ($query, $search) {
                    $query->where('name', 'like', '%' . $search . '%');
                    $query->orWhere('email', 'like', '%' . $search . '%');
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
        return inertia('User/Form', [
            'title' => "Add ".$this->title,
            'form' => new User(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AddRequest $request)
    {
        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ];

        $post = User::create($data);

        return redirect()->route('user.index')
            ->with([
                'message_type' => TypeMessage::SUCCESS,
                'message' => 'Successfully insert data.',
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return inertia('User/Detail', [
            'title' => "Detail ".$this->title,
            'form' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Form', [
            'title' => "Edit ".$this->title,
            'form' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditRequest $request, User $user)
    {
        $data = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);        

        return redirect()->route('user.index')
            ->with([
                'message_type' => TypeMessage::SUCCESS,
                'message' => 'Successfully updated data.',
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('user.index')
            ->with([
                'message_type' => TypeMessage::SUCCESS,
                'message' => 'Successfully deleted data.',
            ]);
    }
}
