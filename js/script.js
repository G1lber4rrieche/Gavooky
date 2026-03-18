function checkAccess() {
    const password = document.getElementById('pass-input').value;
    if (password.toLowerCase() === "nuestro-secreto") {
        // Redirección o cambio de pantalla
        document.body.style.transition = "opacity 1s";
        document.body.style.opacity = "0";
        setTimeout(() => {
            // Aquí la redireccionas a tu dashboard de fotos/propuesta
            window.location.href = "dashboard.html"; 
        }, 1000);
    } else {
        // MOSTRAR MODAL EN VEZ DE ALERT
        document.getElementById('custom-modal').style.display = 'flex';
    }
}

function closeModal() {
    document.getElementById('custom-modal').style.display = 'none';
}

function abrirCarta() {
    const sobre = document.getElementById('sobre');
    const instruccion = document.getElementById('instruccion');
    
    // Agregamos la clase que dispara el CSS
    sobre.classList.add('abierto');
    
    // Desvanecemos la instrucción suavemente
    instruccion.style.opacity = "0";
}

function irARespuesta(event) {
    // Evitamos que el click en el botón vuelva a disparar abrirCarta
    event.stopPropagation();
    
    // Aquí puedes esconder el sobre y mostrar el carrusel de respuesta que hicimos antes
    document.querySelector('.envelope-container').style.opacity = "0";
    setTimeout(() => {
        document.querySelector('.envelope-container').style.display = "none";
        // Mostrar la siguiente sección (el carrusel final)
        document.getElementById('final-carousel').style.display = "block";
    }, 800);
}

function abrirTodo() {
    const sobre = document.getElementById('sobre');
    const hint = document.getElementById('hint');
    
    // Dispara la secuencia de apertura
    sobre.classList.add('active');
    
    // Desvanece el texto de ayuda
    hint.style.opacity = "0";
    
    // Permitir scroll en la página después de que la carta suba
    setTimeout(() => {
        document.body.style.overflowY = "auto";
    }, 1000);
}

// Función para descargar la respuesta (Usa html2canvas como vimos antes)
function descargarRespuesta(event) {
    event.stopPropagation(); // Evita que el click cierre/abra cosas
    const area = document.querySelector('.letter-content');
    
    html2canvas(area).then(canvas => {
        const link = document.createElement('a');
        link.download = 'nuestra-historia.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}