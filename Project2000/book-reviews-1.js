const url = "127.0.0.1";

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

let reviewTbody = document.getElementById('review-tbody');

//declare variables for search buttons

let isbnInput = document.getElementById('isbn-input');
let searchButton = document.getElementById('search-btn')

let usernameInput = document.getElementById('username-input');
let searchUsernameButton = document.getElementById('search-usn-btn');


searchButton.addEventListener("click", function(){
    sessionStorage.setItem("isbn", isbnInput.value)
});

let isbn = sessionStorage.getItem("isbn")



searchUsernameButton.addEventListener("click", function(){
    sessionStorage.setItem("username", usernameInput.value)
});

let username = sessionStorage.getItem("username")





// populate table

document.addEventListener('DOMContentLoaded', async () => {

    try {
        let res = await fetch(`http://${url}:8080/books/${isbn}`, {
        // 'mode': 'no-cors',
        'credentials': 'include',
        'method': 'GET',
        'headers': {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'

        
        
        }});
        

        
        
        let data = await res.json();



        console.log(data);
        document.getElementById("title").innerHTML = data.title;
        document.getElementById("author").innerHTML = data.author;

        addReviewsToTable(data.reviews);


    
    } catch(err) {
        console.log(err);
    } 
}
);

function addReviewsToTable(review_obj){
    for (review of review_obj){

        let row = document.createElement('tr');

        // let isbnCell = document.createElement('td');
        // isbnCell.innerHTML = review.isbn;

        let reviewCell = document.createElement('td');
        reviewCell.innerHTML = review.review;

        let ratingCell = document.createElement('td');
        ratingCell.innerHTML = review.rating;
        

        let reviewerCell = document.createElement('td');
        reviewerCell.innerHTML = `<a>${review.reviewer}</a>`;
        reviewerCell.addEventListener('click', async (e) => {
            await fetch(`http://${url}:8080/users/${review.reviewer}`)
        })


        // row.appendChild(isbnCell);
        row.appendChild(reviewCell);
        row.appendChild(ratingCell);
        row.appendChild(reviewerCell);

        // console.log(isbnCell)



        reviewTbody.appendChild(row);


    }


}




