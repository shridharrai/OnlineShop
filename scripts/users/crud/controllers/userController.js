window.addEventListener('load',init);

function init() {
    registerEvents();
}

function registerEvents() {
    document.querySelector("#register").addEventListener('click',addUser);
}

function addUser() {
    console.log("Add called ");
    var user = new User();
    console.log(user);
    for(let key in user) {
        user[key] = document.getElementById(key).value;
    }
    console.log(user);
    savetoServer(user);
    // doRegisteration();
}

function savetoServer(user) {
    // var userObject = user;
    var email = (user.email).split("@");
    console.log("Email after split is ",email);
    console.log("Email is ",email[0]);
    // console.log("Email is ",email);
    var promise = firebase.database().ref('/users/'+email[0]).set(user);
    promise.then(data=>{
        alert("Record added....");
        doRegisteration(user);
    }).catch(err=>{
        alert("Not added error occur....");
        console.log(err);
    })
}

