$.getJSON('http://localhost:5000/api/authors', function (authors) {
    ShowData(authors);

    $("#save").click(function () {
        add_author($('#first-name').val(), $('#surname').val());
    });
});

function ShowData(db) {
    for (i = 0; i < db.length; i++) {
        var author = db[i];
        var MyTable = document.getElementById("tabelka");
        var row = document.createElement("tr");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var deltt = document.createTextNode("X");
        var editt = document.createTextNode("E");
        var btnDel = document.createElement("button");
        var btnEdit = document.createElement("button");
        btnDel.appendChild(deltt);
        btnDel.setAttribute("id", db[i].id);
        btnDel.onclick = del;
        btnEdit.appendChild(editt);
        btnEdit.setAttribute("id", db[i].id);
        btnEdit.onclick = edit;

        var textnode3 = document.createTextNode(author.firstName);
        var textnode4 = document.createTextNode(author.lastName);
        td2.appendChild(textnode3);
        td3.appendChild(textnode4);
        td4.appendChild(btnDel);
        td4.appendChild(btnEdit);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        MyTable.appendChild(row);
    }
}

function del() {
    id = $(this).attr('id');
    jQuery.ajax({
        url: 'http://localhost:5000/api/authors/' + id,
        type: 'DELETE',
        success: function () {
            window.location.reload(true);
        }
    });
}

function add_author(name, surname) {
    var author = { FirstName: name, LastName: surname };
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:5000/api/authors",
        data: JSON.stringify(author),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: window.location.reload(true)
    });
}

function edit() {
    var id = $(this).attr('id');
    var cells = $(this).parent().parent().children();
    var name = cells[1].innerText;
    var surname = cells[2].innerText;
    $('#edit-authors').toggle();
    $('#edit-first-name').val(name);
    $('#edit-surname').val(surname);
    $('#save-edited').click(function () {
        jQuery.ajax({
            url: 'http://localhost:5000/api/authors/' + id,
            type: 'DELETE',
            success: function () {
                add_author($('#edit-first-name').val(), $('#edit-surname').val());
            }
        });

    });
    $('#close').click( function(){
        $('#edit-authors').toggle();
    });

}