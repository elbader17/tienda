
let producto = document.getElementById("catalogo")
let informacion = document.getElementById("informacion")
let idProducto;

function ocultar() {
  document.getElementById('catalogo').style.display = 'none';
  document.getElementById('informacion').style.display = 'block';
}

function mostrar() {
  document.getElementById('catalogo').style.display = 'block';
  document.getElementById('informacion').style.display = 'none';
}

function getDatos() {
  fetch('http://gsx2json.com/api?id=1qETJ49SZls5EzOmHxhHmwGGfoXa_AntDSpLSXkLPJSM')
    .then(res => res.json())
    .then(data => {


      for (x in data.columns.id) {
        producto.innerHTML += `
            <div class="card col-3 p-3 m-3 float-left" style="width: 18rem; min-height: 400px; ">
            <img src="${data.columns.imagen[x]}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title" id="">${data.columns.titulo[x]}</h5>
              
              <a  class="btn btn-outline-success" id="${x}" onclick="obtenerBaton(this), ocultar();">$${data.columns.precio[x]}</a>
            </div>
          </div>`

      }
    })
}




function obtenerBaton(comp) {
  idProducto = comp.id;
  

  fetch('http://gsx2json.com/api?id=1qETJ49SZls5EzOmHxhHmwGGfoXa_AntDSpLSXkLPJSM')
    .then(res => res.json())
    .then(data => {

      
      console.log(data.columns.titulo[idProducto])
      DivDelProducto=document.getElementById('informacion');

      DivDelProducto.innerHTML = `
            <a onclick="mostrar()"><h1><--</h1></a>
            <div class="card col-12 p-3 m-3 float-left">
            <img src="${data.columns.imagen[idProducto]}" class="card-img-top" alt="...">
            <div class="card-body">
              <h1 class="card-title" id="">${data.columns.titulo[idProducto]}</h1>
              <p>${data.columns.descripcion[idProducto]}</p>
              <p>talle: ${data.columns.talle[idProducto]}</p>
              <p>marca: ${data.columns.marca[idProducto]}</p>

              <a  class="btn btn-outline-success" id="${idProducto}" onclick="obtenerBaton(this), ocultar();">$${data.columns.precio[idProducto]}</a>
            </div>
          </div>`




    })
}




