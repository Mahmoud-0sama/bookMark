




var bookmarkName = document.querySelector('#bookmarkName');
var bookmarkURL = document.querySelector('#bookmarkURL');
var tableData = document.querySelector('#tableData')
var submitBook = document.querySelector('#sumbitBook')
var boxInfo = document.querySelector('#boxInfo')
var closeBtn = document.querySelector('#closeBtn')



var bookList;

if (localStorage.getItem('bookList') != null) {
    bookList = JSON.parse(localStorage.getItem('bookList'));
    displayBook();
    console.log(bookList)
} else {
    bookList = [];
}


function addBook() {

    if (bookmarkName.classList.contains('is-valid') 
        && bookmarkURL.classList.contains('is-valid') 

    ) {
        var newBook = {
            name: bookmarkName.value,
            url: bookmarkURL.value,
        }

        bookList.push(newBook);
        localStorage.setItem('bookList', JSON.stringify(bookList));
        console.log(bookList);
        clearForm();
        displayBook(bookList);
        boxInfo.classList.add('d-none')
    }else{
        boxInfo.classList.remove('d-none')
    }

}

submitBook.addEventListener('click', function (evenInfo) {

    addBook();
})


function clearForm() {

    bookmarkName.value = null;
    bookmarkURL.value = null;
}

function displayBook() {
    var cartoona = ``
    for (var i = 0; i < bookList.length; i++) {
        cartoona += `<tr>
                      <td>${[i + 1]}</td>
                      <td>${bookList[i].url}</td>
                      <td>
                        <button onclick="visitBook(${i})" type="button" class="btn btn-visit">
                            <i class="fa-solid fa-eye pe-2"></i>
                            Visit
                        </button>
                      </td>
                      <td>
                        <button onclick="deleteBook(${i})" type="button" class="btn btn-delete ">
                            <i class="fa-solid fa-trash-can"></i>
                            Delete
                        </button>
                      </td>
                    </tr>`
    }
    tableData.innerHTML = cartoona

}


function deleteBook(deleteIndex) {

    bookList.splice(deleteIndex, 1)
    localStorage.setItem('bookList', JSON.stringify(bookList))
    console.log(bookList)
    displayBook();
}


function validateForm(element) {

    var regex = {
        bookmarkName: /^\w{3,20}\s?\w{0,20}\s?\w{0,20}$/,
        bookmarkURL: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    }

    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.addEventListener('input', function (e) {
            element.style.borderColor = '#198754';
            element.style.boxShadow = '0 0 0 .25rem rgba(25, 135, 84, .25)';
        })
        return true
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.addEventListener('input', function (e) {
            element.style.borderColor = '#dc3545';
            element.style.boxShadow = '0 0 0 .25rem rgba(220, 53, 69, .25)';
        })
        return false
    }

}

closeBtn.addEventListener('click', function(e){

    boxInfo.classList.add('d-none')

})
boxInfo.addEventListener('click', function(e){

    boxInfo.classList.add('d-none')

})

boxInfo.firstElementChild.addEventListener('click', function(e){

    e.stopPropagation()
})