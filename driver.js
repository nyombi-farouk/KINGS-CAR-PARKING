// =================================
// KING'S PARKING DRIVER SYSTEM
// =================================



// CURRENT USER


let currentUser =
JSON.parse(
localStorage.getItem("currentUser")
);



if(!currentUser || currentUser.role!=="driver"){

alert("Please login as driver");

window.location.href="login.html";

}





// ===============================
// CREATE PARKING DATABASE
// ===============================


let parkingSlots =
JSON.parse(
localStorage.getItem("parkingSlots")
);



if(!parkingSlots){


parkingSlots=[];


for(let i=1;i<=20;i++){


parkingSlots.push({

id:"A"+String(i).padStart(2,"0"),

status:"available"

});


}



localStorage.setItem(
"parkingSlots",
JSON.stringify(parkingSlots)

);


}







// ===============================
// DRIVER PROFILE
// ===============================


function loadProfile(){


document.getElementById(
"profileInfo"
).innerHTML=`

<p>
Name: ${currentUser.name}
</p>


<p>
Email: ${currentUser.email}
</p>


<p>
Phone: ${currentUser.phone}
</p>


<p>
Account Type: Driver
</p>


`;

}



loadProfile();








// ===============================
// DISPLAY PARKING SLOTS
// ===============================


function displaySlots(){


let container =
document.getElementById(
"slotsContainer"
);



container.innerHTML="";



parkingSlots.forEach(slot=>{



let div=document.createElement(
"div"
);



div.className=
"slot "+slot.status;



div.innerHTML=`

<h3>
${slot.id}
</h3>


<p>
${slot.status}
</p>

`;




if(slot.status==="available"){


div.onclick=function(){

bookSlot(slot.id);

};


}



container.appendChild(div);



});


}



displaySlots();








// ===============================
// BOOK SLOT
// ===============================


function bookSlot(id){



let confirmBooking =
confirm(
"Book parking slot "+id+"?"
);



if(!confirmBooking)
return;





parkingSlots =
parkingSlots.map(slot=>{


if(slot.id===id){


slot.status="reserved";


}



return slot;


});





localStorage.setItem(

"parkingSlots",

JSON.stringify(parkingSlots)

);





let bookings =
JSON.parse(
localStorage.getItem("bookings")
)
||
[];





bookings.push({

driver:
currentUser.email,

slot:id,

date:
new Date().toLocaleString(),

status:"Active"


});





localStorage.setItem(

"bookings",

JSON.stringify(bookings)

);





alert(
"Parking booked successfully"
);



displaySlots();

loadBookings();


}








// ===============================
// BOOKING HISTORY
// ===============================


function loadBookings(){



let list =
document.getElementById(
"bookingList"
);



list.innerHTML="";



let bookings =
JSON.parse(
localStorage.getItem("bookings")
)
||
[];





let myBookings =
bookings.filter(

b=>b.driver===currentUser.email

);





if(myBookings.length===0){


list.innerHTML=

"<p>No bookings yet</p>";

return;


}





myBookings.forEach((booking,index)=>{



let div=document.createElement(
"div"
);



div.className="booking";



div.innerHTML=`

<h3>
Slot ${booking.slot}
</h3>

<p>
Date:
${booking.date}
</p>


<p>
Status:
${booking.status}
</p>



<button class="cancel"
onclick="cancelBooking(${index})">

Cancel Booking

</button>


`;



list.appendChild(div);



});


}



loadBookings();








// ===============================
// CANCEL BOOKING
// ===============================


function cancelBooking(index){


let bookings =
JSON.parse(
localStorage.getItem("bookings")
);



let booking =
bookings[index];





parkingSlots =
parkingSlots.map(slot=>{


if(slot.id===booking.slot){

slot.status="available";

}


return slot;


});





localStorage.setItem(
"parkingSlots",
JSON.stringify(parkingSlots)
);





bookings.splice(index,1);



localStorage.setItem(

"bookings",

JSON.stringify(bookings)

);



alert(
"Booking cancelled"
);



displaySlots();

loadBookings();



}








// LOGOUT


function logout(){


localStorage.removeItem(
"currentUser"
);


window.location.href="login.html";


}
