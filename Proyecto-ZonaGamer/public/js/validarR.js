window.addEventListener('load', function () {
    const formRU = document.querySelector('form.formRU');

    formRU.addEventListener('submit', function (event) {        

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

// ***VALIDAMOS CONTRASEÑA*** //               

        const contrasenia = document.querySelector('input.contrasenia');        

        if (contrasenia.value === '') {
            errores.push('La contraseña es obligatoria');
        } else if (contrasenia.value.length < 8) { 
            errores.push('La contraseña debe tener al menos 8 caracteres');
        }
        
// ***VALIDAMOS EXTENSION DE IMAGEN DEL USUARIO*** //        

        const extensionesPermitidas = ["jpg", "jpeg", "png", "gif"]
        const image = document.querySelector('input[name="imagenPerfil"]');

        if (image != undefined) {
            const extension = image.value.substring(image.value.lastIndexOf('.') + 1).toLowerCase()

            if (image.value == "") {
                errores.push('Debes seleccionar una imagen');
            }
            else if (extensionesPermitidas.indexOf(extension) == -1) {
                errores.push('Los formatos de imagen permitidos son, "jpg", "jpeg", "png", "gif" ');                
            }
        }
        
// ***PREVENIMOS ENVIO DEL FORMULARIO*** //            
        
        if (errores.length > 0) {
            event.preventDefault();

            const ulErrores = document.querySelector('div.errores ul');
            for (let i = 0; i < errores.length; i++) {

                ulErrores.innerHTML += '<li>' + errores[i] + '</li>'

            }
        }
    })
})
