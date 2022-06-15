const { count } = require("console");
const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require("constants");
const { get } = require("http");

var singInState = 0;

/* Dopo che viene inviato un messaggio */
function addMessage(sender, receiver, message){

    insertChat(sender,receiver,message).then( response => {
        if (!response){
            alertMessage("Il messaggio non è stato inviato correttamente")
        }
    })

}
/* Per ottenere tutte le chat dell'utente */
function displayChats(username){

    getUserChat(username).then( response => {

        for (const [key, value] of response.entries()) {
            console.log(key)
            console.log(value)
        }
    })
}

function openChat(){
    
    var div = document.getElementById("chat");
    if (div.style.display !== "none") {
        div.style.display = "none";
    } else {
        div.style.display = "block";
    }
}

function onClickSignInMode(){
    if (singInState == 0){
        singInState = 1;
    } else {
        singInState = 0;
    }
}

function onCloseModal(){
    document.getElementById("errorModal").close();
}

function genericMessage(message){
    let modal = document.getElementById("errorModal");
    document.getElementById("modalTitle").innerHTML = "";
    document.getElementById("errorMessage").innerHTML = message;
    modal.showModal();
}

function alertMessage(message){

    let modal = document.getElementById("errorModal");
    document.getElementById("modalTitle").innerHTML = "Errore!";
    document.getElementById("errorMessage").innerHTML = message;
    modal.showModal();
}

function checkPassword(password) { 
    let decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(password.match(decimal)) 
        return true;
    
    alertMessage("La password non rispetta il formato prestabilito")
    return false;    
} 

function checkUsername(username){
    if (  username.length < 5 ){
        alertMessage("L'username non rispetta il formato prestabilito");
        return false;
    }
    return true;
}

function checkLogin(username, password){
    if ( username.length == 0 || password.length == 0 ){
        alertMessage("Riempi entrambi i campi");
        return false;
    }
    return true;
}

function clearLoginFields(){
    document.getElementById("loginUsername").value = ''
    document.getElementById("loginPassword").value = ''
}
 
function submitLogin(){
    let loginUsername = document.getElementById("loginUsername").value;
    let loginPassword = document.getElementById("loginPassword").value;
    
    if ( !checkLogin(loginUsername, loginButton) ){
        clearLoginFields()
        return;
    }

    if ( !checkUsername(loginUsername) ){
        clearLoginFields()
        return;
    }

    if ( !checkPassword(loginPassword) ){
        clearLoginFields()
        return;
    }

    userLogin(loginUsername,loginPassword).then(
        (response) => { 
            isUserValidated(loginUsername).then( validationValue => {
                if (validationValue){
                    location.replace("./user.html");
                }
                else {
                    alertMessage("Conferma la mail prima di fare l'accesso");
                }
            });
        }
      ).catch(
        (errorObj) => {
          console.log(errorObj.errors[0]);
          alertMessage('Username e/o Password errati');
    
        }
      );
}

function contiansOnlyLetters(text){
    let regex = /^[a-zA-Z]+$/;
    return regex.test(text);
}

function checkCity(city){
    if ( !contiansOnlyLetters(city) ){
        alertMessage("Il nome della città può contenere solo lettere");
        return false;
    }
    return true;    
}

function checkProv(prov){
    if ( !contiansOnlyLetters(prov) ){
        alertMessage("Il nome della provincia può contenere solo lettere");
        return false;
    }
    return true;
}

function checkFullname(name,surname){
    if ( !contiansOnlyLetters(name) || !contiansOnlyLetters(surname) ){
        alertMessage("Il nome ed il cognome possono contenere solo lettere");
        return false;
    }
    return true;
}

function checkEmail(email){
    let mailformat = /\S+@\S+\.\S+/;
    if( !mailformat.test(email)){
        alertMessage("Indirizzo Email non valido");   
        return false;
    }
    return true;
}

function checkPasswords(password,repassword){
    if ( password != repassword ){
        alertMessage("Le due password inserite non sono uguali");   
        return false;
    }
    return true;
}

function checkSiginFields(name,surname,email,username,password,repassword,city,prov){
    if ( name.length == 0 || surname.length == 0 || email.length == 0 || username.length == 0 || password.length == 0 || repassword.length == 0 || city.length == 0 || prov.length == 0 ){
            alertMessage("Riempi tutti i campi");                                                       
            return false;
    }
    return true;
}

function checkCheckBox(checkbox){
    if( !checkbox ){
        alertMessage("Accetta i termini e le condizioni");
        return false;
    }
    return true;
}

function clearSiginFields(){
    document.getElementById("signName").value = '';
    document.getElementById("signSurname").value = '';
    document.getElementById("signEmail").value = '';
    document.getElementById("signUsername").value = '';
    document.getElementById("signPassword").value = '';
    document.getElementById("signRePassword").value = '';
    document.getElementById("signCity").value = '';
    document.getElementById("signProvince").value = '';
}

function submitSigin(){
    let signName = document.getElementById("signName").value;
    let signSurname = document.getElementById("signSurname").value;
    let signEmail = document.getElementById("signEmail").value;
    let signUsername = document.getElementById("signUsername").value;
    let signPassword = document.getElementById("signPassword").value;
    let signRePassword = document.getElementById("signRePassword").value;
    let signCity = document.getElementById("signCity").value;
    let signProvince = document.getElementById("signProvince").value;
    let signBox = document.getElementById("signBox").checked;

    if ( !checkSiginFields(signName,signSurname,signEmail,signUsername,signPassword,signRePassword,signCity,signProvince) ){
        clearSiginFields();
        return;
    }

    if ( !checkFullname(signName,signSurname) ){
        clearSiginFields(); 
        return;
    }
    
    if ( !checkEmail(signEmail) ){
        clearSiginFields();
        return;
    }

    if ( !checkUsername(signUsername) ){
        clearSiginFields(); 
        return;
    }
    
    if ( !checkPassword(signPassword) ){
        clearSiginFields();
        return;
    }

    if ( !checkPasswords(signPassword,signRePassword) ){
        clearSiginFields();
        return;
    }

     if ( !checkCity(signCity) ){
        clearSiginFields();
        return;
    }
        
    if ( !checkProv(signProvince) ){
        clearSiginFields();
        return;
    }

    if ( !checkCheckBox(signBox) ){
        clearSiginFields();
        return;
    }
    
    userSigin(signUsername,signPassword,signEmail,signName,signSurname,signCity,signProvince)
        .then(
            (response) => { 
                console.log(response);
                genericMessage("Per terminare la registrazione, conferma la mail che ti abbiamo invato");
            }
        ).catch(
            (errorObj) => {
            console.log(errorObj.errors[0]);
            alertMessage('Errore di registrazione');        
            }
        );
}

function collapsibleMenu() {
    var coll = document.getElementsByClassName("collapsible-menu");
    var i;
            
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}