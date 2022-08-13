const url = "127.0.0.1";
let logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async (e) => 
    {
        let result = await fetch(`http://${url}:8080/logout`, {
            'method': 'POST', 
            'credentials': 'include',
            'headers':{
                'Access-Control-Allow-Origin': '*'
            }
        })
        e.preventDefault();
        if (result.status === 201) {
            window.location.href = "./login.html"

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

let signupButton = document.querySelector('create-account');

signupButton.addEventListener('click', () => {
   modal.classList.add('is-active'); 
});

modalBg.addEventListener('click', () => {
    modal.classList.remove('is-active');
});


let myPage = document.querySelector('my-lib');
let signUp = document.querySelector('create-account');

document.addEventListener('DOMContentLoaded', (e) => {
    signUp.classList.add('is-hidden');
    
    if (sessionStorage.getItem('user') == null){
        
        myPage.classList.add('is-hidden');
    } else {
        signUp.classList.add('is-hidden');
    }
})

