const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const mensaje = document.getElementById("mensaje").value.trim();
    
    const mensaje_cifrar = mensaje.normalize('NFD').replace(/[\u0300-\u036f]/g,""); // Permite borrar los acentos
    let texto_cifrado = "";
    for(let caracter of mensaje_cifrar) {
        const ascii = caracter.charCodeAt(0);

        let nuevo_codigo = null;
        if(esMinuscula(ascii)) {
            nuevo_codigo = desplazarPosiciones(ascii, 97, 122);
        } else if(esMayuscula(ascii)) {
            nuevo_codigo = desplazarPosiciones(ascii, 65, 90);
        }

        texto_cifrado += nuevo_codigo ? String.fromCharCode(nuevo_codigo) : caracter;
    }

    document.getElementById("cifrado").innerText = texto_cifrado;
});

const desplazarPosiciones = (codigo, min, max) => {
    const desplazamiento = parseInt(document.getElementById("desplazamiento").value);
    const posicion = document.getElementById("posicion").value;
    let nuevo_codigo = codigo;

    if(posicion === "derecha") {
        for(let i = 0; i < desplazamiento; i++) {
            nuevo_codigo += 1;
            if(nuevo_codigo > max) {
                nuevo_codigo = min;
            }
        }
    } else {
        for(let i = 0; i < desplazamiento; i++) {
            nuevo_codigo -= 1;
            if(nuevo_codigo < min) {
                nuevo_codigo = max;
            }
        }
    }
    
    return nuevo_codigo;
}

const esMinuscula = (codigo) => {
    if(codigo >= 97 && codigo <= 122) {
        return true;
    }
    return false;
}

const esMayuscula = (codigo) => {
    if(codigo >= 65 && codigo <= 90) {
        return true;
    }
    return false;
}