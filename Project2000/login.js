const url = "127.0.0.1";

let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let loginButton = document.getElementById('login-btn');


loginButton.addEventListener('click', async (e) => {
    e.preventDefault()
    
    let res = await fetch(`http://${url}:8080/login`, {
        // 'mode': 'no-cors',
        'credentials': 'include',
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            "username": usernameInput.value,
            "password": passwordInput.value
        })
    })
    
    let data = await res.json();

    if (res.status == 200) {

        sessionStorage.setItem("username", data.username)

        sessionStorage.setItem("admin", data.admin)
        
       
        window.location.href="./home.html"
        
    }

    else if (res.status != 200) {
        let loginErrs = document.getElementById('login-error-msg')
        loginErrs.innerHTML = data.message
    }


});

