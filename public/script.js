let side1 = document.getElementById("side1");
let side2 = document.getElementById("side2");

window.addEventListener("scroll",()=>{
    side1.style.left = -window.pageYOffset + "px";
    side2.style.left = window.pageYOffset + "px";
});