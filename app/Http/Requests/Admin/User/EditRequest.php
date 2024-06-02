<?php

namespace App\Http\Requests\Admin\User;

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
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Get the user ID from the route
        $userId = $this->route('user') ? $this->route('user')->id : null;

        return [
            'name' => 'required',
            'email' => [
                "required",
                "email",
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'password' => 'nullable',
        ];
    }
}
