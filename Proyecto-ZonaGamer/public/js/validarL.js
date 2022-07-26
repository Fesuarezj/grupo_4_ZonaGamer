window.addEventListener('load', function () {
    const formLU = document.querySelector('form.formLU');

    formLU.addEventListener('submit', function (event) {        

        const errores = [];

// ***VALIDAMOS USERNAME DEL USUARIO*** //    

        const userName = document.querySelector('input.userName');

        if (userName.value === '') {
            errores.push('Debes ingresar un nombre de usuario');
        } else if (userName.value.length < 3) { 
            errores.push('El nombre debe tener al menos 3 caracteres');
        }     

// ***VALIDAMOS CONTRASEÑA DEL USUARIO*** //            

        const contrasenia = document.querySelector('input.contrasenia');

        if (contrasenia.value === '') {
            errores.push('Debes introducir una contraseña');
        } else if (contrasenia.value.length < 8) { 
            errores.push('La contraseña debe tener al menos 8 caracteres');
        }

// ***PREVENIMOS EL ENVIO DEL FORMULARIO*** //    

        if (errores.length > 0) {
            event.preventDefault();            

            const ulErrores = document.querySelector('div.errores ul');

            ulErrores.innerHTML = ''

            for (let i = 0; i < errores.length; i++) {

                ulErrores.innerHTML += '<li>' + errores[i] + '</li>'

            }
        }
    })
})
