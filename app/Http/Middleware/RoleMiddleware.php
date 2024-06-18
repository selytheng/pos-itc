<?php

namespace App\Http\Middleware;

use Closure;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth as FacadesJWTAuth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle($request, Closure $next, ...$roles)
    {
        try {
            $user = FacadesJWTAuth::parseToken()->authenticate();
            if (!$user) {
                return response()->json(['error' => 'User not found'], Response::HTTP_UNAUTHORIZED);
            }
            $userRole = $user->role->name; // assuming 'role' is a relationship on the User model
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Unauthorized', 
                'message' => $e->getMessage(),
            ], Response::HTTP_UNAUTHORIZED);
        }

        if (!in_array($userRole, $roles)) {
            return response()->json(['error' => 'Forbidden'], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
