const url = "http://127.0.0.1:3001";

async function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        fetch(url + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password}),
        }).then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    resolve(user);
                });
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function userLogout(username, password) {
    return new Promise((resolve, reject) => {
        fetch(url + 'api/logout', {
            method: 'POST',
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        });
    });
}

async function userSigin(username, password, mail, name, surname, city, prov) {
    return new Promise((resolve, reject) => {
        fetch(url + '/api/sigin', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password, name: name, surname: surname, mail: mail, city: city, prov: prov})
        }).then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    resolve(user);
                });
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function isUserValidated(username){

    let requestUrl = url + "/api/verifyUser/" + username;
    const response = await fetch(requestUrl);
    const valueJson = await response.json();
    return valueJson.verification;
}

async function validateUser(username, code){
    
    let requestUrl = url + `/api/verificationRequest/${username}/${code}`;
    const response = await fetch(requestUrl);
    const valueJson = await response.json();
    return valueJson.verificationRequest;
}

async function getUserChat(username){

    let requestUrl = url + `/api/user/getChats/${username}`;
    const response = await fetch(requestUrl);
    const valueJson = await response.json();
    let parsedResponse = JSON.parse(valueJson)
    const mapResponse = new Map(Object.entries(parsedResponse));
    return mapResponse;
}

async function insertChat(srcUser, destUser, message){
    return new Promise((resolve, reject) => {
        fetch(url + '/api/user/insertMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({srcUsername: srcUser, destUsername: destUser, messageContent: message})
        }).then((response) => {
            if (response.ok) {
                resolve(true);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        });
    });    
}

//NON SI SA SE SO GIUSTE

async function ibanInfo(namePay, ibanPay) {
    return new Promise((resolve, reject) => {
        fetch(url + '/api/printer/insertIbanInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({namePay: namePay, ibanPay: ibanPay}),
        }).then((response) => {
            if (response.ok) {
                response.json().then((printer) => {
                    resolve(printer);
                });
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function ppInfo(ppPay) {
    return new Promise((resolve, reject) => {
        fetch(url + '/api/printer/insertPPInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ppPay: ppPay}),
        }).then((response) => {
            if (response.ok) {
                response.json().then((printer) => {
                    resolve(printer);
                });
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}
