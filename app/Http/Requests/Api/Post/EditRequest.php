<?php

namespace App\Http\Requests\Api\Post;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class EditRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::guard('api')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Get the post ID from the route
        $postId = $this->route('post') ? $this->route('post')->id : null;

        return [
            'title' => [
                "required",
                "min:3",
                "max:70",
                Rule::unique('posts', 'title')->ignore($postId),
            ],
            'date' => 'required|date_format:Y-m-d H:i:s',
            'image' => 'nullable|image', // image is optional on edit
            'desc' => 'required|min:10',
        ];
    }
}
