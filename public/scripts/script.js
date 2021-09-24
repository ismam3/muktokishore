let side1 = document.getElementById("side1");
let side2 = document.getElementById("side2");

window.addEventListener("scroll",()=>{
    side1.style.left = -window.pageYOffset + "px";
    side2.style.left = window.pageYOffset + "px";
});

function mobileNavOpen(x){
    let navSection = document.getElementById("navSection").style.display;
    x.classList.toggle("change");
    if(navSection == ""||navSection == "none"){
        document.getElementById("navSection").style.display = "block";
    }
    else{
        document.getElementById("navSection").style.display = "none";
    }
}
if(document.querySelector("#nid_checker").checked === true){
    document.querySelector("#nid_div").style.display= "inline-block";
    document.querySelector("#bc_div").style.display= "none";
}
else{
    document.querySelector("#nid_div").style.display= "none";
    document.querySelector("#bc_div").style.display= "inline-block";
}
document.querySelector("#nid_checker").addEventListener("click",()=>{
    if(document.querySelector("#nid_checker").checked === true){
        document.querySelector("#nid_div").style.display= "inline-block";
        document.querySelector("#bc_div").style.display= "none";
    }
    else{
        document.querySelector("#nid_div").style.display= "none";
        document.querySelector("#bc_div").style.display= "inline-block";
    }
})