for (i = 0; i < db.length; i++) {
    var author = db[i];
    var MyTable = document.getElementById("tabelka");
    var row = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var textnode1 = document.createTextNode(db[i].id);
    var textnode3 = document.createTextNode(author.firstName);
    var textnode4 = document.createTextNode(author.lastName);
    td1.appendChild(textnode1);
    td2.appendChild(textnode3);
    td3.appendChild(textnode4);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    MyTable.appendChild(row);
}