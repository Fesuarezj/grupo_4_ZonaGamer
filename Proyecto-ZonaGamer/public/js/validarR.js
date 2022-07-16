window.addEventListener('load', function () {
    const formRU = document.querySelector('form.formRU');

    formRU.addEventListener('submit', function (event) {        

        const errores = [];

        const nombre = document.querySelector('input.nombre');

        if (nombre.value === '') {
            errores.push('El nombre es obligatorio');
        } else if (nombre.value.length < 3) { 
            errores.push('El nombre debe tener al menos 3 caracteres');
        }

        const apellido = document.querySelector('input.apellido');

        if (apellido.value === '') {
            errores.push('El apellido es obligatorio');
        } else if (apellido.value.length < 3) { 
            errores.push('El apellido debe tener al menos 3 caracteres');
        }        
        
        const correo = document.querySelector('input.correo');
        const expReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (correo.value === '') {
            errores.push('El correo es obligatorio');
        } else if (!expReg.test(correo.value)) { 
            errores.push('Debe ser un formato de correo válido');
        }

        const contrasenia = document.querySelector('input.contrasenia');
        

        if (contrasenia.value === '') {
            errores.push('La contraseña es obligatoria');
        } else if (contrasenia.value.length < 8) { 
            errores.push('La contraseña debe tener al menos 8 caracteres');
        }

        // const imagen = document.querySelector('input.imagen');
        // const imgFormato = ['.jpg', '.jpeg', '.png', '.gif'];

        // console.log(imagen.value);        

        // if (imagen.value === imgFormato) {
        //     errores.push('Debe ser un formato de imagen válido');
        // } 
        
        if (errores.length > 0) {
            event.preventDefault();

            const ulErrores = document.querySelector('div.errores ul');
            for (let i = 0; i < errores.length; i++) {

                ulErrores.innerHTML += '<li>' + errores[i] + '</li>'

            }
        }
    })
})
