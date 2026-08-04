// =================================
// DEFAULT KING'S PARKING ACCOUNTS
// =================================


function createDefaultAccounts(){


let users =
JSON.parse(
localStorage.getItem("users")
)
||
[];




// DEFAULT ADMIN ACCOUNT

let adminExists =
users.find(
user => user.email === "admin@kingsparking.com"
);



if(!adminExists){


users.push({

name:"King's Parking Admin",

email:"admin@kingsparking.com",

phone:"0700000000",

password:"admin123",

role:"admin"


});


}




// DEFAULT DRIVER ACCOUNT


let driverExists =
users.find(
user => user.email === "driver@kingsparking.com"
);



if(!driverExists){


users.push({

name:"John Driver",

email:"driver@kingsparking.com",

phone:"0711111111",

password:"driver123",

role:"driver"


});


}




localStorage.setItem(

"users",

JSON.stringify(users)

);


}




createDefaultAccounts();


// REGISTER


const registerForm =
document.getElementById("registerForm");



if(registerForm){


registerForm.addEventListener(
"submit",
function(e){


e.preventDefault();



let users =
JSON.parse(
localStorage.getItem("users")
)
||
[];




let user={


name:
document.getElementById("name").value,


email:
document.getElementById("email").value,


phone:
document.getElementById("phone").value,


password:
document.getElementById("password").value,


role:
document.getElementById("role").value



};





let exists =
users.find(
u=>u.email===user.email
);



if(exists){


alert(
"Account already exists!"
);

return;

}





users.push(user);



localStorage.setItem(
"users",
JSON.stringify(users)
);



alert(
"Registration successful!"
);



window.location.href="login.html";



});


}








// LOGIN


const loginForm =
document.getElementById("loginForm");



if(loginForm){



loginForm.addEventListener(
"submit",
function(e){



e.preventDefault();



let email =
document.getElementById(
"loginEmail"
).value;



let password =
document.getElementById(
"loginPassword"
).value;



let users =
JSON.parse(
localStorage.getItem("users")
)
||
[];




let user =
users.find(
u =>
u.email===email &&
u.password===password
);





if(!user){


alert(
"Invalid email or password"
);


return;


}





localStorage.setItem(
"currentUser",
JSON.stringify(user)
);





alert(
"Welcome "+user.name
);





if(user.role==="admin"){


window.location.href="admin.html";


}

else{


window.location.href="driver.html";


}



});


}
