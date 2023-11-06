var modal = document.getElementById("modal1")
var buttons = document.getElementById("modalbutton")
var buttons2 = document.getElementById("modalbutton1")

//this is for what to do for the button functions so that when a button is clicked the modal goes away
buttons.addEventListener("click", function(){
modal.setAttribute("class", "hidden")
})

buttons2.addEventListener("click", function(){
    modal.setAttribute("class", "hidden")
    })