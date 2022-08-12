let submitButton = document.getElementById("submit-btn");
let ratingInput = document.getElementById("rating-input");
let reviewInput = document.getElementById('review-input');

let username = sessionStorage.getItem('username');

let isbn = sessionStorage.getItem('isbn')

// let today = new Date()

console.log(isbn)

// alert("!")

submitButton.addEventListener('click', async (e) => {

    try {
        let formData = new FormData();
        
        formData.append('rating', ratingInput.value);
        formData.append('review', reviewInput.value);
        // formData.append('isbn', isbn.value);
        
        formData.append('isbn', 9780786966912);
        formData.append('user', 'Bren');

        // formData.append('type', selectedType.value);
        // formData.append('receipt', receipt.files[0]);
        
        
        console.log(ratingInput.value);
        console.log(reviewInput.value);


        e.preventDefault();



        let result = await fetch('http://127.0.0.1:8080/book/review', {
            'credentials': 'include',
            'method': 'POST',


            'body': formData

        })
        
        if (result.status == 201) {
            // window.location.href = './employee-home.html'
        }
        else if (result.status == 400) {
            let data = await result.json();
            modal.classList.add('is-active')
            console.log(data);
            let errorMessagesDiv = document.getElementById('error-msgs')
            errorMessagesDiv.innerHTML = data.message;


        }
    }
    catch (err) {
        console.log(err);
    }

})    











