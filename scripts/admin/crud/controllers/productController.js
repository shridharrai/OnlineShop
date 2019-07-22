window.addEventListener("load", init);
var count;
function init() {
    registerEvents();
    count = autoGen();
    printCounter();
    showRecordCounts();
}

function registerEvents() {
    document.getElementById('add').addEventListener('click', addProduct);
    document.getElementById('delete').addEventListener('click',deleteProduct);
    document.getElementById('update').addEventListener('click',updateProduct);
    document.getElementById('save').addEventListener('click',saveProduct);
    document.getElementById('load').addEventListener('click',loadProduct);
    document.getElementById('savetoServer').addEventListener('click',savetoServer);
    document.getElementById('loadfromServer').addEventListener('click',loadfromServer);
}

function addProduct() {
    console.log("Add called");
    var product = new Product();
    console.log(product);
    for(let key in product) {
        if(key == 'id') {
            product[key] = document.getElementById(key).innerText;
            continue;
        }
        if(key == 'markForDelete') {
            continue;
        }
        product[key] = document.getElementById(key).value;
    }
    productOperations.add(product);
    printProduct(product);
    printCounter();
    showRecordCounts();
}

function printProduct(product) {
    var tbody = document.getElementById("products");
    var tr = tbody.insertRow();
    var index = 0;
    for(let key in product) {
        if(key == 'url') {
            tr.insertCell(index).appendChild(createImage(product[key]));
            index++;
            continue;
        }
        if(key == 'color') {
            tr.insertCell(index).appendChild(createCircle(product[key]));
            index++;
            continue;
        }
        if(key == 'markForDelete') {
            continue;
        }
        tr.insertCell(index).innerText = product[key];
        index++;
    }

    var td = tr.insertCell(index);
    td.appendChild(createIcon('fas fa-trash',toggleMark,product.id));
    td.appendChild(createIcon('fas fa-edit',edit,product.id));
}

function createImage(url) {
    var image = document.createElement("img");
    image.src = url;
    image.className = 'size';
    return image;
}

function createCircle(colorCode) {
    console.log("Color code is ",colorCode);
    var div = document.createElement("div");
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.margin = '20px';
    div.style.marginLeft = '50px';
    div.className = 'rounded-circle';
    div.style.backgroundColor = colorCode;
    return div;
    
}

function createIcon(className,fn,id) {
    var icon = document.createElement("i");
    icon.className = className;
    icon.classList.add('mr-2');
    icon.classList.add('hand');
    icon.setAttribute("pid",id);
    icon.addEventListener('click',fn);
    // icon.classList.add('w-25');
    return icon;
}

function printCounter() {
    document.querySelector('#id').innerText = count.next().value;
}
// to Show the danger(red) color on selected row
function toggleMark() {
    console.log(" toggle mark ",this);
    var icon = this;
    var tr = icon.parentNode.parentNode;
    tr.classList.toggle('alert-danger');
    var id = icon.getAttribute("pid");
    productOperations.toggleMark(id);
    showRecordCounts();
}

function showRecordCounts() {
    document.querySelector("#total").innerText = productOperations.products.length;
    document.querySelector("#mark").innerText = productOperations.countMark();
    document.querySelector("#unmark").innerText = productOperations.products.length - productOperations.countMark();
}

function deleteProduct() {
    productOperations.remove();
    printProducts(productOperations.products);
    showRecordCounts();
}

function printProducts(products) {
    document.querySelector("#products").innerHTML = ' ';
    products.forEach(printProduct);
}

var productEditObject;
function edit() {
    console.log("edit called ",this);
    var id = this.getAttribute('pid');
    productEditObject = productOperations.search(id);
    console.log("searched object is ",productEditObject);
    for(let key in productEditObject) {
        if(key == 'id') {
            document.querySelector('#'+key).innerText = productEditObject[key];
            continue;
        }
        if(key == 'markForDelete') {
            continue;
        }
        document.querySelector('#'+key).value = productEditObject[key];
    }
}

function updateProduct() {
    for(let key in productEditObject) {
        if(key == 'id' || key == 'markForDelete') {
            continue;
        }
        productEditObject[key] = document.querySelector("#"+key).value;
    }
    printProducts(productOperations.products);
}

function saveProduct() {
    if(localStorage) {
        localStorage.products = JSON.stringify(productOperations.products);
        alert("Record saved....");
    }
    else {
        alert("Your browser is outdated....");
    }
}

function loadProduct() {
    if(localStorage) {
        if(localStorage.products) {
            productOperations.products = JSON.parse(localStorage.products);
            printProducts(productOperations.products);
            showRecordCounts();
        }
        else {
            alert("No data to load.....");
        }
    }
    else {
        alert("Ur browser is outdated.....");
    }
}

function savetoServer() {
    var productObject = productOperations.products[productOperations.products.length-1];
    var id = productObject.id;
    var promise = firebase.database().ref('/products/'+id).set(productObject);
    promise.then(data=>{
        alert("Record added.....");
    }).catch(err=>{
        alert("Not added error occur.....");
        console.log(err);
    })
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
        showRecordCounts();
    })
}

function clone(firebaseObject) {
    var productObject = new Product(firebaseObject.id,firebaseObject.name,firebaseObject.desc,firebaseObject.price,firebaseObject.url,firebaseObject.color);
    productOperations.add(productObject);
}

