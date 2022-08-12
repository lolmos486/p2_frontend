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
let reviewTbody = document.getElementById('review-tbody');

// define variables and click events for navbar 

let usn = sessionStorage.getItem("username")

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
        let res = await fetch(`http://127.0.0.1:8080/users/${usn}`, {
        // 'mode': 'no-cors',
        'credentials': 'include',
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'}});
        

        
        
        let data = await res.json();



        console.log(data);
        document.getElementById("title").innerHTML += data.username;
        document.getElementById("author").innerHTML += data.joined;

        console.log(data.favorite_genre)

        addReviewsToTable(data.reviews);


    
    } catch(err) {
        console.log(err);
    }
}
);

function addReviewsToTable(review_obj){
    for (review of review_obj){

        let row = document.createElement('tr');

        let isbnCell = document.createElement('td');
        isbnCell.innerHTML = review.isbn;

        let reviewCell = document.createElement('td');
        reviewCell.innerHTML = review.review;

        let ratingCell = document.createElement('td');
        ratingCell.innerHTML = review.rating;
        
        let authorCell = document.createElement('td');
        authorCell.innerHTML = review.author;

        row.appendChild(isbnCell);
        row.appendChild(reviewCell);
        row.appendChild(ratingCell);
        row.appendChild(authorCell);

        // console.log(isbnCell)



        reviewTbody.appendChild(row);


    }


}




