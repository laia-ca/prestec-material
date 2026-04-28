// Declaració de variables
let llistaPrestecs = []
let indexEdicio = null

// Elements del DOM
const campNomEstudiant = document.getElementById('nomEstudiant')
const campMaterial = document.getElementById('materialSeleccionat')
const campRetornat = document.getElementById('estatRetornat')
const botoGuardar = document.getElementById('botoGuardar')
const TaulaPrestecs = document.getElementById('TaulaPrestecs')

botoGuardar.addEventListener('click', guardarPrestec)

// C i U de CRUD (Create, Update)
function guardarPrestec() {
    // Llegim les dades del formulari
    const nomEstudiant = campNomEstudiant.value.trim()
    const materialSeleccionat = campMaterial.value
    const tornMarcat = document.querySelector("input[name='tornPrestec']:checked")
    const Retornat = campRetornat.checked // Retorna true o false

    // Validem els camps obligatoris
    if (nomEstudiant === "" || materialSeleccionat === "" || !tornMarcat) {
        alert('Sisplau, emplena el formulari amb el nom, el material i el torn.')
        return
    }

    // Creem l'objecte
    const nouPrestec = {
        nom: nomEstudiant,
        material: materialSeleccionat,
        torn: tornMarcat.value,
        retornat: Retornat
    }

    // Si no ho estem editant, hi afegim un de nou. Si ho estem editant, ho actualitzem.
    if (indexEdicio === null) {
        llistaPrestecs.push(nouPrestec)
    } else {
        llistaPrestecs[indexEdicio] = nouPrestec
        indexEdicio = null
        botoGuardar.textContent = 'Afegir prèstec'
        botoGuardar.classList.remove('btn-warning')
        botoGuardar.classList.add('btn-info')
    }

    netejarFormulari()
    mostrarPrestecs()
}

// R de CRUD (Read)
function mostrarPrestecs() {
    TaulaPrestecs.innerHTML = ""

    // Validem si l'array està buit per mostrar el missatge obligatori
    if (llistaPrestecs.length === 0) {
        TaulaPrestecs.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted">No s'ha registrat cap prèstec</td>
            </tr>
        `
        return
    }

    // Recorrem l'array i pintem les dades
    llistaPrestecs.forEach((prestec, index) => {
        // Convertim el booleà a un text més amigable (sí o no)
        const textRetornat = prestec.retornat ? '<span class="badge bg-success">Sí</span>' : '<span class="badge bg-danger">No</span>'

        TaulaPrestecs.innerHTML += `
            <tr>
                <td>${prestec.nom}</td>
                <td>${prestec.material}</td>
                <td>${prestec.torn}</td>
                <td>${textRetornat}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2" onclick="editarPrestec(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="esborrarPrestec(${index})">Esborrar</button>
                </td>
            </tr>
        `
    })
}

// Netegem el formulari després de guardar
function netejarFormulari() {
    campNomEstudiant.value = ""
    campMaterial.value = ""
    campRetornat.checked = false
    document.querySelectorAll("input[name='tornPrestec']").forEach(radio => {
        radio.checked = false
    })
}

// D de CRUD (Delete)
function esborrarPrestec(index) {
    llistaPrestecs.splice(index, 1)
    mostrarPrestecs()
}

// U de CRUD (Update)
function editarPrestec(index) {
    const prestec = llistaPrestecs[index]

    // Carreguem dades en els inputs
    campNomEstudiant.value = prestec.nom
    campMaterial.value = prestec.material
    campRetornat.checked = prestec.retornat

    const radioTorn = document.querySelector(`input[name="tornPrestec"][value="${prestec.torn}"]`)
    if (radioTorn) {
        radioTorn.checked = true
    }

    indexEdicio = index

    // Canviem l'aspecte del botó
    botoGuardar.textContent = 'Guardar canvis'
    botoGuardar.classList.remove('btn-info')
    botoGuardar.classList.add('btn-warning')
}

// Mostrem l'estat inicial en carregar la pàgina (que es vegi el missatge "No s'ha registrat cap prèstec")
mostrarPrestecs()