
let logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', async (e) => 
    {
        let result = await fetch('http://127.0.0.1:8080/logout', {
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



async function getRes() {    
    try{
        let statuses = document.querySelectorAll('#status-menu a');
        let status;
        for (let choice of statuses) {
            if (choice.classList.contains('is-active')) {
                status = `${choice.id}`;
                break;
            }
        }

        let types = document.querySelectorAll('#type-menu a');
        let type;
        for (let choice of types) {
            if (choice.classList.contains('is-active')) {
                type = `${choice.id}`;
                break;
            }
        }

        let getBooks = await fetch(`http://127.0.0.1:8080/fm/manybooks?filter-status=${status}&filter-type=${type}`, {
                'credentials': 'include',
                'method': 'GET'
        })
        if (getBooks.status === 201) {
            let booksJson = await getBooks.json();
            addBookToTable(booksJson);
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
    for (re of books.books) {
        let row = document.createElement('tr');
        let title = document.createElement('td');
        if (re.status === 'pending'){
            title.innerHTML = `<input class="checkbox" type="checkbox" name="selected" id="check${re.book_id}">`;
        }
        else {
            title.innerHTML = '';
        }
        let subtitle = document.createElement('td');
        subtitle.innerHTML = re.book_id;        
        let author = document.createElement('td');
        author.innerHTML = re.author;
        let descrip = document.createElement('td');
        descrip.innerHTML = re.description;
        // let type = document.createElement('td');
        // type.innerHTML = re.type;
               
        let picture = document.createElement('td');
        if (re.picture != "None") {
            picture.innerHTML = `<button class="button" name ="picture-btn" id="${re.picture}">picture</button>`;
            console.log(re.picture)
            picture.addEventListener('click', (e) => {
                modal.classList.add('is-active')
                fetch(`http://127.0.0.1:8080/get-picture/${e.target.id}`)
                    .then(response => response.blob())
                    .then(imageBlob => {
                        const imgObjURL = URL.createObjectURL(imageBlob);
                        console.log(imgObjURL);
                        pictureImg.src = imgObjURL
                    })
            })
        }
        else {
            picture.innerHTML = '';
        }
    
        

        row.appendChild(title);
        row.appendChild(subtitle);
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
    let result = await fetch('http://127.0.0.1:8080/fm/manybooks', {
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
    let result = await fetch('http://127.0.0.1:8080/fm/manybooks', {
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
