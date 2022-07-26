window.addEventListener('load', function () {
    const formBP = document.querySelector('form.formBP');    

    formBP.addEventListener('submit', function (event) {        

        const errores = [];
        
        // ***VALIDAMOS ID DEL PRODCUTO*** //        

        // const id = document.getElementById('id');
        const id = document.querySelector('input.id');

        if (id.value === '') {                       
            errores.push('Debes poner un ID de producto');            
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
