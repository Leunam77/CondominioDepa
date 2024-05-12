<!DOCTYPE html>
<html>
<head>
    <title>Cobro de servicio</title>
</head>
<body>
    <h2>Cobro de servicio</h2>
    <p>Hola {{ $titulo }},</p>
    <p>Se ha generado un cobro por un servicio con el siguiente detalle:</p>
    <ul>
        <li><strong>Titulo:</strong> {{ $titulo }}</li>
        <li><strong>Monto:</strong> ${{ $monto }}</li>
    </ul>
    <p>Gracias por su atención.</p>
</body>
</html>
