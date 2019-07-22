window.addEventListener("load",init);

function init() {
    registerEvents();
    loadfromServer();
}

function registerEvents() {

}

function loadfromServer() {
    var products = firebase.database().ref('/cart');
    console.log("Object of firebase is ",products);
    products.on('value',(snapshot)=>{
        let prods = snapshot.val();
        console.log("Prods is ",prods);
        for(let key in prods) {
            let firebaseProductObject = prods[key];
            clone(firebaseProductObject);
        }
        printProducts(productOperations.products);
        // showRecordCounts();
    })
}

function clone(firebaseObject) {
    var productObject = new Product(firebaseObject.id,firebaseObject.url,firebaseObject.name,firebaseObject.price,firebaseObject.desc,firebaseObject.color);
    console.log("Product Object is ",productObject);
    productOperations.add(productObject);
}

function printProducts(products) {
    document.querySelector("#mobiles").innerHTML = ' ';
    products.forEach(printProduct);
}

function printProduct(product) {
    var products = document.getElementById("mobiles");
    var div = document.createElement("div");
    for(let key in product) {
        if(key == 'id') {
            console.log("key is ",product[key]);
            continue;
        }
        if(key == 'url') {
            let img= document.createElement("img");
            console.log(product[key]);
            img.src=product[key];
            div.appendChild(img);
        }
        if(key == 'name') {
            let h1 = document.createElement("h1");
            h1.innerText = product[key];
            div.appendChild(h1);
        }
        if(key == 'price') {
            let h2 = document.createElement("h2");
            h2.innerText = product[key];
            div.appendChild(h2);
        }
        if(key == 'desc') {
            let p = document.createElement("p");
            p.innerText = product[key];
            div.appendChild(p);
        }
        if(key == 'color') {
            continue;
        }
    }
    div.style.border = " 2px solid red";
    div.style.padding = '5px';
    div.style.marginLeft = "10px";
    div.style.position = "relative";
    var deletebtn = createDeleteButton(product.id);
    div.appendChild(deletebtn);
    var buybtn = createBuyButton(product.id);
    div.appendChild(buybtn);
    buybtn.classList.add("buy");
    products.appendChild(div);
}

function createDeleteButton(id) {
    var btn = document.createElement("button");
    btn.innerText = "Delete from cart";
    btn.classList.add("btn");
    btn.classList.add("btn-danger");
    btn.setAttribute("pid",id);
    // btn.addEventListener('click',fn);
    return btn;
}

function createBuyButton(id) {
    var btn = document.createElement("button");
    btn.innerText = "Buy now";
    btn.classList.add("btn");
    btn.classList.add("btn-primary");
    // btn.classList.add("buy");
    btn.setAttribute("pid",id);
    // btn.addEventListener('click',fn);
    return btn;
}

