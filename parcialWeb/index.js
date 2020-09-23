fetch(
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
).then((response) => {
  response.json().then((response) => {
    document.getElementById("contador").innerHTML = 0;
    let bBurgers = document.getElementById("bBurgers");
    let bTacos = document.getElementById("bTacos");
    let bSalad = document.getElementById("bSalad");
    let bDesserts = document.getElementById("bDesserts");
    let bDrinks = document.getElementById("bDrinks");

    bBurgers.addEventListener("click", () => {
      desplegar("Burgers", response);
    });
    bTacos.addEventListener("click", () => {
      desplegar("Tacos", response);
    });
    bSalad.addEventListener("click", () => {
      desplegar("Salad", response);
    });
    bDesserts.addEventListener("click", () => {
      desplegar("Dessert", response);
    });
    bDrinks.addEventListener("click", () => {
      desplegar("Drink", response);
    });
  });
});
let despliegue = document.getElementById("despliegue");

let orden = [];
let car = [];
let addToCar = (elemento) => {
  car.push(elemento);
  document.getElementById("contador").innerHTML = car.length;
};

let span = document.getElementsByClassName("close")[0];
let modal = document.getElementById("myModal");

let cancelO = () => {
  car = [];
  orden=[];
  showOrder();
  document.getElementById("contador").innerHTML = car.length;
  modal.style.display = "none";
};
let continueO = () => {
  modal.style.display = "none";
};

let displayModal = () => {
  modal.style.display = "block";
  let cancelOrder = document.getElementById("cancelOrder");
  cancelOrder.addEventListener("click", (event) => {
    event;
    cancelO();
  });
  let continueOrder = document.getElementById("continueOrder");
  continueOrder.addEventListener("click", (event) => {
    event;
    continueO();
  });
};
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let showOrder = () => {
  despliegue.innerHTML = "";
  let line = document.createElement("hr");
  let titulo = document.createElement("h1");
  titulo.innerHTML = "Order detail";
  titulo.style.textAlign = "center";
  despliegue.appendChild(document.createElement("br"));
  despliegue.appendChild(line);
  despliegue.appendChild(titulo);
  despliegue.appendChild(line);

  let tabla = document.createElement("table");
  tabla.className = "table table-striped";
  let tr = document.createElement("tr");
  let th1 = document.createElement("th");
  th1.innerHTML = "Item";
  let th2 = document.createElement("th");
  th2.innerHTML = "Qty.";
  let th3 = document.createElement("th");
  th3.innerHTML = "Description";
  let th4 = document.createElement("th");
  th4.innerHTML = "Unit Price";
  let th5 = document.createElement("th");
  th5.innerHTML = "Amount";
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);
  tabla.appendChild(tr);
  let map = new Map();
  car.forEach((element) => {
    if (map.has(element)) {
      map.set(element, map.get(element) + 1);
    } else {
      map.set(element, 1);
    }
  });
  let i = 1;
  let total = 0;
  map.forEach((values, keys) => {
    let fila = document.createElement("tr");
    let item = document.createElement("td");
    item.innerHTML = i;
    let quantity = document.createElement("td");
    quantity.innerHTML = values;
    let description = document.createElement("td");
    description.innerHTML = keys.name;
    let uniPrice = document.createElement("td");
    uniPrice.innerHTML = keys.price;
    let amount = document.createElement("td");
    amount.innerHTML =
      parseFloat(quantity.innerHTML) * parseFloat(uniPrice.innerHTML);
    total += parseFloat(amount.innerHTML);
    fila.appendChild(item);
    fila.appendChild(quantity);
    fila.appendChild(description);
    fila.appendChild(uniPrice);
    fila.appendChild(amount);
    tabla.appendChild(fila);
    let o = {
      item: i,
      quantity: quantity.innerHTML,
      description: description.innerHTML,
      unitPrice: uniPrice.innerHTML,
    };
    orden.push(o);
    i++;
  });
  let abajo = document.createElement("div");
  abajo.className = "row";
  let precioTotal = document.createElement("p");
  precioTotal.innerHTML = "Total: $ " + total;
  precioTotal.className = "col-8";
  let cancelBoton = document.createElement("button");
  cancelBoton.innerHTML = "Cancel";
  cancelBoton.className = "col-2";
  cancelBoton.className = "btn btn-danger";
  cancelBoton.setAttribute("data-open", "modal");
  cancelBoton.addEventListener("click", (event) => {
    event;
    displayModal();
  });
  let confirmBoton = document.createElement("button");
  confirmBoton.innerHTML = "Confirm order";
  confirmBoton.className = "col-2";
  confirmBoton.className = "btn btn-danger";
  confirmBoton.style.backgroundColor = "#A79DA7";
  confirmBoton.addEventListener("click", (event) => {event;console.log(orden);});
  abajo.appendChild(precioTotal);
  abajo.appendChild(cancelBoton);
  abajo.appendChild(confirmBoton);
  despliegue.appendChild(tabla);
  despliegue.appendChild(abajo);
};
let carito = document.getElementById("car");
carito.addEventListener("click", (event) => {
  event;
  showOrder();
});

