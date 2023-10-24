const hamburguerButton = document.getElementById('hamburguer');
const navList  =  document.getElementById('nav-list');
const headerList = document.getElementById('showHeader');
const loaderSpinner = document.getElementById('funcional');
const formButton = document.getElementById('formButton');
const formObject = document.querySelector("form");

function toggleButton (){
    navList.classList.toggle('show');
    headerList.classList.toggle('expandedNav');
}

function setLoaderSpinner () {
    loaderSpinner.classList.toggle("loader");
    formButton.classList.toggle("displayNone");
}

function removeLoaderSpinner (){
    loaderSpinner.classList.remove("loader");
    formButton.classList.remove("displayNone");
}

function validateForm (event){
    // prevent the form submit from refreshing the page
    event.preventDefault();  
    const { name, email, message } = event.target;
    const Namere = /[A-Za-z]{1}[A-Za-z]/;
    if (!Namere.test(name.value)) {
            alert ("Name can not be shorter than 2 character or have numbers");
        return;
    }
    if (email.value == "") {
        alert ("Please enter your email id");
        return;
    }
    const reeamil = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!reeamil.test(email.value)) {
        alert ("Please enter valid email address");
        return;
    
    }
    if (message.value == "") {
        alert ("Please enter a message");
        return;
    }
    return formatData( name, email, message );
}

function formatData( senderName, senderEmail, messageToSend)  {
    setLoaderSpinner();
    personName = senderName.value;
    email = senderEmail.value;
    message = messageToSend.value;
    var data = JSON.stringify({
        personName : personName,
        email : email,
        message : message,
     });
     sendToApi(data)
}

function sendToApi( data ){
    const endpoint = " https://j5yvccvh5d.execute-api.us-east-1.amazonaws.com/prod/send-email"
    fetch(endpoint, { 
        method :  "POST",
        body : data
    }).then((response) => {
      if (!response.ok) throw new Error("Error in fetch");
      removeLoaderSpinner();
      return response.json();
    })
    .then((response) => {
        formObject.reset();
        removeLoaderSpinner();
      alert("Email sent successfully!");
    })
    .catch((error) => {
        removeLoaderSpinner();
      alert("Ooops. An error occured.");
    });
}

hamburguerButton.addEventListener('click', toggleButton);
formObject.addEventListener("submit", validateForm);