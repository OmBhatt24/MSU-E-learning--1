

// document.querySelectorAll(".signUp-button")[0].addEventListener("click", function () {
//     document.getElementById("popup").style.display = "flex";
// });


document.getElementById("close").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
    console.log("Hello");
});

const labels = document.querySelectorAll(".sign-in-control label");

labels.forEach((label) => {
    label.innerHTML = label.innerText
        .split("")
        .map(
            (letter, idx) => 
                `<span style="transition-delay:${idx * 100}ms">${letter}</span>`
              
        )
        .join("");
});

// On scroll the color of navbar change 

$(document).scroll(function () {
    
    var $nav = $(".navbar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());

  });


  $(document).ready(()=>{

    $("#li-cse").on("click",()=>{
        
    });

  });