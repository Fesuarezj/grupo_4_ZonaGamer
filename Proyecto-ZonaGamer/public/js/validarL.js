window.addEventListener('load', function () {
    const formLU = document.querySelector('form.formLU');

    formLU.addEventListener('submit', function (event) {        

        const errores = [];

        const userName = document.querySelector('input.userName');

        if (userName.value === '') {
            errores.push('Debes ingresar un nombre de usuario');
        } else if (userName.value.length < 3) { 
            errores.push('El nombre debe tener al menos 3 caracteres');
        }     
        
        const contrasenia = document.querySelector('input.contrasenia');

        if (contrasenia.value === '') {
            errores.push('Debes introducir una contraseña');
        }

        if (errores.length > 0) {
            event.preventDefault();

            const ulErrores = document.querySelector('div.errores ul');
            for (let i = 0; i < errores.length; i++) {

                ulErrores.innerHTML += '<li>' + errores[i] + '</li>'

            }
        }
    })
})
