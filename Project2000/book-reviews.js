let isbn = 9780786966912
let reviewTbody = document.getElementById('review-tbody');

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

// let isbn = document.getElementById("ibsn").value

// function XX()
// {
//     first2 = document.getElementById("ibsn").value;

//     // console.log(first2)

// } 

// console.log(first2)


document.addEventListener('DOMContentLoaded', async () => {

    try {
        let res = await fetch(`http://127.0.0.1:8080/book/${isbn}/reviews`, {
        // 'mode': 'no-cors',
        'credentials': 'include',
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'}});
        

        
        
        let data = await res.json();



        console.log(data.review)

        addReviewsToTable(data.review);
    
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

        document.getElementById("title").innerHTML = 'Explorers Guide'

        reviewTbody.appendChild(row);


    }


}




