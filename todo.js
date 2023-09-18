// call the elements ------------------------------------------------------------------------------
const form = document.querySelector("#addform");
const input = document.querySelector("#inputtodo");
const addbutton = document.querySelector("#ibutton");
const toplist = document.querySelector("#toplist");
const alert = document.querySelector("#alert");
const deleteButton = document.querySelector("#deletebutton");
const searchInput = document.querySelector("#searchtodo");


//creat events and call ------------------------------------------------------------------------------
runEvents();

function runEvents() {
    form.addEventListener("submit", addToDo);
    document.addEventListener("DOMContentLoaded", pageloaded);
    toplist.addEventListener("click", removeFromUI);
    deleteButton.addEventListener("click", removeAll);
    searchInput.addEventListener("keyup", filter);

}

//loaded --------------------------------------------------------------------------------------------
function pageloaded() {
    checkTheLS();
    todoRepo.forEach(item => {
        addToDoUI(item);
    }
    )
}

// alert --------------------------------------------------------------------------------------------
function showAlert(type, text) {
    const div = document.createElement("div");
    div.classList.add("alert", `alert-${type}`, "mt-3");
    div.role = "alert";
    div.textContent = text;
    alert.append(div);

    setTimeout(function () {
        div.remove();
    }, 2500);
}

//Create the array --------------------------------------------------------------------------------------------

let todoRepo = [];

//---------------------------------------------------------------------------------------------------------


function addToDo(e) {
    //*add on ınterface
    const sInput = input.value.trim();
    if (sInput == "" || sInput === "") {
        showAlert("danger", "Please fill the blank");
    } else {
        showAlert("success", "complete successfully");
        addToDoUI(sInput);

        //* add on localstorage
        addToDoLS(sInput);
    }
    input.value = "";
    e.preventDefault();
}

//-------------------------------------------------------------------------------------------------
function addToDoUI(text) {
    const list = document.createElement("li");
    list.classList.add("list-group-item", "d-flex", "justify-content-between");
    list.textContent = text;

    const link = document.createElement("a");
    link.href = "#";

    const icon = document.createElement("i");
    icon.classList.add("fa", "fa-remove", "text-black");
    icon.id = "icon";

    toplist.append(list);
    list.append(link);
    link.append(icon);

}

//-------------------------------------------------------------------------------------------------

function addToDoLS(value) {
    checkTheLS();
    todoRepo.push(value);
    localStorage.setItem("todos", JSON.stringify(todoRepo));

}

function checkTheLS() {
    if (localStorage.getItem("todos") == null) {
        todoRepo = [];
    } else {
        todoRepo = JSON.parse(localStorage.getItem("todos"))

    }
}
//-------------------------------------------------------------------------------------------------

function removeFromUI(e) {
    //* remove from UI
    if (e.target.id == "icon") {
        const isOkay = confirm("Are you sure to delete this toDo ?");
        if (isOkay == true) {
            const removeLi = e.target.parentElement.parentElement;
            removeLi.remove()

            //* Remove from Storage
            removeFromLS(removeLi.textContent);
            showAlert("success", "removed successfully")
        }
        else {
            return null;
        }
    }


}

function removeFromLS(rValue) {
    todoRepo.forEach(function (item, index) {
        if (rValue == item) {
            todoRepo.splice(index, 1);
        }
    })
    localStorage.setItem("todos", JSON.stringify(todoRepo));
}

//-------------------------------------------------------------------------------------------------

function removeAll(e) {
    //* remove from Interface
    let toDoList = document.querySelectorAll(".list-group-item");
    let isOkay = confirm("Are you sure to delete your list");
    if (toDoList.length > 0) {
        if (isOkay == true) {
            toDoList.forEach(item => {
                item.remove();
            })

            //* remove from LocalStorage 
            todoRepo = [];
            localStorage.setItem("todos", JSON.stringify(todoRepo));
            showAlert("success", "List is removed successfully");

        }
    } else {
        showAlert("warning", "There aren't any to-do");
    }
}

//-------------------------------------------------------------------------------------------------

function filter(e) {
    let searcher = e.target.value.toLowerCase().trim();
    let toDoList = document.querySelectorAll(".list-group-item");
    if (toDoList.length > 0) {
        toDoList.forEach(item => {
            if (item.textContent.toLocaleLowerCase().trim().includes(searcher)) {
                item.setAttribute("style", "display : block")
            } else {
                item.setAttribute("style", "display : none !important")
            }
        })
    } else {
        showAlert("warning", "There aren't any to-do")
    }
}