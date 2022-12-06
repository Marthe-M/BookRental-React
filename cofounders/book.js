let book1 = {
    id: 1,
    title: 'book1',
    author: 'author1',
    isbn: 'isbn1'
}

let book2 = {
    id: 2,
    title: 'book1',
    author: 'author1',
    isbn: 'isbn1'
}

let book3 = {
    id: 3,
    title: 'book1',
    author: 'author1',
    isbn: 'isbn1'
}

books = [book1, book2, book3];

latestBookEdit = null;

function createBook() {
    // Formulier uitlezen
    let titleValue = document.getElementById('title').value;
    let authorValue = document.getElementById('author').value;
    let isbnValue = document.getElementById('ISBN').value;

    let newBook = {
        title: titleValue,
        author: authorValue,
        isbn: isbnValue
    }

    books.push(newBook);

    document.getElementById('title').value = "";   
    document.getElementById('author').value = "";    
    document.getElementById('ISBN').value = "";     

    fetch("http://localhost:8082/createbook", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
    })
    .then(response => {
        alert('Success');
        getAllBooks();
    })
    .catch(error => {
        alert('Error creating book');
    });
}

function initializeEditBook(id){

    let booktitle = document.getElementById('title');   
    let bookAuthor = document.getElementById('author');   
    let bookISBN = document.getElementById('ISBN');   

    // const foundBook = books.find(book => id == book.id); // UPDATE

    fetch(`http://localhost:8082/book/${id}`)
    .then(res => res.json())
    .then(response => {
        // alert(`Successfully updated book with id ${latestBookEdit}`);

        booktitle.value = response.title;
        bookAuthor.value = response.author;
        bookISBN.value = response.isbn;
    
        latestBookEdit = response.id;
    })
    .catch(error => {
        alert(`Error updating values of book with id ${latestBookEdit}`);
    });
}

function editBook(){

    let titleValue = document.getElementById('title').value;
    let authorValue = document.getElementById('author').value;
    let isbnValue = document.getElementById('ISBN').value;

    let newBook = {
        title: titleValue,
        author: authorValue,
        isbn: isbnValue
    }

    fetch(`http://localhost:8082/book/${latestBookEdit}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
    })
    .then(response => {
        alert(`Successfully updated book with id ${latestBookEdit}`);
        latestBookEdit = null;
    })
    .catch(error => {
        alert(`Error updating values of book with id ${latestBookEdit}`);
    });
}

function deleteBook(id){

    fetch(`http://localhost:8082/book/${id}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        alert(`Successfully deleted book with id ${id}`);
        latestBookEdit = null;
        getAllBooks();
    })
    .catch(error => {
        alert(`Error deleting book with id ${id}`);
    });
}


function getAllBooks(){

    // let table = document.getElementById('book_table');
    
    // books.forEach(book => {
    //     table.innerHTML += `

    //     <tr>
    //         <td>
    //             ${book.id}
    //         </td>
    //         <td>
    //             ${book.title}
    //         </td>
    //         <td>
    //             ${book.author}
    //         </td>
    //         <td>
    //             ${book.isbn}
    //         </td>
    //         <td>
    //             <button type="button" onclick="deleteBook(${book.id})">Delete book</button>
    //             <button type="button" onclick="initializeEditBook(${book.id})">Edit book</button>
    //         </td>
    //     </tr>

    //     `;
    // });

    fetch("http://localhost:8082/book/all")
        .then(res => res.json())
        .then(books => {
            let table = document.getElementById('book_table');
            
            books.forEach(book => {
                table.innerHTML += `

                <tr>
                    <td>
                        ${book.id}
                    </td>
                    <td>
                        ${book.title}
                    </td>
                    <td>
                        ${book.author}
                    </td>
                    <td>
                        ${book.isbn}
                    </td>
                    <td>
                        <button type="button" onclick="deleteBook(${book.id})">Delete book</button>
                        <button type="button" onclick="initializeEditBook(${book.id})">Edit book</button>
                    </td>
                </tr>

                `;
            });
        })
}