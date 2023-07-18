function buscarPorId(elementoId){
    let elementoDocumento = document.getElementById(elementoId);
    return elementoDocumento;
}



function buscadorDeFecha(mensajeUsuario){

    //Aqui extraemos la fecha que ingresa el usuario y la transformamos en el formato que deseado, para asi poder hacer la validacion...
    let inputTextFecha = buscarPorId('cajaInput');
    let valorUsuarioFecha = inputTextFecha.value;

    let fecha = new Date(valorUsuarioFecha  + 'T00:00:00')
    let fechaActual = new Date()

    let elementInputText = buscarPorId('nombreInput')
    let valorInput = elementInputText.value
    let mensajeMostrarUsuario = '"'+ valorInput +'"' + ' usted unicio el tratamiento el dia ';

  if (fecha < fechaActual) {

        //Aqui validamos que la fecha del inicio del tratamiento no sea una fecha del futuro... 
        let fechaFormateada = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
        let fechaTitulo = document.createElement('h2');
        let mensaje = mensajeMostrarUsuario + fechaFormateada + mensajeUsuario;
        fechaTitulo.textContent = mensaje;
        fechaTitulo.classList.add('mensajeUsuario');
        calendarioContainer.appendChild(fechaTitulo);
        
  }else {

        //Aqui creamos el elemento donde nos muestra el error del usuario al ingresar mal la fecha...
        let fechaTitulo = document.createElement('h2');
        fechaTitulo.textContent = '"' + valorInput + '"' + ' La fecha ingresada no es correcta';
        fechaTitulo.classList.add('mensajeUsuarioError');
        calendarioContainer.appendChild(fechaTitulo);
        let tablaComprimidos = buscarPorId('tablaComprimidos');

        //creamo el boton para recargar la pag para que se pueda volver a ingresar la fecha...
        let btnRecargarPag = document.createElement('button');
        btnRecargarPag.textContent = 'Recargar página';
        btnRecargarPag.className = 'btnRecargar';
        btnRecargarPag.id = 'btnRecargar';
        calendarioContainer.appendChild(btnRecargarPag);

        btnRecargarPag.addEventListener('click', function(){
          location.reload();
        })

    if (tablaComprimidos) {
      tablaComprimidos.remove();
    }
  }
}

function btnEvent() {

    //Aqui creamos el evento click del boton y agremos el calendario .
    let btnElemento = buscarPorId('btnFiltarNombre');
    let elementInput = buscarPorId('cajaInput');
    const nombreInput = document.getElementById('nombreInput');
    
    btnElemento.addEventListener('click', function() {
      
      if (nombreInput.value.trim() !== '') {
        if (elementInput.value.trim() !== '') {

          buscadorDeFecha(' debe tomar el comprimido que indica la tableta en amarillo');
  
          if (nombreInput.value.trim() && elementInput.value.trim()) {
            verificacionCampos();
            validacionFechaATomarComprimido(elementInput.value);

            let btnRecargarPag = document.createElement('button');
            btnRecargarPag.textContent = 'Recargar página';
            btnRecargarPag.className = 'btnRecargar';
            btnRecargarPag.id = 'btnRecargar';
            calendarioContainer.appendChild(btnRecargarPag);

        btnRecargarPag.addEventListener('click', function(){
          location.reload();
        })
          }
        } else {
          alert('Por favor, ingresa la fecha de inicio del tratamiento.');
        }
      } else {
        alert('Por favor, ingresa tu nombre primero.');
      } 
      
      
  });
}
  
  function verificacionCampos() {

    //Aqui recorremos los elementos del div uno por uno con un loop for hacemos la verificacion de los campos que no esten incompletos..
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
    }  
}     
     
  function validacionFechaATomarComprimido(elementoinputUsuario) {
    let fechaValorUsuario = elementoinputUsuario;
    let fechaFormateada = new Date(fechaValorUsuario);
    let fechaActual = new Date();
  
    let diferenciaTiempo = fechaFormateada.getTime() - fechaActual.getTime();
    let diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
    let diferenciaDiasValorAbsoluto = Math.abs(diferenciaDias);
  
    let indicesConNumero = obtenerIndicesConNumero();
    let repeticiones = diferenciaDiasValorAbsoluto;
    let indiceActual = 0;
  
    for (let i = 0; i < repeticiones; i++) {
      let indice = indicesConNumero[indiceActual];
      let celda = document.getElementsByTagName('td')[indice];
  
      if (i === repeticiones) {
      } else {
        celda.classList.add('tomado');
      } 
  
      if (i === repeticiones - 1) {
        let siguienteIndice = indicesConNumero[indiceActual + 1];
        let siguienteCelda = document.getElementsByTagName('td')[siguienteIndice];
        siguienteCelda.classList.add('resaltado-siguiente');
      }
  
      indiceActual++;
      if (indiceActual >= indicesConNumero.length) {
        indiceActual = 0;
      }
      for (let i = repeticiones % 28; i < 28; i++) {
        let indice = indicesConNumero[i];
        let celda = document.getElementsByTagName('td')[indice];
        celda.classList.remove('tomado');
        celda.classList.add('gris');
      }
    }
  }
  
function obtenerIndicesConNumero() {
      let tablaComprimidos = document.getElementById('tablaComprimidos');
      let celdas = tablaComprimidos.getElementsByTagName('td');
      let indices = [];
      
        for (let i = 0; i < celdas.length; i++) {
          let celda = celdas[i];
          let contenido = celda.textContent.trim();
      
          if (contenido !== '') {
            let numero = parseInt(contenido);
            if (!isNaN(numero)) {
              indices.push(i);
            }
          }
        }
      
        return indices;
      }

   function btnFiltrarHasta(){
    let btnFiltrar = buscarPorId('btnFiltrarHasta');

    btnFiltrar.addEventListener('click', function(){

      buscadorDeFecha(' Mensaje nuevo');
    
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

      let nuevoInputFiltarHasta = document.createElement('input');
      nuevoInputFiltarHasta.classList.add('cajaInputFiltrarHasta');
      let elementoContenedor = buscarPorId('conteiner');
      elementoContenedor.appendChild(nuevoInputFiltarHasta);
      nuevoInputFiltarHasta.type = 'Date';

      let nuevoBtnFiltarHasta = document.createElement('button');
      nuevoBtnFiltarHasta.classList.add('btnFiltrarnuevo');
      elementoContenedor.appendChild(nuevoBtnFiltarHasta);
      nuevoBtnFiltarHasta.textContent = 'Filtrar Hasta... ';
      

    })
   

    
  }



      
 btnEvent()
 



/* } else if(mensaje){
  btnFiltrarHasta();
  mensaje.remove
}
 */