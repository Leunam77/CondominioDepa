<!DOCTYPE html>
<html lang="en">

<body>
    <div class="container">
        <h1>User email Verification</h1> 
        <p>holaaaaa {{$user->first_name}}</p>
        <p>porfavor dale click al boton para verificar</p>
        <a href="{{ URL::temporarySignedRoute('verification.verify', now()->addMinutes(30), ['id' => $user->id]) }}" class="button button-primary" target="_black">
            verify email address
        </a>
    </div>
</body>
</html>