function buscarPorId(elementoId){
    let elementoDocumento = document.getElementById(elementoId);
    return elementoDocumento;
}

function buscadorDeFecha(){
    let inputTextFecha = buscarPorId('cajaInput');
    let valorUsuario = inputTextFecha.value
    let fecha = new Date(valorUsuario  + 'T00:00:00')

    if(!valorUsuario){
        console.log('ingreso fecha correctamente')
        return;
    }

    let calendarioContainer = buscarPorId('calendarioContainer');
    calendarioContainer.innerHTML= '';

    let fechaFormateada = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    let fechaTitulo = document.createElement('h2');
    fechaTitulo.textContent = fechaFormateada;
    calendarioContainer.appendChild(fechaTitulo);

}

function calendario(){
    for(let i = 0; i < 7; i++){
        fecha.setDate(fecha.getDate() - 1);
        let opciones = { day: 'numeric', month: 'long', year: 'numeric' };
        let fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
        console.log(fechaFormateada);
     }
}







 