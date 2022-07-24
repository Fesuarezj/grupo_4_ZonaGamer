window.addEventListener('load', function () {
    const formC = document.querySelector('form.formC');

    formC.addEventListener('submit', function (event) {        

        const errores = [];

// ***VALIDAMOS NOMBRE DEL USUARIO*** //       

        const nombre = document.querySelector('input.nombre');

        if (nombre.value === '') {
            errores.push('El nombre es obligatorio');
        } else if (nombre.value.length < 3) { 
            errores.push('El nombre debe tener al menos 3 caracteres');
        }

// ***VALIDAMOS APELLIDO DEL USUARIO*** //       

        const apellido = document.querySelector('input.apellido');

        if (apellido.value === '') {
            errores.push('El apellido es obligatorio');
        } else if (apellido.value.length < 3) { 
            errores.push('El apellido debe tener al menos 3 caracteres');
        }       
        
// ***VALIDAMOS CORREO DEL USUARIO*** //               
        
        const correo = document.querySelector('input.correo');
        const expReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (correo.value === '') {
            errores.push('El correo es obligatorio');
        } else if (!expReg.test(correo.value)) { 
            errores.push('Debe ser un formato de correo válido');
        }
        
// ***VALIDAMOS DESCRIPCION DEL PRODCUTO*** //        
                // // const description = document.querySelector('textarea.description');
        const description = document.querySelector('textarea');

        if (description.value === '') {
            errores.push('Debes ingresar una dscripcón del producto');
        } else if (description.value.length < 5 ) {
            errores.push('La descripción debe tener mínimo 5 caracteres');
        } else if (description.value.length > 30 ) {
            errores.push('La descripción debe tener máximo 30 caracteres');
        }           

        
// ***PREVENIMOS ENVIO DEL FORMULARIO*** //            
        
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
