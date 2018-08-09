$.getJSON('http://localhost:5000/api/books', function (books) {
    $.getJSON('http://localhost:5000/api/authors', function (authors) {
        ShowData(books, authors);
        FillSelectWithAuthors(authors);

        $("#save").click(function () {
            add_book($('#title').val(), parseInt($('#author_id').val(), 10));
        });
    });
});


function ShowData(db1, db2) {
    for (i = 0; i < db1.length; i++) {
        var MyTable = document.getElementById("tabelka");

        function FindAuthor(Next) {
            return Next.id == db1[i].authorId;
        }

        var author = db2.find(FindAuthor);
        var row = document.createElement("tr");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var deltt = document.createTextNode("X");
        var editt = document.createTextNode("E");
        var btnDel = document.createElement("button");
        var btnEdit = document.createElement("button");
        btnDel.appendChild(deltt);
        btnDel.setAttribute("id", db1[i].id);
        btnDel.onclick = del;
        btnEdit.appendChild(editt);
        btnEdit.setAttribute("id", db1[i].id);
        btnEdit.onclick = edit;
        var textnode2 = document.createTextNode(db1[i].title);
        var textnode3 = document.createTextNode(author.firstName);
        var textnode4 = document.createTextNode(author.lastName);
        td2.appendChild(textnode2);
        td3.appendChild(textnode3);
        td4.appendChild(textnode4);
        td5.appendChild(btnDel);
        td5.appendChild(btnEdit);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(td5);
        MyTable.appendChild(row);

    }

}

function FillSelectWithAuthors(authors) {
    for (i = 0; i < authors.length; i++) {
        $('#author_id').append('<option value="' + authors[i].id + '">' + authors[i].firstName + " " + authors[i].lastName + '</option>');
    }
}

function del() {
    id = $(this).attr('id');
    jQuery.ajax({
        url: 'http://localhost:5000/api/books/' + id,
        type: 'DELETE',
        success: function () {
            window.location.reload(true);
        }
    });
}

function add_book(title, author_id) {
    var book = { Title: title, AuthorId: author_id };
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:5000/api/books",
        data: JSON.stringify(book),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: window.location.reload(true)
    });
}

function edit() {

    var id = $(this).attr('id');
    var cells = $(this).parent().parent().children();
    var title = cells[1].innerText;
    var name = cells[2].innerText;
    var surname = cells[3].innerText;
    $('#edit-books').toggle();
    $('#edit-title').val(title);
    $.getJSON('http://localhost:5000/api/authors', function (authors) {
        for (i = 0; i < authors.length; i++) {
            $('#edit-author_id').append('<option value="' + authors[i].id + '">' + authors[i].firstName + " " + authors[i].lastName + '</option>');
        }
    });
    $('#save-edited').click(function () {
        jQuery.ajax({
            url: 'http://localhost:5000/api/books/' + id,
            type: 'DELETE',
            success: function () {
                add_book($('#edit-title').val(), $('#edit-author_id').val());
            }
        });

    });
    $('#close').click(function () {
        $('#edit-books').toggle();
    });

}