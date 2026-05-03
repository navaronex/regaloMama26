const nombresDeArchivos = [
    "[001007].jpg", "[001016].jpg", "[001051].jpg", "[001056].jpg", "[001064].jpg",
    "[001084].jpg", "[001128].jpg", "[001141].jpg", "[001142].jpg", "[001166].jpg",
    "[001206].jpg", "[001217] 1.jpg", "[001224] 2.jpg", "[001226].jpg", "[001254].jpg",
    "[001513].jpg", "[001864].jpg", "[001873].jpg", "[001971].jpg", "[002272].jpg",
    "[002769].jpg", "[007244].jpg", "[007250].jpg", "123456.jpg", "20130806_211759.jpg",
    "CIMG0038.JPG", "CIMG0245_1.JPG", "DSC07735.JPG", "DSC07987.JPG", "IMG_0600.JPG",
    "IMG_0618.JPG", "IMG_0625.JPG", "IMG_0628.JPG", "IMG_0645.JPG", "IMG_0653.JPG",
    "IMG_0655.JPG", "IMG_0656.JPG", "IMG_0659 - copia.JPG", "IMG_0662.JPG", "IMG_0664.JPG",
    "IMG_0668.JPG", "IMG_0718.JPG", "IMG_0872.JPG", "IMG_1695.JPG", "Page2.jpeg"
];

const textoDedicatoria = "Mamá, gracias por ser nuestro pilar, por tu amor infinito y por cada sonrisa. Eres el corazón de esta familia. ¡Te queremos muchísimo!";

function empezarShow() {
    document.getElementById("musica").play();
    document.getElementById("seccion-inicial").style.display = "none";
    document.getElementById("pagina").style.display = "flex";
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff8fa3', '#ffffff'] });
    generarFotos();
}

function generarFotos() {
    const galeria = document.getElementById("galeria");
    const contenedorScroll = document.getElementById("contenedor-scroll");

    function cargarFoto(index) {
        if (index >= nombresDeArchivos.length) {
            setTimeout(escribirDedicatoria, 4000);
            return;
        }

        const div = document.createElement("div");
        div.className = "foto-item";
        
        // Creamos la imagen
        const img = document.createElement("img");
        
        // Creamos el pie de foto
        const pie = document.createElement("div");
        pie.className = "pie-foto";
        pie.innerText = "Nuestros recuerdos ❤️"; // Puedes cambiar esto si quieres textos distintos

        img.onload = () => {
            div.appendChild(img);
            div.appendChild(pie);
            galeria.appendChild(div);
            
            setTimeout(() => {
                div.classList.add("aparecer");
                
                // SCROLL AUTOMÁTICO FORZADO
                const yOffset = -120; 
                const y = div.getBoundingClientRect().top + contenedorScroll.scrollTop + yOffset;
                contenedorScroll.scrollTo({ top: y, behavior: 'smooth' });

                // TIEMPO ENTRE FOTOS: 4.5 segundos (4500ms)
                setTimeout(() => cargarFoto(index + 1), 4500);
            }, 200);
        };

        // SI UNA FOTO FALLA, SALTAMOS A LA SIGUIENTE PARA NO BLOQUEAR EL SHOW
        img.onerror = () => {
            console.log("Error cargando: " + nombresDeArchivos[index]);
            cargarFoto(index + 1);
        };

        img.src = `./assets/${nombresDeArchivos[index]}`;
    }
    cargarFoto(0);
}

let letraDedi = 0;
function escribirDedicatoria() {
    const contenedor = document.getElementById("dedicatoria");
    const scroll = document.getElementById("contenedor-scroll");
    if (letraDedi < textoDedicatoria.length) {
        contenedor.innerHTML += textoDedicatoria.charAt(letraDedi);
        letraDedi++;
        scroll.scrollTo({ top: scroll.scrollHeight, behavior: 'smooth' });
        setTimeout(escribirDedicatoria, 70);
    } else {
        confetti({ particleCount: 500, spread: 160, origin: { y: 0.7 } });
    }
}
