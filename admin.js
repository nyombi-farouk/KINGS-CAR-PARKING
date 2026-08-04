// ===================================
// KING'S PARKING ADMIN SYSTEM
// ===================================



let user =
JSON.parse(
localStorage.getItem("currentUser")
);



if(!user || user.role!=="admin"){

alert("Admin login required");

window.location.href="login.html";

}





// LOAD DATABASES


let parkingSlots =
JSON.parse(
localStorage.getItem("parkingSlots")
)
||
[];


let users =
JSON.parse(
localStorage.getItem("users")
)
||
[];


let bookings =
JSON.parse(
localStorage.getItem("bookings")
)
||
[];








// ===============================
// STATISTICS
// ===============================


function loadStatistics(){


document.getElementById(
"totalSlots"
).innerHTML =
parkingSlots.length;



document.getElementById(
"availableSlots"
).innerHTML =

parkingSlots.filter(

s=>s.status==="available"

).length;




document.getElementById(
"occupiedSlots"
).innerHTML =

parkingSlots.filter(

s=>s.status==="occupied"

).length;





let money =
bookings.length * 5000;



document.getElementById(
"revenue"
).innerHTML =

"UGX "+money.toLocaleString();



}



loadStatistics();







// ===============================
// DISPLAY SLOTS
// ===============================


function displaySlots(){


let container =
document.getElementById(
"slotContainer"
);


container.innerHTML="";



parkingSlots.forEach((slot,index)=>{



let div =
document.createElement("div");



div.className=
"slot "+slot.status;



div.innerHTML=`

<h3>
${slot.id}
</h3>


<p>
${slot.status}
</p>



<button onclick="changeStatus(${index})">

Change

</button>



<button onclick="removeSlot(${index})">

Delete

</button>


`;



container.appendChild(div);



});


}


displaySlots();








// ===============================
// ADD SLOT
// ===============================


function addSlot(){



let name =
document.getElementById(
"slotName"
).value;



if(!name)
return;



parkingSlots.push({

id:name,

status:"available"

});





localStorage.setItem(

"parkingSlots",

JSON.stringify(parkingSlots)

);



displaySlots();

loadStatistics();



}








// ===============================
// CHANGE STATUS
// ===============================


function changeStatus(index){



let slot =
parkingSlots[index];



if(slot.status==="available")

slot.status="occupied";


else if(slot.status==="occupied")

slot.status="reserved";


else

slot.status="available";





localStorage.setItem(

"parkingSlots",

JSON.stringify(parkingSlots)

);



displaySlots();

loadStatistics();


}







// ===============================
// DELETE SLOT
// ===============================


function removeSlot(index){



parkingSlots.splice(index,1);



localStorage.setItem(

"parkingSlots",

JSON.stringify(parkingSlots)

);



displaySlots();

loadStatistics();


}







// ===============================
// DRIVERS
// ===============================


function loadDrivers(){


let box =
document.getElementById(
"driverList"
);



box.innerHTML="";



users
.filter(
u=>u.role==="driver"
)
.forEach(driver=>{


box.innerHTML += `

<div class="driver">

<h3>
${driver.name}
</h3>

<p>
${driver.email}
</p>

<p>
${driver.phone}
</p>


</div>


`;


});


}



loadDrivers();








// ===============================
// BOOKINGS
// ===============================


function loadBookings(){



let box =
document.getElementById(
"bookingList"
);



box.innerHTML="";



bookings.forEach(b=>{


box.innerHTML += `


<div class="booking">


<h3>
Slot ${b.slot}
</h3>


<p>
Driver:
${b.driver}
</p>


<p>
Date:
${b.date}
</p>


<p>
Status:
${b.status}
</p>


</div>


`;


});


}



loadBookings();








// LOGOUT


function logout(){


localStorage.removeItem(
"currentUser"
);


window.location.href="login.html";


}