let desplegar = (tipo, json) => {
  despliegue.innerHTML = "";
  let b = [];
  if (tipo === "Burgers") {
    let row = document.createElement("div");
    row.className = "row";
    let todo = document.createElement("div");
    todo.className = "col-12";
    row.appendChild(todo);
    let burger = document.createElement("h1");
    burger.innerHTML = "Burgers";
    burger.style.textAlign = "center";
    todo.appendChild(burger);
    despliegue.appendChild(document.createElement("hr"));
    despliegue.appendChild(row);
    despliegue.appendChild(document.createElement("hr"));
    b = json[0].products;
  }
  if (tipo === "Tacos") {
    let row = document.createElement("div");
    row.className = "row";
    let todo = document.createElement("div");
    todo.className = "col-12";
    row.appendChild(todo);
    let burger = document.createElement("h1");
    burger.innerHTML = "Tacos";
    burger.style.textAlign = "center";
    todo.appendChild(burger);
    despliegue.appendChild(document.createElement("hr"));
    despliegue.appendChild(row);
    despliegue.appendChild(document.createElement("hr"));
    b = json[1].products;
  }
  if (tipo === "Salad") {
    let row = document.createElement("div");
    row.className = "row";
    let todo = document.createElement("div");
    todo.className = "col-12";
    row.appendChild(todo);
    let burger = document.createElement("h1");
    burger.innerHTML = "Salads";
    burger.style.textAlign = "center";
    todo.appendChild(burger);
    despliegue.appendChild(document.createElement("hr"));
    despliegue.appendChild(row);
    despliegue.appendChild(document.createElement("hr"));
    b = json[2].products;
  }
  if (tipo === "Dessert") {
    let row = document.createElement("div");
    row.className = "row";
    let todo = document.createElement("div");
    todo.className = "col-12";
    row.appendChild(todo);
    let burger = document.createElement("h1");
    burger.innerHTML = "Desserts";
    burger.style.textAlign = "center";
    todo.appendChild(burger);
    despliegue.appendChild(document.createElement("hr"));
    despliegue.appendChild(row);
    despliegue.appendChild(document.createElement("hr"));
    b = json[3].products;
  }
  if (tipo === "Drink") {
    let row = document.createElement("div");
    row.className = "row";
    let todo = document.createElement("div");
    todo.className = "col-12";
    row.appendChild(todo);
    let burger = document.createElement("h1");
    burger.innerHTML = "Drinks & Side";
    burger.style.textAlign = "center";
    todo.appendChild(burger);
    despliegue.appendChild(document.createElement("hr"));
    despliegue.appendChild(row);
    despliegue.appendChild(document.createElement("hr"));
    b = json[4].products;
  }
  let row = document.createElement("div");
  row.className = "row";
  b.forEach((element) => {
    let col = document.createElement("div");
    col.className = "col-3";
    row.appendChild(col);
    despliegue.appendChild(row);
    let card = document.createElement("div");
    card.className = "card shadow cursor-pointer";

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.innerHTML = element.description;
    cardBody.style.fontSize = "12px";

    let cardPrice = document.createElement("div");
    cardPrice.className = "card-body";
    cardPrice.innerHTML = "$ " + element.price;

    let title = document.createElement("h5");
    title.className = "card-title";
    title.innerText = element.name;
    let im = document.createElement("img");
    im.src = element.image;
    im.style.height = "220px";
    let boton = document.createElement("button");
    boton.innerText = "Add to cart";
    boton.className = "btn btn-dark";
    let columna = document.createElement("col-4");
    columna.appendChild(boton);
    boton.addEventListener("click", (event) => {
      event;
      addToCar(element);
    });
    card.appendChild(title);
    card.appendChild(im);
    card.appendChild(cardBody);
    card.appendChild(cardPrice);
    card.appendChild(columna);
    cardBody.style.height = "100px";
    col.appendChild(card);
  });
};
