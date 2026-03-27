let currentLoc = 1;
let numOfPapers = 7; // Total de hojas físicas
const audioHoja = [
    document.getElementById("sonidoHoja1"),  // Índice 0 (Siguiente)
    document.getElementById("sonidoHoja2"), // Índice 1 (Anterior)
    document.getElementById("resetLibro")  //  Indice 2 (hojear libro)
];

function playSound(accion) {
    // 2. Definimos cuál ID usar según la acción
    let id = 0; 
    
    if (accion === 'next') {
        id = 0; // Sonido para avanzar
    } else if (accion === 'prev') {
        id = 1; // Sonido para retroceder
    }else if(accion === 'reset'){
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


function handlePageClick(event, pageNum) {
    // Detectar si el click fue en la mitad izquierda o derecha
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const isRightSide = x > rect.width / 2;

    if (isRightSide) {
        next();
    } else {
        prev();
    }
}

function next() {
    if (currentLoc <= numOfPapers) {
        playSound('next');
        const page = document.getElementById(`p${currentLoc}`);
        page.classList.add("flipped");
        page.style.zIndex = currentLoc;

        if (currentLoc === 1) {
            document.getElementById("book").style.transform = "translateX(50%)";
        }

        if (currentLoc === numOfPapers) {
            // Si es la última página, esperamos un momento y reseteamos
            setTimeout(resetBook, 2000);
            document.getElementById("boton-revelado").style.display = "block";
        }
        currentLoc++;
    }
}

function prev() {
    if (currentLoc > 1) {
        playSound('prev');
        currentLoc--;
        const page = document.getElementById(`p${currentLoc}`);
        page.classList.remove("flipped");
        page.style.zIndex = (numOfPapers - currentLoc + 1);

        if (currentLoc === 1) {
            document.getElementById("book").style.transform = "translateX(0%)";
        }
    }
}

function resetBook() {
    document.getElementById("book").style.transform = "translateX(0%)";
    
    // 1. Iniciamos el sonido de 'reset' (o ráfaga de hojas)
    playSound('reset'); 

    for (let i = numOfPapers; i >= 1; i--) {
        setTimeout(() => {
            const page = document.getElementById(`p${i}`);
            page.classList.remove("flipped");
            page.style.zIndex = (numOfPapers - i + 1);

            // 2. Si es la ÚLTIMA hoja en cerrarse (i === 1)
            if (i === 1) {
                // Le damos un pequeño margen extra para que termine el efecto visual
                setTimeout(() => {
                    stopSound('reset'); 
                }, 500); 
            }
        }, (numOfPapers - i) * 100);
    }
    currentLoc = 1;
}