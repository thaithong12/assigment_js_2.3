// listdata
var arrayData ;

// data html
var data_html;

window.onload = function onInit() {
    var storedNames = JSON.parse(localStorage.getItem("data"));
    data_html = document.getElementById("no_data");
    
    if (storedNames && storedNames.length  > 0 ) {
        arrayData = storedNames;
        reloadTable();
    } else {
        arrayData = [];
        var no_data_html = document.getElementById("no_data");
        no_data_html.classList.remove("d-none")
        no_data_html.children[1].firstElementChild.textContent  = 
        "Chua co du lieu luc nay";
    }
}
function formSubmit(event) {
    event.preventDefault();
    let txt_title = document.getElementById("txt-title").value;
    if (validateData(txt_title)) {
        return;
    }
    const itemExecute = {
        title: txt_title,
        status: false
    }
    arrayData.push(itemExecute);
    reloadTable();

    reloadLocalStore();
}


function validateData(title) {
    if (title == '') {
        alert("Is Blank")
        return true;
    } 
    if (arrayData && arrayData.length > 0 ) {
        const listCheck = arrayData.filter(item => item.title == title);
        if (listCheck && listCheck.length > 0) {
            alert("Record Exists")
            return true;
        }
        return false;
     }
   
    return false;
}

function reloadTable() {
   let data_html_temp ;
   let data_show = document.getElementById("data-show");

   if (arrayData && arrayData.length > 0) {
        while (data_show.lastElementChild) {
            data_show.removeChild(data_show.lastElementChild);
        }

        arrayData.forEach(item => {
            data_html_temp = data_html.cloneNode (true);
            if (item.status) {
                let del_tag = document.createElement("del");
                del_tag.innerText = item.title;
                data_html_temp.children[1].firstElementChild.innerText = '';
                data_html_temp.children[1].firstElementChild.appendChild(del_tag);
                data_html_temp.classList.remove('bg-secondary');
                data_html_temp.classList.add('bg-light');
                data_html_temp.children[0].firstElementChild.classList.remove("d-none");
            } else {
                data_html_temp.children[1].firstElementChild.innerText = item.title;
            }
            data_html_temp.classList.remove("d-none");
            data_html_temp.children[1].firstElementChild.setAttribute("title_val", item.title);
           
            data_html_temp.children[2].firstElementChild.classList.remove("d-none");

            data_show.append(data_html_temp);
        });
   } else {
       data_html_temp = data_html.cloneNode (true);
        var no_data_html = document.getElementById("no_data");
        no_data_html.classList.remove("d-none")
        no_data_html.children[1].firstElementChild.textContent  = 
        "Chua co du lieu luc nay";
        no_data_html.classList.add('bg-secondary');
        no_data_html.classList.remove('bg-light');
   }
   addRowHandlers();
}

function addRowHandlers() {
    var table = document.getElementById("data-show");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var cells = currentRow.getElementsByTagName('td');

        for (j = 0 ; j < cells.length; j ++) {
            const currentCell = currentRow.cells[j];
            if (j == 0 || j == 1) {
                currentCell.onclick = createClickCheckHandler(currentRow);
            } else if ( j == 2) {
                currentCell.onclick = createClickRemoveHandler(currentRow);
            }
        }
    }
}

function reloadLocalStore() {
    localStorage.clear();
    localStorage.setItem("data", JSON.stringify(arrayData));
}


var createClickCheckHandler = function (row) {
    return function () {
        let title_temp = row.children[1].firstElementChild.getAttribute("title_val");
        if (arrayData && arrayData.length > 0) {
            const data = arrayData.find(item => item.title == title_temp);
            data.status = !data.status;
            reloadTable();
            reloadLocalStore();
        }
    }
}

var createClickRemoveHandler = function (row) {
    return function () {
       let title_temp = row.children[1].firstElementChild.getAttribute("title_val");
       var r = confirm("Do you want delete Record "  + title_temp + "?");
       if (r == true) {
        if (arrayData && arrayData.length > 0) {
            arrayData = arrayData.filter(item => item.title !== title_temp);
            reloadTable();
            reloadLocalStore();
        }
    }
    }
}