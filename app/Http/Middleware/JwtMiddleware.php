<?php

namespace App\Http\Middleware;

use Closure;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException as ExceptionsJWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException as ExceptionsTokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException as ExceptionsTokenInvalidException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth as FacadesJWTAuth;

class JwtMiddleware
{
    public function handle($request, Closure $next)
    {
        try {
            $user = FacadesJWTAuth::parseToken()->authenticate();
            if (!$user) {
                return response()->json(['error' => 'User not found'], 401);
            }
        } catch (ExceptionsTokenExpiredException $e) {
            return response()->json(['error' => 'Token has expired'], 401);
        } catch (ExceptionsTokenInvalidException $e) {
            return response()->json(['error' => 'Token is invalid'], 401);
        } catch (ExceptionsJWTException $e) {
            return response()->json(['error' => 'Token is not provided'], 401);
        }

        return $next($request);
    }
}
