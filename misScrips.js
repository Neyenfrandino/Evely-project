function buscarPorId(elementoId){
    let elementoDocumento = document.getElementById(elementoId);
    return elementoDocumento;
}

function buscadorDeFecha(){
    let inputTextFecha = buscarPorId('cajaInput');
    let valorUsuario = inputTextFecha.value
    let fecha = new Date(valorUsuario  + 'T00:00:00')
    let elementInputText = buscarPorId('nombreInput')
    let valorInput = elementInputText.value
    let mensajeMostrarUsuario = '"'+ valorInput +'"' + ' usted unicio el tratamiento el dia ';

    if(valorUsuario >= fecha){
        let calendarioContainer = buscarPorId('calendarioContainer');
        calendarioContainer.innerHTML= '';

        let fechaFormateada = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
        let fechaTitulo = document.createElement('h2');
        fechaTitulo.textContent = mensajeMostrarUsuario + fechaFormateada + ' debe tomar el comprimido X';
        fechaTitulo.classList.add('mensajeUsuario');
        calendarioContainer.appendChild(fechaTitulo);
 } else{
        let fechaTitulo = document.createElement('h2');
        fechaTitulo.textContent = valorInput + ' La fecha ingresada no es correcta'
        fechaTitulo.classList.add('mensajeUsuario');
        calendarioContainer.appendChild(fechaTitulo);
        let tablaComprimidos = buscarPorId('tablaComprimidos');
        tablaComprimidos.remove();
    
 }
}

function btnEvent() {
    let btnElemento = buscarPorId('btnFiltarNombre');
    let elementInput = buscarPorId('cajaInput');
    const nombreInput = document.getElementById('nombreInput');
  
    btnElemento.addEventListener('click', function() {
      if (nombreInput.value.trim() !== '') {
        if (elementInput.value.trim() !== '') {
          // Abre el calendario DatePicker
          flatpickr(elementInput);
          buscadorDeFecha();
  
          if (nombreInput.value.trim() && elementInput.value.trim()) {
            buildMessage();
          }
        } else {
          alert('Por favor, ingresa la fecha de inicio del tratamiento.');
        }
      } else {
        alert('Por favor, ingresa tu nombre primero.');
      }
    });
  }

    function buildMessage() {
        let miArray = [
          document.getElementById('labelText'),
          document.getElementById('nombreInput'),
          document.getElementById('btnFiltarNombre'),
          document.getElementById('cajaInput'),
          document.getElementById('filtrarNombre')
        ];
      
        for (let element of miArray) {
          element.remove();
        }
        if(miArray != null){
            let miTabla = buscarPorId('tablaComprimidos');
            miTabla.style.display = 'inline-block'
            buscadorDeFecha()
          }
          
      }      
      


      
btnEvent()