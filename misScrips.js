function buscarPorId(elementoId){
    let elementoDocumento = document.getElementById(elementoId);
    return elementoDocumento;
}

function valorExtraerInput(elementoExtraelValor){
  let elementInputText = buscarPorId(elementoExtraelValor)
    let valorInput = elementInputText.value
    return valorInput;
}

function buscadorDeFecha(mensajeUsuario){

  let fechaActual, fecha, fechaFormateada;
  [fechaActual, fecha, fechaFormateada] = buscadorDeFechas('cajaInput');
   
  let mensajeMostrarUsuario = '"'+ valorExtraerInput('nombreInput') +'"' + ' usted unicio el tratamiento el dia ' + fechaFormateada + mensajeUsuario;

  //Aqui extraemos la fecha que ingresa el usuario y la transformamos en el formato que deseado, para asi poder hacer la validacion...

  if (fecha < fechaActual) {

        //Aqui validamos que la fecha del inicio del tratamiento no sea una fecha del futuro... 
        crearElementosDinamicos('h2', mensajeMostrarUsuario, 'mensajeUsuario', 'calendarioContainer');

  }else {
        
       // Aquí creamos el elemento donde nos muestra el error del usuario al ingresar mal la fecha...
    crearElementosDinamicos('h2', '"' + valorExtraerInput('nombreInput') + '"' + ' La fecha ingresada no es correcta', 'mensajeUsuarioError', 'calendarioContainer');

    // Creamos el botón para recargar la página para que se pueda volver a ingresar la fecha...
    btnRecargarPag('button', 'Recargar página', 'btnRecargar', 'btnRecargar', calendarioContainer);
    
       let tablaComprimidos = buscarPorId('tablaComprimidos');
    if (tablaComprimidos) {
      tablaComprimidos.remove();
    }
  }
}


function btnEvent() {

  //Aqui creamos el evento click del boton y agremos el calendario .
  let btnElemento = buscarPorId('btnFiltarNombre');
  let elementInput = buscarPorId('cajaInput');
  let nombreInput = document.getElementById('nombreInput');
  
  btnElemento.addEventListener('click', function() {
    
    if (nombreInput.value.trim() !== '') {
      if (elementInput.value.trim() !== '') {

        buscadorDeFecha(' debe tomar el comprimido que indica la tableta en amarillo');

        if (nombreInput.value.trim() && elementInput.value.trim()) {
          verificacionCampos();
          validacionFechaATomarComprimido(elementInput.value);

          btnRecargarPag('button', 'Recargar página', 'btnRecargar', 'btnRecargar', calendarioContainer);
      
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

  //Aqui recorremos los elementos del div uno por uno con un loop for of hacemos la verificacion de los campos que no esten incompletos..
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

    buscadorDeFechas('cajaInput');

    let miArray = [
      document.getElementById('labelText'),
      document.getElementById('nombreInput'),
      document.getElementById('btnFiltarNombre'),
      document.getElementById('btnFiltrarHasta'),
      document.getElementById('cajaInput'),
      /* document.getElementById('filtrarNombre') */
    ];
  
    for (let element of miArray) {
      element.style.display = 'none';
    }
  

    let fechaActual, fecha, fechaFormateada;
   [fechaActual, fecha, fechaFormateada] = buscadorDeFechas('cajaInput');

   let mensajeUsuario = '"' + valorExtraerInput('nombreInput') + '"' + ' usted inicio el tratamiendo el dia ' + fechaFormateada + 
   ', si desea saber que comprimido debio tomar en alguna fecha espesifica SOLO INGRESE LA FECHA DESEA Y APLIQUE AL BOTON FILTRAR HASTA ' 

    crearElementosDinamicos('h2', mensajeUsuario , 'h2FiltrarHasta', 'filtrarNombre');

    crearElementosDinamicos('input', '', 'cajaInputFiltrarHasta', 'filtrarNombre', 'date', 'InputValorFechaID')
  
    crearElementosDinamicos('button', 'Filtrar Hasta... ', 'btnFiltrarnuevo', 'filtrarNombre', 'button', 'btnDinamicoFiltrarHasta');
  })
  
    let btnCradoDinamicamente = buscarPorId('btnDinamicoFiltrarHasta');
    let InputValorFechaID = buscarPorId('InputValorFechaID'); 

    if(InputValorFechaID.value.trim() !== ''){
      btnCradoDinamicamente.addEventListener('click', function(){
        let valorEnVariable = valorExtraerInput('InputValorFechaID')
        validacionFechaATomarComprimido(valorEnVariable)
        console.log(validacionFechaATomarComprimido(valorEnVariable))
    })
  }
    
  
 
 

  
}



    
btnEvent()
btnFiltrarHasta()





function buscadorDeFechas(elementoId,){
  let inputTextFecha = buscarPorId(elementoId);
    let valorUsuarioFecha = inputTextFecha.value;

    let fecha = new Date(valorUsuarioFecha  + 'T00:00:00')
    let fechaActual = new Date();
    let fechaFormateada = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

    return[fechaActual, fecha, fechaFormateada]
}

function crearElementosDinamicos(elementoAcrear, mensaje, claseCss, contenedorId, type, nameId ){
  let fechaTitulo = document.createElement(elementoAcrear);
        let mensajee = mensaje
        fechaTitulo.textContent = mensajee;
        fechaTitulo.classList.add(claseCss);
        let contenedorHijo = buscarPorId(contenedorId)
        contenedorHijo.appendChild(fechaTitulo);
        fechaTitulo.id = nameId
        fechaTitulo.type = type;
}

function btnRecargarPag(elemento, nombreBtn, className, nameId, contenedorId){
  let btnRecargarPag = document.createElement(elemento);
  btnRecargarPag.textContent =  nombreBtn;
  btnRecargarPag.className = className;
  btnRecargarPag.id = nameId;
  contenedorId.appendChild(btnRecargarPag);

  btnRecargarPag.addEventListener('click', function(){
    location.reload();
  })
}


