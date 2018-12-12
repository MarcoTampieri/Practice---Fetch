//XXXXXXXXXXXXXXXXXXXXXXXXXX GET ALL REQUEST XXXXXXXXXXXXXXXXXXXXXXXXXX

let getUsers = document.querySelector(".getUsers");

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

getUsers.addEventListener("click", showUsers)

//XXXXXXXXXXXXXXXXXXXXXXXXXX GET BY ID REQUEST XXXXXXXXXXXXXXXXXXXXXXXXXX

let getUserById = document.querySelector(".getUserById");

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
}

getUserById.addEventListener("click", function (inputValue) {
     inputValue = document.querySelector(".inputID").value;
    showUsersParam(inputValue);
})

//XXXXXXXXXXXXXXXXXXXXXXXXXX POST REQUEST XXXXXXXXXXXXXXXXXXXXXXXXXX

let postNew = document.querySelector(".postNew");

let postUser = (data) => {
    console.log(data)
}

let enterPost = () => {
    let url = "http://10.20.0.214:2525/watch";

    fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then(response => response.json())
        .then(parsedData => postUser(parsedData))
        .catch((error) => console.warn(error))
}

postNew.addEventListener("click", enterPost)