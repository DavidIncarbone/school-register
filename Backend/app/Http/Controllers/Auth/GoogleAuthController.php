<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use League\OAuth2\Client\Provider\Google;
use Illuminate\Http\Request;
use App\Models\User;

class GoogleAuthController extends Controller
{
    protected function getGoogleProvider()
    {
        // Istanzio un oggetto dalla classe Google e gli setto le credenziali
        return new Google([
            'clientId' => config('services.google.client_id'),
            'clientSecret' => config('services.google.client_secret'),
            'redirectUri' => config('services.google.redirect'),
        ]);
    }

    public function redirect()
    {

        $provider = $this->getGoogleProvider();

        // Creo l'url per il reindirizzamento verso Google
        $authUrl = $provider->getAuthorizationUrl([
            'scope' => ['email', 'profile'],
        ]);

        // Salviamo il "state" per validazione CSRF (state = token casuale per prevenire attacchi CSRF nel callback)
        // Session::put('oauth2state', $provider->getState());

        // Reindirizzo all'url creato
        return Redirect::to($authUrl);
        // return response()->view('auth.redirect-to-google', ['authUrl' => $authUrl]);
    }

    public function callback(Request $request)
    {

        $provider = $this->getGoogleProvider();
        // $state = Session::pull('oauth2state');

        // DISABILITATO SOLO PER TESTING IN LOCALE

        // if (empty($request->input('state')) || $request->input('state') !== $state) {
        //     abort(403, 'Invalid OAuth state');
        // }

        // Solo per test locale, non in produzione
        // disabilito il controllo CSRF
        Session::forget('oauth2state');
        try {
            $accessToken = $provider->getAccessToken('authorization_code', ['code' => $request->input('code')]);

            $googleUser = $provider->getResourceOwner($accessToken);
            // dd($googleUser->toArray());

            $data = $googleUser->toArray();

            $user = User::updateOrCreate(
                [
                    'email' => $data["email"],
                    'name' => $data["given_name"],
                    'type' => 'Admin'
                ]
            );

            Admin::updateOrCreate(
                [
                    "first_name" => $data["given_name"],
                    "last_name" => $data["family_name"],
                    "email" => $data["email"]
                ]
            );

            Auth::login($user);
            return redirect("http://localhost:5173");
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
