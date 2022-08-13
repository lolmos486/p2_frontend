const url = "127.0.0.1";
const port = "8080";
let myPage = document.getElementById('my-lib');
let signUp = document.getElementById('create-account');

window.addEventListener('load', (e) => {
    console.log('in window load block');
    console.log(sessionStorage.getItem('username'))
    if (sessionStorage.getItem('username') != null){
        signUp.classList.add('is-hidden');
        myPage.classList.remove('is-hidden');
    } else {
        signUp.classList.remove('is-hidden');
        myPage.classList.add('is-hidden');
    }
})



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
        sessionStorage.clear();
        e.preventDefault();
        if (result.status === 201) {
            window.location.href = "./home.html"

        }
    }
)

let isbn = document.getElementById('isbn-input');
let title = document.getElementById('title-input');
let author = document.getElementById('author-input');
let edition = document.getElementById('edition-input');
let genre = document.getElementById('genre-input');
let submitBtn = document.getElementById('submit-new-book');

submitBtn.addEventListener('click', async (E) => {
    console.log('click')
    try {
        let form = new FormData();
        form.append('isbn', isbn.value);
        form.append('title', title.value);
        form.append('author', author.value);
        form.append('edition', edition.value);
        form.append('genre', genre.value);
        sessionStorage.setItem("isbn", isbn.value)

        let result = await fetch(`http://${url}:${port}/book`, {
            'credentials': 'include',
            'method': 'POST',
            'body': form
        })
        if (result.status = 201){
            window.location.href = `./book-reviews-1.html`;
        }
        else if (result.status == 400) {
            let data = await result.json();
        }
    }
    catch (err) {
        console.log(err);
    }
})

