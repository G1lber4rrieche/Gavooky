function abrirSobre() {
    const sobre = document.querySelector(".sobre");
    const carta = document.querySelector(".carta");
    const hint = document.querySelector(".hint");
    const solapa = document.querySelector(".solapa");

    // 1. Abrir solapa
    sobre.classList.add("abierto");
    hint.style.opacity = "0";

    // 2. Esperar a que la solapa termine de abrirse
    setTimeout(() => {
        console.log('saliendo...');
        solapa.classList.add("activa");
        carta.classList.add("saliendo");
    }, 900); // tiempo igual al de la solapa

    // 3. Expandir carta después de que salga del sobre
    setTimeout(() => {
        console.log('ya salo!');
        carta.classList.add("expandida");
    }, 2000);
}

function continuar(event) {
    event.stopPropagation();
    
}
