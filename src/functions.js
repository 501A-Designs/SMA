//Version alert pop up
//ERASING THE POP UP ON CLICK
function eraseVersionNotify(){
    document.getElementById("versionNotify").style.display="none";
}

//THE COUNT DOWN AND ERASING
// Set the counting down date
var countDownDate = new Date("Aug 26, 2021").getTime();
// Update the count down every 1 second bruh
var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds / nerd stuff
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // Output the result in an element with id="versionNotify"
    document.getElementById("erasedDate").innerHTML = days + "日で表示が完全に消えます";
    // If the count down is over, write some text 
    if (distance <= 0) {
        clearInterval(x);
        document.getElementById("versionNotify").style.display = "none";
    }
}, 1000);

//Darkmode variablenames
const LD = document.getElementById('LtoD');
const DL = document.getElementById('DtoL');

//Darkmode toggle
function LtoD() {
    document.documentElement.classList.toggle('darkMode', false);
    // img.toggle('darkMode', false);
    LD.style.display="block";
    DL.style.display="none";
}
function DtoL() {
    document.documentElement.classList.toggle('darkMode', true);
    // img.toggle('darkMode', false);
    LD.style.display="none";
    DL.style.display="block";
}
//Darkmode time
var h = new Date().getHours();
if (h > 19) {
    DtoL();
}else{
    LtoD();
}

// const popUp = document.getElementById(idName);
// const popUp = document.getElementById(idName);
// const popUp = document.getElementById(idName);

//erasing stuff
function loginPopUpFunction(){
    const loginPopUp = document.getElementById("loginPopUp");
    if (loginPopUp.style.display === "none") {
        loginPopUp.style.display = "block";
    } else {
        loginPopUp.style.display = "none";
    }
}

function announcePopUpFunction(){
    const announcePopUp = document.getElementById("announcePopUp");
    if (announcePopUp.hidden === true) {
        announcePopUp.hidden = false;
    } else {
        announcePopUp.hidden = true;
    }
}

function blockDisplay(value) {
    const createPost = document.getElementById("createPost");
    if (value === 1) {
        createPost.hidden=false;
    }else{
        createPost.hidden=true;
    }
}


function confirmPrompt() {
    document.getElementById("confirmDiv").style.display="block";
    document.getElementById("firstSubmit").style.display="none";
}


function langFunction() {
    const jpn = document.getElementById("loJPN");
    const eng = document.getElementById("loENG");
    
    if (eng.style.display === "none") {
        jpn.style.display="none";
        eng.style.display="block";
    } else {
        jpn.style.display="block";
        eng.style.display="none";
    }
}

