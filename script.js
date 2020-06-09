let boton = document.getElementById("boton")
let producto = document.getElementById("catalogo")

function getDatos() {
    fetch('http://gsx2json.com/api?id=1qETJ49SZls5EzOmHxhHmwGGfoXa_AntDSpLSXkLPJSM')
        .then(res => res.json())
        .then(data => {

            console.log(data.columns)
            producto.innerHTML=`<img src="${data.columns.imagen[0]}" alt="">`

        })
}


boton.addEventListener("click", () => {
    getDatos()
})

