<!DOCTYPE html>
<html>

<head>
    <title>Redirecting to Google...</title>
    <meta http-equiv="refresh" content="1;url={{ $authUrl }}">
</head>

<body>
    <p>Stai per essere reindirizzato a Google per l'accesso... Attendi un attimo.</p>
    <script>
        setTimeout(() => {
            window.location.href = @json($authUrl);
        }, 2000);
    </script>
</body>

</html>
