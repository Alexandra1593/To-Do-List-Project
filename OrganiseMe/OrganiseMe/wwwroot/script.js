
src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";
src="https://code.jquery.com/jquery-3.6.0.min.js";
// $(document).ready(function(){
//   $("#sing-in").click(function(){
//     $("#form").slideToggle("slow");
//   });
// });


$(document).ready(function() {
    $("#showSignUp").click(function() {
        $("#container").addClass("active");
    });
    
    $("#showSignIn").click(function() {
        $("#container").removeClass("active");
    });
});


// Function to show the modal
function showModal() {
    document.getElementById("myModal").style.display = "block";
}

// Function to close the modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";

};



function Erase(){
    
    document.getElementById("Name").value="";
        document.getElementById("Surname").value = "";
        document.getElementById("Nickname").value = "";
        document.getElementById("E-mail").value = "";
        document.getElementById("Password").value = "";
        document.getElementById("E-mail2").value = "";
        document.getElementById("Password2").value = "";

}




        // Load the splash screen 
        fetch('splash.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('splashContainer').innerHTML = data;

                
                setTimeout(() => {
                    document.getElementById("splashScreen").classList.add("hidden");
                }, 3000);
            });
   