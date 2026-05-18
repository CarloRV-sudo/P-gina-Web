fetch('api/verificar_sesion.php')
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        if (!datos.logueado || !datos.usuario || datos.usuario.rol !== 'Administrador') {
            window.location.href = 'login.html';
            return;
        }

        document.body.style.display = '';
    })
    .catch(() => {
        window.location.href = 'login.html';
    });