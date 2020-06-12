let prueba = document.getElementById("prueba")
let producto = document.getElementById("catalogo")
let informacion = document.getElementById("informacion")
let idProducto;
let columna;

let idProducto2;
let columna2;

function ocultar() {
  document.getElementById('catalogo').style.display = 'none';
  document.getElementById('informacion').style.display = 'block';
}

function mostrar() {
  document.getElementById('catalogo').style.display = 'block';
  document.getElementById('informacion').style.display = 'none';
}

function getDatos() {                                                               //obtengo los productos
  fetch('http://gsx2json.com/api?id=1qETJ49SZls5EzOmHxhHmwGGfoXa_AntDSpLSXkLPJSM')
    .then(res => res.json())
    .then(data => {

      for (x in data.columns.id) {                                                 // los imprimo en el div que esta en la variable producto
        producto.innerHTML += `
            <div class="card col-3 p-3 m-3 float-left" style="width: 18rem; min-height: 400px; ">
            <img src="${data.columns.imagen[x]}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title" id="">${data.columns.titulo[x]}</h5>
              
              <a  class="btn btn-outline-success" id="${x}" onclick="obtenerBoton(this), ocultar();">$${data.columns.precio[x]}</a>
            </div>
          </div>`

      }
    })
}

function buscarDato(comp2) {
  let idProducto2 = comp2.id;
  let a=parseInt(idProducto2)
  fetch('http://gsx2json.com/api?id=1qETJ49SZls5EzOmHxhHmwGGfoXa_AntDSpLSXkLPJSM&rows=false')
    .then(res => res.json())
    .then(data => {
      var contador = 0
      console.log(data.columns)
      for (y in data.columns) {
        
        if (y !== "descripcion") {
          contador++
          
        }
        else
          break
      }
      p=document.getElementById("info")
      p.innerHTML = `<p id="info">${data.columns.descripcion[a]}</p> 
      <input type="textfield" value="${data.columns.descripcion[a]}" id="imput" aria-describedby="emailHelp">`
      return enviarInfo(a,contador)
    })
    
}




function enviarInfo(fila, col) {
  console.log("lalala")
  console.log(fila)
  console.log(col)
  google(col,fila+1, "puto el que lee")

}





function obtenerBoton(comp) {         // OBTENGO EL BOTON PRECIONADO Y OBTENGO SU ID
  idProducto = comp.id;


  fetch('http://gsx2json.com/api?id=1qETJ49SZls5EzOmHxhHmwGGfoXa_AntDSpLSXkLPJSM')  //traigo los productos
    .then(res => res.json())
    .then(data => {


      DivDelProducto = document.getElementById('informacion'); //obtengo el div en el que voy a imprimir el producto
      //imprimo solo el producto que se presiono usando el id de su boton, el cual es la fila en la que se encuentra en la hoja de calculo
      DivDelProducto.innerHTML = `                                
            <a onclick="mostrar()"><h1><--</h1></a>
            <div class="card col-12 p-3 m-3 float-left">
            <img src="${data.columns.imagen[idProducto]}" class="card-img-top" alt="...">
            <div class="card-body">
              <h1 class="card-title" id="">${data.columns.titulo[idProducto]}</h1>
              <p>${data.columns.descripcion[idProducto]}</p>
              
              <a  class="btn btn-outline-success" id="${idProducto}" onclick="obtenerBoton(this), ocultar();">$${data.columns.precio[idProducto]}</a>
            </div>
          </div>`




    })
}

{/* <p>talle: ${data.columns.talle[idProducto]}</p>                  esto va en la linea 102
              <p>marca: ${data.columns.marca[idProducto]}</p> */}


//--------------------------------------------API GOOGLE SHEETS---------------------------------------

const SHEET_ID = '1qETJ49SZls5EzOmHxhHmwGGfoXa_AntDSpLSXkLPJSM';
const ACCESS_TOKEN = 'ya29.a0AfH6SMC2nTlnD9fagxyoF9sHonl-bFE-JI56JRrfytNl5lW4AO5a7sgOEOZCfskatTM7AkkLLAarQnDcrMMcnQIRDHYlwEHKuJpp9CeZjHwhN6rIOH_bvkt7f7637sbEYu4b-WppXrznmVWOZdahXBdL6KTWPQne5SE';

function google(col, fil, msg) {

  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //update this token with yours. 
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({

      requests: [{
        repeatCell: {
          range: {
            startColumnIndex: col,
            endColumnIndex: col + 1,            
            startRowIndex: fil,
            endRowIndex: fil + 1,
            sheetId: 0
          },
          cell: {
            userEnteredValue: {
              "stringValue": msg,

            },
          },
          fields: "*"
        }
      }]

    })
  })
}
