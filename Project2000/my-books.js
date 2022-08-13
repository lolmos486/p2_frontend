const url = "127.0.0.1";
let books;

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
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
const pictureImg = document.getElementById('picture-img');
var status = null;
var type = null;


const statusMenu = document.querySelector('#status-ddown');
let statusBtn = document.getElementById('status-ddown');
statusBtn.addEventListener('click', () => {
    statusMenu.classList.toggle('is-active');
})

const statDDown = document.querySelectorAll('#status-menu a');

statDDown.forEach((item) => {
    item.addEventListener('click', () => {
        statDDown.forEach(a => a.classList.remove('is-active'));
        item.classList.add('is-active');
        let text = document.createTextNode(`${item.id}`);
        let tag = document.getElementById('status-text');
        tag.innerHTML = '';
        tag.appendChild(text);
        
    })
})

const typeMenu = document.querySelector('#type-ddown');
let typeBtn = document.getElementById('type-ddown');
typeBtn.addEventListener('click', () => {
    typeMenu.classList.toggle('is-active');
})
const typeDDown = document.querySelectorAll('#type-menu a');

typeDDown.forEach((item) => {
    item.addEventListener('click', () => {
        typeDDown.forEach(a => a.classList.remove('is-active'));
        item.classList.add('is-active');
        let text = document.createTextNode(`${item.id}`);
        let tag = document.getElementById('type-text');
        tag.innerHTML = '';
        tag.appendChild(text);
    })
})


let getBooksBtn = document.querySelector('#fetch-books');
getBooksBtn.addEventListener('click', getRes);

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

async function getRes() {    
    try{
        
        console.log(sessionStorage.username);
        let getBooks = await fetch(`http://${url}:8080/users/${sessionStorage.username}`, {
                'credentials': 'include',
                'method': 'GET'
        })
        console.log(getBooks);
        if (getBooks.status === 200) {
            let booksJson = await getBooks.json();
            console.log("insied status 200")
            console.log(booksJson);
            
            books = booksJson.reviews
            addBookToTable(books);
            console.log("books array")
            console.log(books)
        }
        else if (getBooks.status === 401) {
            window.location.href = "./login.html"
        }
    } catch (err) {
        console.log(err)
    }
}



function addBookToTable(books){
    let bookTable = document.querySelector('#books-table tbody');
    bookTable.innerHTML = '';
    for (book of books) {
        console.log(book.author);
        let row = document.createElement('tr');
        let title = document.createElement('td');
        title.innerHTML = `<p>${book.title}</p><p>(${book.isbn})</p>`;
        
        let isbn = document.createElement('td');
        isbn.innerHTML = book.isbn;        
        let author = document.createElement('td');
        author.innerHTML = book.author;
        let descrip = document.createElement('td');
        descrip.innerHTML = book.review;
        // let type = document.createElement('td');
        // type.innerHTML = book.type;
               
        // let picture = document.createElement('td');
        // if (book.picture != "None") {
        //     picture.innerHTML = `<button class="button" name ="picture-btn" id="${book.picture}">picture</button>`;
        //     console.log(book.picture)
        //     picture.addEventListener('click', (e) => {
        //         modal.classList.add('is-active')
        //         fetch(`http://${url}:8080/get-picture/${e.target.id}`)
        //             .then(response => response.blob())
        //             .then(imageBlob => {
        //                 const imgObjURL = URL.createObjectURL(imageBlob);
        //                 console.log(imgObjURL);
        //                 pictureImg.src = imgObjURL
        //             })
        //     })
        // }
        // else {
        //     picture.innerHTML = '';
        // }
    
        
        // row.appendChild(isbn);
        row.appendChild(title);
        
        row.appendChild(author);
        // row.appendChild(type);
        row.appendChild(descrip);
        
        bookTable.appendChild(row);

    }
}

getRes();





function getSelectedBooks() {
    let reToUpdate = [];
    console.log('in get-selected');
    let bookTable = document.querySelector('#books-table tbody');
    for (let i in bookTable.rows) {
        try {
            let bookId = bookTable.rows[i].cells[1].textContent;
            let check = document.getElementById(`check${bookId}`);
            let active = check.checked;        
            // console.log(bookId);
            // console.log(check);
            // console.log(active);
            if (active){
                reToUpdate.push(bookId);
            }
        }
        catch (e) {
            break;
        }

    }
    // console.log(reToUpdate);
    return reToUpdate;
}

let addBooksBtn = document.getElementById('add-books');
addBooksBtn.addEventListener('click', async () => {
    console.log('clicked add-books');
    let selected = getSelectedBooks();
    let result = await fetch(`http://${url}:8080/fm/manybooks`, {
            'method': 'PUT', 
            'credentials': 'include',
            'headers': {
                'Content-type': 'application/json'
            },
            'body': JSON.stringify({
                'status': 'added',
                'to_update': `${selected}`
            })
        })
    if (result.status === 201){
        getRes();
    }
    
})

let deleteBooksBtn = document.getElementById('delete-books');
deleteBooksBtn.addEventListener('click', async () => {
    console.log('clicked delete-books');
    let selected = getSelectedBooks();
    let result = await fetch(`http://${url}:8080/fm/manybooks`, {
            'method': 'PUT', 
            'credentials': 'include',
            'headers': {
                'Content-type': 'application/json'
            },
            'body': JSON.stringify({
                'status': 'deleted',
                'to_update': `${selected}`
            })
        })
    if (result.status === 201){
        getRes();
    }
    
})

modalBg.addEventListener('click', () => {
    modal.classList.remove('is-active')
    pictureImg.src = '';
})
