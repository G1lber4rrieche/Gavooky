function abrirSobre() {
    const sobre = document.querySelector(".sobre");
    const carta = document.querySelector(".carta");
    const hint = document.querySelector(".hint");
    const solapa = document.querySelector(".solapa");

    // 1. Abrir solapa
    sobre.classList.add("abierto");
    hint.style.opacity = "0";
    playSound('abrir');

    // 2. Esperar a que la solapa termine de abrirse
    setTimeout(() => {
        console.log('saliendo...');
        playSound('saliendo');
        solapa.classList.add("activa");
        carta.classList.add("saliendo");
    }, 900); // tiempo igual al de la solapa

    // 3. Expandir carta después de que salga del sobre
    setTimeout(() => {
        console.log('ya salo!');
        playSound('expandir');
        carta.classList.add("expandida");
    }, 2000);
}

function continuar(event) {
    event.stopPropagation();
    
}

const audioHoja = [
    document.getElementById("sonidoHoja1"),  // Índice 0 (Siguiente)
    document.getElementById("sonidoHoja2"), // Índice 1 (Anterior)
    document.getElementById("resetLibro")  //  Indice 2 (hojear libro)
];

function playSound(accion) {
    // 2. Definimos cuál ID usar según la acción
    let id = 0; 
    
    if (accion === 'expandir') {
        id = 0; // Sonido para avanzar
    } else if (accion === 'saliendo') {
        id = 1; // Sonido para retroceder
    }else if(accion === 'abrir'){
        id = 2;
    }

    // 3. Verificamos que el audio exista antes de darle Play (Good Practice)
    if (audioHoja[id]) {
        audioHoja[id].currentTime = 0; 
        audioHoja[id].play().catch(e => console.log("Error al reproducir:", e));
    }
}

function stopSound(accion) {
    let id = 2;
    if (accion === 'reset') id = 2; // O el índice que uses para el reset
    
    if (audioHoja[id]) {
        audioHoja[id].pause();
        audioHoja[id].currentTime = 0;
    }
}