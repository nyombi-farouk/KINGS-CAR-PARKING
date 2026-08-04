// ===============================
// KING'S PARKING AUTH SYSTEM
// LOCAL STORAGE
// ===============================



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
