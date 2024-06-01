<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(
        public $title = "Dashboard"
    )
    {}
    
    public function index() 
    {
        return inertia('Home/Index', [
            'title' => $this->title,
        ]);
    }
}
