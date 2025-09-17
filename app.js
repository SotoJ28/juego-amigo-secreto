let listaAmigos = [];

function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (!nombre) {
        alert('Por favor ingresa un nombre válido.');
        return;
    }

    if (listaAmigos.includes(nombre)) {
        alert('Este nombre ya ha sido agregado.');
        input.value = '';
        return;
    }

    listaAmigos.push(nombre);
    //console.log('Amigos actuales:', listaAmigos); // Verifica la lista actual
    input.value = '';
    mostrarListaAmigos();
}

function mostrarListaAmigos() {
    const ul = document.getElementById('listaAmigos');
    ul.innerHTML = ''; // Limpiar antes de volver a mostrar

    listaAmigos.forEach(nombre => {
        const li = document.createElement('li');
        li.textContent = nombre;
        ul.appendChild(li);
    });
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert('Debes agregar al menos 2 amigos para hacer el sorteo.');
        return;
    }

    const disponibles = [...listaAmigos];
    const asignaciones = {};
    let valido = false;
    let intentos = 0;
    const maxIntentos = 100;

    while (!valido && intentos < maxIntentos) {
        intentos++;
        let asignacionesTemp = {};
        let copiaDisponibles = [...disponibles];
        valido = true;

        for (let amigo of listaAmigos) {
            let opciones = copiaDisponibles.filter(n => n !== amigo);
            //console.log(`Opciones para ${amigo}:`, opciones); // Muestra opciones posibles

            if (opciones.length === 0) {
                valido = false;
                break;
            }

            let elegido = opciones[Math.floor(Math.random() * opciones.length)];
            asignacionesTemp[amigo] = elegido;
            copiaDisponibles = copiaDisponibles.filter(n => n !== elegido);
        }

        if (valido) {
            Object.assign(asignaciones, asignacionesTemp);
        }
    }

    if (!valido) {
        alert('No se pudo generar un sorteo válido. Intenta de nuevo.');
        return;
    }

    mostrarResultados(asignaciones);
    //console.log('Asignaciones finales:', asignaciones); // Muestra las asignaciones finales
}

function mostrarResultados(asignaciones) {
    const ul = document.getElementById('resultado');
    ul.innerHTML = ''; // Limpiar antes de mostrar resultados

    for (let amigo in asignaciones) {
        const li = document.createElement('li');
        li.textContent = `${amigo} → ${asignaciones[amigo]}`;
        ul.appendChild(li);
    }
}

function reiniciarJuego() {
    // Vacía el estado
    listaAmigos = [];

    // Limpia UI
    const input = document.getElementById('amigo');
    const ulLista = document.getElementById('listaAmigos');
    const ulResultado = document.getElementById('resultado');

    if (input) input.value = '';
    if (ulLista) ulLista.innerHTML = '';
    if (ulResultado) ulResultado.innerHTML = '';
}


