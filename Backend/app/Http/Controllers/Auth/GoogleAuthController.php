<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        dd(Socialite::driver('google'));

        return Socialite::driver('google')->stateless()->redirect();
    }
}
