function onCloseModal(){

    document.getElementById("errorModal").close();

}


function alertMessage(message){

    let modal = document.getElementById("errorModal");
    document.getElementById("errorMessage").innerHTML = message;
    modal.showModal();

}

function checkPassword(password) { 

    let decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(password.match(decimal)) 
        return true;
    
    alertMessage('Password Errata')
    return false;    
} 

function checkUsername(username){
    if (  username.length < 5 ){
        alertMessage('Username Errato');
        return false;
    }

    return true;
}

function checkLogin(username, password){

    if ( username.length == 0 || password.length == 0 ){
        alertMessage('Riempi tutti i campi');
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
    
    //fai partire la richiesta la server
}

