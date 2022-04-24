const addNote = document.querySelector("#addnote");
const remove = document.querySelector(".delete");
const update = document.querySelector(".updates");
const notes = document.querySelector(".notes");
const textArea = document.querySelector(".texts");
const title = document.querySelector('.titles');

const getNotes = () => {
    fetch('http://localhost:3001/notes')
        .then((res) => res.json())
        .then((data) => {
            console.log("data:", data);
            let notetemplate = ""
            for (let index = 0; index < data.length; index++) {
                notetemplate += `
                    <div class="fullNote">
                    <div class="title"> <p> ${data[index].title} </p></div>
                    <div class="text"> <p> ${data[index].text} </p></div>
                        <!-- id = ${data[index].id} -->
                    <button  class="update" data=${data[index].id}> Update </button>
                    <button class="delete" data=${data[index].id}> Delete </button>
                    </div>
                `
            }
            notes.innerHTML = notetemplate
        });
};

getNotes();

addNote.addEventListener("click", (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var text = textArea.value;
    console.log(title);
    var titleText = title.value;
    var raw = JSON.stringify({
        text: text,
        title: titleText
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3001/notes", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            getNotes();
        })
        .catch(error => console.log('error', error));
});

notes.addEventListener("click", (event) => {
    if (event.target.className.includes("delete")) {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        const id = event.target.getAttribute("data")

        fetch(`http://localhost:3001/notes/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                getNotes();
            }).catch(error => console.log('error', error));
    }
});

notes.addEventListener("click", (event) => {
    if (event.target.className.includes("update")) {

        var text = textArea.value;
        var titleText = title.value;
        var raw = JSON.stringify({
            text: text,
            title: titleText
        });

        console.log('********', raw);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const id = event.target.getAttribute("data")

        console.log("*********", id);


        fetch(`http://localhost:3001/notes/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                getNotes();
            }).catch(error => console.log('error', error));
    }


});

// update.addEventListener("click", (event) => {
//     fetch('https://localhost:3001/notes')
//         .then((res) => res.json())
//         .then((data) => {
//             console.log("data:", data);
//             console.log("ids:", data.id)


//         });

// });