window.addEventListener('load', function () {
    const formEP = document.querySelector('form.formEP');

    formEP.addEventListener('submit', function (event) {        

        const errores = [];

// ***VALIDAMOS NOMBRE DEL PRODCUTO*** //        

        const name = document.querySelector('input.name');

        if (name.value === '') {
            errores.push('Debes poner un nombre al producto');
        } else if (name.value.length < 5) { 
            errores.push('El nombre del producto debe tener al menos 5 caracteres');
        }     
        
// ***VALIDAMOS DESCRIPCION DEL PRODCUTO*** //        

        const description = document.querySelector('textarea');

        if (description.value === '') {
            errores.push('Debes ingresar una dscripcón del producto');
        } else if (description.value.length < 5 ) {
            errores.push('La descripción debe tener mínimo 5 caracteres');
        } else if (description.value.length > 30 ) {
            errores.push('La descripción debe tener máximo 30 caracteres');
        }    

// ***VALIDAMOS EXTENSION DE IMAGEN DEL PRODCUTO*** //        

        const extensionesPermitidas = ["jpg", "jpeg", "png", "gif"]
        const image = document.querySelector('input[name="imagenProducto"]');

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
