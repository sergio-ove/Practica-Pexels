document.addEventListener('DOMContentLoaded', () => {

    const espacioSection = document.querySelector('#sectionFotos')
    const espacioUsuario = document.querySelector('#sectionUsuario')
    const titularUsuario = document.querySelector('#h1Titular')
    const espacioAutor = document.querySelector('#sectionFotosAutor')
    const boton = document.querySelector('#idbuton')
    const sectionCollage = document.querySelector('#sectionCollage')
    const fragment = document.createDocumentFragment('#idbuton')
    const url = 'https://api.pexels.com/v1/'
    const token = 'ENXbvUOKkmUuD55KAaHBOma05htDc24r3MyyIbu8Ys2VPTYfLvTRjyS2'
    const form = document.querySelector('#formulario')

    const arrayMisFotos = [

        {
            id: 1657328,
            categoria: 'football',
            url: 'https://images.pexels.com/photos/1657328/pexels-photo-1657328.jpeg?auto=compress&cs=tinysrgb&h=350'
        },
        {
            id: 376464,
            categoria: 'food',
            url: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&h=350'
        },
        {
            id: 220201,
            categoria: 'space',
            url: 'https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?auto=compress&cs=tinysrgb&h=350'
        },

    ]


    document.addEventListener('click', (ev) => {

        ev.preventDefault()

        if (ev.target.className == "inputSubmit") {
            espacioUsuario.innerHTML = ""
            titularUsuario.innerHTML = ""
            boton.innerHTML = ""
            const palabraUsuario = document.querySelector('#idInputText').value
            console.log(palabraUsuario);
            pintarPalabraClave(palabraUsuario)

        } if (ev.target.className == "imagenAutores"){
            // pintarCollage()
        }



    })





    const consulta = async (urlApi) => {

        try {
            const fetchApi = await fetch(`${url}/${urlApi}`, {
                method: 'GET',
                headers: {
                    Authorization: token
                },
            })

            if (fetchApi.ok) {

                const datos = await fetchApi.json()

                return {
                    ok: true,
                    datos
                }


            } else {

                throw ('existe un error')

            }

        } catch (error) {
            return {
                ok: false,
                datos: error
            }

        }

    }


    const numerosAleatorios = () => {

        const numerosAleatorios = []

        while (numerosAleatorios.length < 3) {
            const cadaFoto = Math.floor(Math.random() * 15);
            if (numerosAleatorios.indexOf(cadaFoto) == -1) {
                numerosAleatorios.push(cadaFoto);
            }
        }

        return numerosAleatorios
    }


    const pintarPrincipales = async () => {

        const arrayDatos = await consulta('curated')

        const arrayFotos = arrayDatos.datos.photos

        const arraySeleccionado = []

        const indexArrayFoto = numerosAleatorios()

        arrayFotos.find((element, index) => {
            if (index === indexArrayFoto[0] || index === indexArrayFoto[1] || index === indexArrayFoto[2]) {
                arraySeleccionado.push(element)
            }
        })

        if (arrayDatos.ok) {

            arraySeleccionado.forEach(element => {

                const figureTresFotos = document.createElement('FIGURE');
                figureTresFotos.classList.add('figureTresFotos')

                const imagentresfotos = document.createElement('IMG');
                imagentresfotos.src = element.src.medium

                const parrafoFigure = document.createElement('P');
                parrafoFigure.textContent = element.photographer

                figureTresFotos.append(parrafoFigure, imagentresfotos);

                fragment.append(figureTresFotos)

            });

            espacioSection.append(fragment)

        } else {
            console.log(arrayDatos)
        }



    }


    const pintarPalabraClave = async (palabraUsuario) => {

        const arrayDatos = await consulta(`/search?query=${palabraUsuario}&per_page=4`)

        const arrayFotos = arrayDatos.datos.photos


        arrayFotos.forEach((element) => {

            const figureUsuario = document.createElement('FIGURE')
            const parrafoUsuario = document.createElement('P')
            parrafoUsuario.textContent = element.photographer

            const imagenUsuario = document.createElement('IMG')
            imagenUsuario.src = element.src.medium
            imagenUsuario.classList.add('imagenUsuario')

            figureUsuario.append(parrafoUsuario)
            figureUsuario.append(imagenUsuario)

            fragment.append(figureUsuario)

        })

        const h1Tendencia = document.createElement('H1')
        h1Tendencia.classList.add('h1Titular')
        h1Tendencia.textContent = `Búsquedas relacionadas con "${palabraUsuario}"`

        const botonBorrar = document.createElement('BUTTON')
        botonBorrar.classList.add('claseBorrar')
        botonBorrar.textContent = 'Borrar Búsqueda'

        titularUsuario.append(h1Tendencia)
        boton.append(botonBorrar)
        espacioUsuario.append(fragment)


    }

    const pintarMisFotos = async () => {

        arrayMisFotos.forEach(async (element) => {

            const datos = await consulta(`photos/${element.id}`)
            const datosPorTema = await consulta(`/search?query=${element.categoria}&per_page=10`)

            const figureAutor = document.createElement('FIGURE')

            const imagenAutor = document.createElement('IMG')
            imagenAutor.src = element.url
            imagenAutor.classList.add('imagenAutores')

            const enlaceFoto = document.createElement('A')
            enlaceFoto.href = `fotoGrande.html?imagen=${element.categoria}`
            enlaceFoto.append(imagenAutor)

            figureAutor.append(enlaceFoto)

            espacioAutor.append(figureAutor)

        })


    }

    const pintarCollage = () => {

        const url = location.search;
        console.log(url);

        let params = new URLSearchParams(url);
        console.log(params);
    }

    // const borrarBusqueda = () => {
    //     espacioUsuario.innerHTML = ""
    //     titularUsuario.innerHTML = ""
    //     boton.innerHTML = ""
    // }



    pintarPrincipales()
    pintarMisFotos()



})