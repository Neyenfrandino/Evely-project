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
  let mensajeMostrarUsuario = '"'+ valorExtraerInput('nombreInput') +'"' + ' usted inicio el tratamiento el dia ' + 
                              fechaFormateada + mensajeUsuario;

  //Aqui extraemos la fecha que ingresa el usuario y la transformamos en el formato que deseado, para asi poder hacer la validacion...
  if (fecha < fechaActual) {
        //Aqui validamos que la fecha del inicio del tratamiento no sea una fecha del futuro... 
        crearElementosDinamicos('h2', mensajeMostrarUsuario, 'mensajeUsuario', 'calendarioContainer');
  } else {
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
          validacionFechaATomarComprimido(elementInput.value, new Date());
          btnRecargarPag('button', 'Recargar página', 'btnRecargar', 'btnRecargar', calendarioContainer);
        }
      } else {
        let icono = buscarPorId('iconoValidacioon');
        icono.style.opacity = '1';
        let formularioInputError = buscarPorId('formulario__input-Error');
        formularioInputError.style.display = 'block';

        /* alert('Por favor, ingresa la fecha de inicio del tratamiento.'); */
      }
    } else {
      let icono = buscarPorId('iconoValidacion');
        icono.style.opacity = '1';
        let formularioInputError = buscarPorId('formulario__input-error');
        formularioInputError.style.display = 'block';
        
      /* alert('Por favor, ingresa tu nombre primero.'); */
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
    element.style.display = 'none';
  }
  if(miArray != null){
      let miTabla = buscarPorId('tablaComprimidos');
      miTabla.style.display = 'inline-block'
  }  
}     
   
function validacionFechaATomarComprimido(elementoinputUsuario, variableFechaDeseada) {
  let fechaValorUsuario = elementoinputUsuario;
  let fechaFormateada = new Date(fechaValorUsuario);
  let zonaHorariaColombia = 'America/Bogota';

  // Convertir la fecha al formato correcto de Colombia
  fechaFormateada.toLocaleString('es-CO', { timeZone: zonaHorariaColombia });
  console.log(fechaFormateada + ' - esta es la fecha del usuario en Colombia');
  let fechaDeseada = new Date(variableFechaDeseada);
  fechaDeseada.setHours(0, 0, 0, 0);

  let diferenciaTiempo = fechaFormateada.getTime() - fechaDeseada.getTime();
  let diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
  let diferenciaDiasValorAbsoluto = Math.abs(diferenciaDias);

  let indicesConNumero = obtenerIndicesConNumero();
  let repeticiones = diferenciaDiasValorAbsoluto + 1 ;
  let indiceActual = 0;

  for (let i = 0; i < repeticiones; i++) {
    let indice = indicesConNumero[indiceActual];
    let celda = document.getElementsByTagName('td')[indice];

    if (i === repeticiones) {
    } else {
      celda.classList.add('tomado');
    } 

    if (i === repeticiones - 1) {
      let siguienteIndice = indicesConNumero[indiceActual];
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
      celda.classList.add('gris');
      celda.classList.remove('tomado');
      
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
    let elementInput = buscarPorId('cajaInput');
    let nombreInput = document.getElementById('nombreInput');

    if (nombreInput.value.trim() !== '') {
      if (elementInput.value.trim() !== '') {
      let miArray = [
        document.getElementById('labelText'),
        document.getElementById('nombreInput'),
        document.getElementById('btnFiltarNombre'),
        document.getElementById('btnFiltrarHasta'),
        document.getElementById('cajaInput')
      ];
    
      for (let element of miArray) {
        element.style.display = 'none';
      }
  
      let mensajeUsuario = '"' + valorExtraerInput('nombreInput') + '"' + ' usted inicio el tratamiendo el dia ' 
                           + buscadorDeFechas('cajaInput')[2] 
                           + '. Si desea saber que comprimido debio tomar en alguna fecha específica, SOLO INGRESE LA FECHA QUE DESEA Y APLIQUE AL BOTON FILTRAR HASTA ' 
  
      crearElementosDinamicos('h2', mensajeUsuario,  'h2FiltrarHasta', 'filtrarNombre', '', 'h2FiltrarHastaId');
      crearElementosDinamicos('input', '', 'cajaInputFiltrarHasta', 'filtrarNombre', 'date', 'InputValorFechaID');
      crearElementosDinamicos('button', 'Filtrar Hasta... ', 'btnFiltrarnuevo', 'filtrarNombre', 'button', 'btnDinamicoFiltrarHasta');
  
      let btnCradoDinamicamente = buscarPorId('btnDinamicoFiltrarHasta');
      btnCradoDinamicamente.addEventListener('click', function() {
  
        if(InputValorFechaID.value.trim() !== ''){
          let fechaSecundaria = buscarPorId('InputValorFechaID');
          let valorFechaSecundariaUsuario = new Date(fechaSecundaria.value + 'T00:00:00');  
          let fechaAUsuar = buscadorDeFechas('cajaInput')[1];
    
          validacionFechaATomarComprimido(fechaAUsuar, valorFechaSecundariaUsuario);
          verificacionCampos()
          let contenedor = buscarPorId('filtrarNombre');
          contenedor.style.display = 'block';
    
          let miArray = [
            document.getElementById('InputValorFechaID'),
            document.getElementById('btnDinamicoFiltrarHasta')
          ];
          
          for (let element of miArray) {
            element.style.display = 'none';
          }
          
          let mensajeFinal = 'El inicio de su tratamiento fue el dia ' + buscadorDeFechas('cajaInput')[2] + '. Usted el dia ' + valorFechaSecundariaUsuario.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) + ' deberia haber tomado el comprimido que indica la tableta en amarillo' 
          let mensajeAnterior = buscarPorId('h2FiltrarHastaId');
          mensajeAnterior.textContent = mensajeFinal
          btnRecargarPag('button', 'Recargar página', 'btnRecargarFinal', 'btnRecargar', filtrarNombre);
        }
      }) 
    } else {
     
      alert('Por favor, ingresa la fecha de inicio del tratamiento.');
    }
  } else {
    alert('Por favor, ingresa tu nombre primero.');
  } 
});

}

function setTreatmentBeginDate(){
	let beginDate = new Date('2022-12-05');

	let year = beginDate.getFullYear().toString();
	let month = (beginDate.getMonth() + 1).toString().padStart(2, '0');
	let day = (beginDate.getDate()+1).toString().padStart(2, '0');

	let finalDate = `${year}-${month}-${day}`;
	document.getElementById('cajaInput').value = finalDate;
}





    
btnEvent()
btnFiltrarHasta()
setTreatmentBeginDate()





function buscadorDeFechas(elementoId){
  let inputTextFecha = buscarPorId(elementoId);
    let valorUsuarioFecha = inputTextFecha.value;
    let fecha = new Date(valorUsuarioFecha  + 'T00:00:00')
    let fechaActual = new Date();
    let fechaFormateada = fecha.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });

    return[fechaActual, fecha, fechaFormateada]
}
/* 
crearElementosDinamicos('h2', mensajeUsuario , 'h2FiltrarHasta', 'filtrarNombre', 'h2FiltrarHastaId'); */

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

