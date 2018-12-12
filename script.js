let getUsers = document.querySelector(".getUsers");
let getUserById = document.querySelector(".getUserById");
let postUser = document.querySelector(".postUser");
let updateUser = document.querySelector(".updateUser");
let deleteUser = document.querySelector(".deleteUser");


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//  GET REQUEST
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

let displayUsers = (data) => {

    let usersList = document.querySelector(".usersList");

    while (usersList.hasChildNodes()) {
        usersList.removeChild(usersList.firstChild)
    };

    data.map((x) => {
        console.log(x.studentName);
        let li = document.createElement("li");
        li.innerHTML = /*html*/ `
        <p>Student Name: ${x.studentName}</p>
        <p>Watch subject: ${x.nextWatchSubject}</p>
        <p>Next Watch: ${x.nextWatchDate}</p>
        <p>User ID: ${x._id}</p>
        `
        usersList.appendChild(li);
    })
}

let showUsers = () => {
    let url = "https://watchmanager.herokuapp.com/student"

    fetch(url)
        .then(response => response.json())
        .then(parsedData => displayUsers(parsedData))
        .catch((error) => console.warn(error))    
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//  GET BY ID REQUEST
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

let displaySingleUser = (x) => {
    let singleUser = document.querySelector(".singleUser");

    while (singleUser.hasChildNodes()) {
        singleUser.removeChild(singleUser.firstChild)
    };

    let li = document.createElement("li");
    li.innerHTML = /*html*/ `
        <p>Student Name: ${x.studentName}</p>
        <p>Watch subject: ${x.nextWatchSubject}</p>
        <p>Next Watch: ${x.nextWatchDate}</p>
        <p>User ID: ${x._id}</p>
        `
    singleUser.appendChild(li);
}

let showUsersParam = (id) => {
    let url = `https://watchmanager.herokuapp.com/student/${id}`;

    fetch(url)
        .then(response => response.json())
        .then(parsedData => displaySingleUser(parsedData))
        .catch((error) => console.warn(error))
    document.querySelector(".inputID").value = ""
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//  POST REQUEST
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

let enterPost = (e) => {
    e.toString();
    let url = "https://watchmanager.herokuapp.com/student";

    fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                "studentName" : e
            })
        })
    document.querySelector(".funny").value = ";"
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//  UPDATE REQUEST
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

let sendUpdates = (e) => {
    
    let newName = document.querySelector(".updateName");
    let newSubject = document.querySelector(".updateSubject");
    let newDate = document.querySelector(".updateDate");
    let userID = document.querySelector(".userID");

    let url = `https://watchmanager.herokuapp.com/student/${e}`;

    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            "studentName" : newName.value,
            "nextWatchSubject": newSubject.value,
            "nextWatchDate": newDate.value
        })
    })

    userID.value = "";
    newName.value = "";
    newSubject.value = "";
    newDate.value = "";
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//  DELETE REQUEST
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   
let deleteFunction =(e) => {
    let url = `https://watchmanager.herokuapp.com/student/${e}`
    fetch(url, {
        method: "DELETE",
    })
    document.querySelector(".notFunny").value = "";
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//  EVENT LISTENERS
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

getUsers.addEventListener("click", showUsers)
getUserById.addEventListener("click", function (inputValue) {
    inputValue = document.querySelector(".inputID").value;
   showUsersParam(inputValue);
})
postUser.addEventListener("click", function (e) {
    e = document.querySelector(".funny").value;
    enterPost(e);
})
updateUser.addEventListener("click", function (e) {
    e = document.querySelector(".userID").value;
    sendUpdates(e)
})
deleteUser.addEventListener("click", function (e) {
    e = document.querySelector(".notFunny").value;
    deleteFunction(e);
})