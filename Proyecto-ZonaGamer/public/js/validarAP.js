window.addEventListener('load', function () {
    const formAP = document.querySelector('form.formAP');

    formAP.addEventListener('submit', function (event) {        

        const errores = [];

        const name = document.querySelector('input.name');

        if (name.value === '') {
            errores.push('Debes poner un nombre al producto');
        } else if (name.value.length < 5) { 
            errores.push('El nombre del producto debe tener al menos 5 caracteres');
        }     
        
        // const description = document.querySelector('textarea.description');
        const description = document.getElementById('description');

        if (description.value.length > 20) {
            errores.push('La descripción debe tener máximo 20 caracteres');
        }

        // if (imagen.value === '') {
        //     alert('El nombre es obligatorio');
        // } else if (nombre.value.length < 3) { 
        //     alert('El nombre debe tener al menos 3 caracteres');
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
