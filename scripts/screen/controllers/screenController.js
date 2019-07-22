window.addEventListener("load",init);

function init() {
    registerEvents();
    loadfromServer();
}

function registerEvents() {
    document.querySelector("#cart").addEventListener('click',callCart);
}

function loadfromServer() {
    var products = firebase.database().ref('/products');
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
    var btn = createButton(product.id,toggleMark);
    div.appendChild(btn);
   products.appendChild(div);
}

function createButton(id,fn) {
    var btn = document.createElement("button");
    btn.innerText = "Add to cart";
    btn.classList.add("btn");
    btn.classList.add("btn-primary");
    btn.setAttribute("pid",id);
    btn.addEventListener('click',fn);
    return btn;
}

function toggleMark() {
    console.log(" toggle mark ",this);
    var btn = this;
    // var tr = icon.parentNode.parentNode;
    // tr.classList.toggle('alert-danger');
    var id = btn.getAttribute("pid");
    productOperations.toggleMark(id);
    // savetoServer()
    showRecordCounts();
}

function showRecordCounts() {
    document.querySelector("#cart").innerText = productOperations.countMark();
}

function savetoServer(product) {
    var productObject = product;
    console.log("Inside save to server ",productObject);
    var id = productObject.id;
    var promise = firebase.database().ref('/cart/'+id).set(productObject);
    promise.then(data=>{
        alert("Record added.....");
    }).catch(err=>{
        alert("Not added error occur.....");
        console.log(err);
    })
}

function loadUser() {
    if(localStorage) {
        if(localStorage.user) {
           var user = JSON.parse(localStorage.user);
            console.log("local storage user is ",user[0]);
            return user[0];
        }
        else {
            alert("No data to load.....");
        }
    }
    else {
        alert("Ur browser is outdated.....");
    }
}