// 1. LISTA DE FOTOS (Añade aquí los nombres que metas en /assets/)
const nombresDeArchivos = [
    "[001007].jpg",
    "[001016].jpg",
    "[001051].jpg",
    "[001056].jpg",
    "[001064].jpg",
    "[001084].jpg",
    "[001128].jpg",
    "[001141].jpg",
    "[001142].jpg",
    "[001166].jpg",
    "[001206].jpg",
    "[001217] 1.jpg",
    "[001224] 2.jpg",
    "[001226].jpg",
    "[001254].jpg",
    "[001513].jpg",
    "[001864].jpg",
    "[001873].jpg",
    "[001971].jpg",
    "[002272].jpg",
    "[002769].jpg",
    "[007244].jpg",
    "[007250].jpg",
    "123456.jpg",
    "20130806_211759.jpg",
    "CIMG0038.JPG",
    "CIMG0245_1.JPG",
    "DSC07735.JPG",
    "DSC07987.JPG",
    "IMG_0600.JPG",
    "IMG_0618.JPG",
    "IMG_0625.JPG",
    "IMG_0628.JPG",
    "IMG_0645.JPG",
    "IMG_0653.JPG",
    "IMG_0655.JPG",
    "IMG_0656.JPG",
    "IMG_0659 - copia.JPG",
    "IMG_0662.JPG",
    "IMG_0664.JPG",
    "IMG_0668.JPG",
    "IMG_0718.JPG",
    "IMG_0872.JPG",
    "IMG_1695.JPG",
    "Page2.jpeg"
];

const textoDedicatoria = "Mamá, aquí va tu mensaje personalizado... Eres la mejor del mundo.";

function empezarShow() {
    document.getElementById("musica").play();
    document.getElementById("seccion-inicial").style.display = "none";
    document.getElementById("pagina").style.display = "flex";
    
    // Confeti de colores suaves
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff8fa3', '#ffb3c1', '#ffffff'] });
    
    generarFotos();
}

function generarFotos() {
    const galeria = document.getElementById("galeria");
    const contenedorScroll = document.getElementById("contenedor-scroll");

    // Precarga inicial
    nombresDeArchivos.slice(0, 8).forEach(n => { const p = new Image(); p.src = `./assets/${n}`; });

    function cargarFoto(index) {
        if (index >= nombresDeArchivos.length) {
            setTimeout(escribirDedicatoria, 3000);
            return;
        }

        const div = document.createElement("div");
        div.className = "foto-item";
        div.style.setProperty('--r', `${(Math.random() * 6 - 3)}deg`);
        const img = document.createElement("img");

        img.onload = () => {
            galeria.appendChild(div);
            div.appendChild(img);
            
            setTimeout(() => {
                div.classList.add("aparecer");
                // Solo hace scroll si el usuario no ha subido manualmente
                const estaAlFinal = (contenedorScroll.scrollHeight - contenedorScroll.scrollTop) <= (contenedorScroll.clientHeight + 300);
                if (estaAlFinal) {
                    const offset = div.offsetTop - 180;
                    contenedorScroll.scrollTo({ top: offset, behavior: 'smooth' });
                }
                setTimeout(() => cargarFoto(index + 1), 2500);
            }, 100);
        };
        img.src = `./assets/${nombresDeArchivos[index]}`;
    }
    cargarFoto(0);
}

let letraDedi = 0;
function escribirDedicatoria() {
    const contenedor = document.getElementById("dedicatoria");
    if (letraDedi < textoDedicatoria.length) {
        contenedor.innerHTML += textoDedicatoria.charAt(letraDedi);
        letraDedi++;
        setTimeout(escribirDedicatoria, 60);
    } else {
        confetti({ particleCount: 500, spread: 160, origin: { y: 0.7 } });
    }
}