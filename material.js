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

// C i U de CRUD (Create i Update)
function guardarPrestec() {
    // Llegim les dades del formulari
    const nomEstudiant = campNomEstudiant.value.trim()
    const materialSeleccionat = campMaterial.value
    const tornMarcat = document.querySelector("input[name='tornPrestec']:checked")
    const Retornat = campRetornat.checked

    // Validem els camps obligatoris
    if (nomEstudiant === "" || materialSeleccionat === "" || !tornMarcat) {
        alert('Sisplau, emplena el formulari amb el nom, el material i el torn.')
        return
    }

    // Creem l'objecte amb la informació
    const nouPrestec = {
        nom: nomEstudiant,
        material: materialSeleccionat,
        torn: tornMarcat.value,
        retornat: Retornat
    }

    // Lògica per decidir si creem (C) o actualitzem (U)
    if (indexEdicio === null) {
        llistaPrestecs.push(nouPrestec)
    } else {
        llistaPrestecs[indexEdicio] = nouPrestec
        indexEdicio = null
        botoGuardar.textContent = 'Afegir prèstec'
        botoGuardar.classList.replace('btn-warning', 'btn-info')
    }

    netejarFormulari()
    mostrarPrestecs()
}

// R de CRUD (Read)
function mostrarPrestecs() {
    TaulaPrestecs.innerHTML = ""

    // Si l'array està buit, mostrem el missatge
    if (llistaPrestecs.length === 0) {
        TaulaPrestecs.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted">No s'ha registrat cap prèstec</td>
            </tr>
        `
        return
    }

    // Recorrem l'array per generar l'HTML
    llistaPrestecs.forEach((prestec, index) => {
        const textRetornat = prestec.retornat ?
            '<span class="badge bg-success">Sí</span>' :
            '<span class="badge bg-danger">No</span>'

        TaulaPrestecs.innerHTML += `
            <tr>
                <td>${prestec.nom}</td>
                <td>${prestec.material}</td>
                <td>${prestec.torn}</td>
                <td>${textRetornat}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-1" onclick="carregarDadesEdicio(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="esborrarPrestec(${index})">Esborrar</button>
                </td>
            </tr>
        `
    })
}

// U de CRUD (Update)
function carregarDadesEdicio(index) {
    const prestec = llistaPrestecs[index]

    // Passem les dades de l'array als inputs del formulari
    campNomEstudiant.value = prestec.nom
    campMaterial.value = prestec.material
    campRetornat.checked = prestec.retornat

    const radioTorn = document.querySelector(`input[name="tornPrestec"][value="${prestec.torn}"]`)
    if (radioTorn) radioTorn.checked = true

    indexEdicio = index

    // Canviem el botó per indicar l'estat d'edició
    botoGuardar.textContent = 'Guardar canvis'
    botoGuardar.classList.replace('btn-info', 'btn-warning')
}

// D de CRUD (Delete)
function esborrarPrestec(index) {
    llistaPrestecs.splice(index, 1)
    mostrarPrestecs()
}

// Netegem el formulari després de guardar
function netejarFormulari() {
    campNomEstudiant.value = ""
    campMaterial.value = ""
    campRetornat.checked = false
    document.querySelectorAll("input[name='tornPrestec']").forEach(r => r.checked = false)
}

// Inicialització
mostrarPrestecs()