<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = \App\Models\User::inRandomOrder()->first();

        if (!$user) {
            // Create a user if none exist
            $user = \App\Models\User::factory()->create();
        }

        return [
            'title' => $this->faker->sentence,
            'date' => Carbon::now(),
            'image' => null,
            'desc' => $this->faker->paragraph,
            'user_id' => $user->id, // assuming you have a User model and factory
        ];
    }
}
