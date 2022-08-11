let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let loginButton = document.getElementById('login-btn');


loginButton.addEventListener('click', async (e) => {
    e.preventDefault()
    
    let res = await fetch(`http://127.0.0.1:8080/login`, {
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
    

    if (res.status == 200) {
        let data = await res.json();

        sessionStorage.setItem("username", data.username)

        sessionStorage.setItem("admin", data.admin)
        
       
        window.location.href="./home.html"
        
    }

    else if (res.status != 200) {
        console.log("Unsuccessful login")
    }


});

