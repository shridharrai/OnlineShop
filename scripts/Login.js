function doLogin() {
    console.log("Login call...");
    var users = getValues();
    console.log("Users are ",users);
    if(users[0] == admin.userid && users[1] == admin.password) {
        location.href = 'dashboard.html';
        // console.log("Logged in");
    }
    else {
         loadfromServer(checkUserExist);
    }
}

function getValues() {
    var userid = document.getElementById('userid').value;
    var password = document.getElementById('password').value;
    return[userid,password];
}


function doRegister() {
    console.log("Login Register called")
    location.href = "register.html"
}

function loadfromServer(fn) {
    var users = firebase.database().ref('/users');
    users.on('value',(snapshot)=> {
        let usersdata = snapshot.val();
        console.log("Users are ",usersdata);
        fn(usersdata);
    })
}

function checkUserExist(usersdata) {
    console.log("Loaded users are ", usersdata);
    var flag = 0;
    var user = getValues();
    console.log("Users are ",user);
     for(let key in usersdata) {
            let firebaseUserObject = usersdata[key];
            if(!(user[0].localeCompare(firebaseUserObject.email)) && !(user[1].localeCompare(firebaseUserObject.password))) {
                console.log("User screen");
                flag = 1;
                saveUser(user);
                location.href = 'userScreen.html';
                break;
            }
            else {
                continue;
            }
        }
        if(flag == 0) {
            let message = 'Invalid Userid or Password';
            document.getElementById('error').innerText = message;
        }
}

function saveUser(user) {
    console.log("Inside localstorage");
    if(localStorage) {
        localStorage.user = JSON.stringify(user);
        alert("Record saved....");
    }
    else {
        alert("Your browser is outdated....");
    }
}
