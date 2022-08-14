const url = "127.0.0.1";

let myPage = document.getElementById('my-lib');
let signUp = document.getElementById('create-account');
let logoutBtn = document.getElementById('logout-btn');
let loginBtn = document.getElementById('login-btn')

window.addEventListener('load', (e) => {
    console.log('in window load block');
    console.log(sessionStorage.getItem('username'))
    if (sessionStorage.getItem('username') != null){
        signUp.classList.add('is-hidden');
        myPage.classList.remove('is-hidden');
        logoutBtn.classList.remove('is-hidden');
        loginBtn.classList.add('is-hidden');
    } else {
        signUp.classList.remove('is-hidden');
        myPage.classList.add('is-hidden');
        logoutBtn.classList.add('is-hidden');
        loginBtn.classList.remove('is-hidden');
    }
})


logoutBtn.addEventListener('click', async (e) => 
    {
        let result = await fetch(`http://${url}:8080/logout`, {
            'method': 'POST', 
            'credentials': 'include',
            'headers':{
                'Access-Control-Allow-Origin': '*'
            }
        })
        sessionStorage.clear();
        e.preventDefault();
        if (result.status === 201) {
            window.location.href = "./home.html"

        }
    }
)

// mobile menu
const burgerIcon=document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active')
});

// tabs
const tabs = document.querySelectorAll('.tabs li');
const tabContentBoxes = document.querySelectorAll('#tab-content > div');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('is-active'))
        tab.classList.add('is-active');

        const target = tab.dataset.target;
        tabContentBoxes.forEach(box => {
            if (box.getAttribute('id') === target) {
                box.classList.remove('is-hidden');
            } else{
                box.classList.add('is-hidden');
            }
        })
    })
})

// modal
const reviewButton = document.querySelector('#review'); 
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');



// signupButton.addEventListener('click', () => {
//    modal.classList.add('is-active'); 
// });

// modalBg.addEventListener('click', () => {
//     modal.classList.remove('is-active');
// });


let isbnInput = document.getElementById('isbn-input');
let searchButton = document.getElementById('search-btn')

let usernameInput = document.getElementById('username-input');
let searchUsernameButton = document.getElementById('search-usn-btn');


searchButton.addEventListener("click", function(){
    sessionStorage.setItem("isbn", isbnInput.value)
});

let isbn = sessionStorage.getItem("isbn")
console.log("in book-reviews-1")
console.log(sessionStorage.getItem("isbn"))



searchUsernameButton.addEventListener("click", function(){
    sessionStorage.setItem("username", usernameInput.value)
});

let username = sessionStorage.getItem("username")


