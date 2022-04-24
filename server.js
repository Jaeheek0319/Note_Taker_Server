const express = require("express");
// const bodyParser = require('body-parser');
// const cors = require('cors');
const path = require('path');
const fs = require('fs')
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const connection = require('./connection');

const app = express();

app.use(cors())

//body parsers
app.use(express.json()); //configure request to accept json
app.use(express.urlencoded({extended:true})) // configure request to accept arrays and string

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'), (err) => {
        if (err) throw err;

        console.log("successs");
    })
});

app.get("/notes", (req,res) => {
    // read notes.json
    // fs.readFile(path.join(__dirname,'note.json'), 'utf8',(err,data) =>{
    //     if (err) throw err;

    //     //respond notes
    //     res.json(JSON.parse(data));
    // });

    connection.query("SELECT * FROM Note_Takes", (err, result, field) => {
        if (err) throw err;

        console.log("result: ",result);

        res.json(result);
    });

});

app.post("/notes", (req,res) => {

    //gte the new note req.body
    const {title, text} = req.body;
    console.log("req.body",req.body);
    // newNote.id = uuidv4();
    
    // //read notes js
    // fs.readFile(path.join(__dirname,'note.json'), 'utf8',(err,data) =>{
    //     if (err) throw err;

    //     console.log(data);

    //     const UpdateNote = JSON.parse(data)

    //     UpdateNote.push(newNote);

    //     fs.writeFile(path.join(__dirname,'note.json'), JSON.stringify(UpdateNote), 'utf8', () => {
    //         res.json(newNote);
    //     }) 
    // });
    //add to the notes array

    //write it back
    
    connection.query(`INSERT INTO Note_Takes (title,text) VALUES (?,?)`, [title, text],(err, result, field) => {
        if (err) throw err;

        console.log("result: ",result);

        res.json(result);
    });
});

// app.delete("/notes", (req,res) => {
// //Read note js
//     fs.readFile(path.join(__dirname,'note.json'), 'utf8',(err,data) =>{
//         if (err) throw err;

//         console.log(data);

//         const NoNote = null

//         fs.writeFile(path.join(__dirname,'note.json'), JSON.stringify(UpdateNote), 'utf8', () => {
//             res.json(newNote);
//         }) 
//     });
// //delete note


// });

app.delete("/notes/:id", (req,res) => {
    // //get old note
    const id = req.params.id
    console.log(req.body)
    // const id = req.params.id

    // //Read note js
    //     fs.readFile(path.join(__dirname,'note.json'), 'utf8',(err,data) =>{
    //         if (err) throw err;
    
    //         console.log(data);
    
    //         const UpdateNote = JSON.parse(data);
    
    //         const filteredNotes = UpdateNote.filter((note) => note.id !== id);
    
    //         fs.writeFile(path.join(__dirname,'note.json'), JSON.stringify(filteredNotes), 'utf8', () => {
    //             res.json(filteredNotes);
    //         }) 
    //     });
    connection.query(`DELETE FROM Note_Takes WHERE id= ?`,[id],(err, result, field) => {
        if (err) throw err;

        console.log("result: ",result);

        res.json(result);
    });  
});

app.put("/notes/:id", (req,res) => {
    // const newNote = req.body
    const {title, text} = req.body;
    const id = req.params.id
    

    //     const UpdateNote = JSON.parse(data);
        
    //     const targetNote = UpdateNote.filter((note) => note.id === id)[0];
        
    //     console.log("targetNote before",targetNote);
        
    //     targetNote.text = newNote.text;
    //     targetNote.title = newNote.title;

    //     console.log("targetNote after",targetNote);

    //     fs.writeFile(path.join(__dirname,'note.json'), JSON.stringify(UpdateNote), 'utf8', () => {
    //         res.json(UpdateNote);
    //     })
    // })
    connection.query(`UPDATE Note_Takes SET title = ?, text = ? WHERE id = ?;`,[title,text,id],(err, result, field) => {
        if (err) throw err;

        console.log("result: ",result);

        res.json(result);
    });  
});

app.listen(PORT, () => {
     console.log(`Server Listening on ${PORT} ...`);
});



// const notes = {
//     1: {
//       id: 1,
//       title: 'Test Note',
//       body: 'Test Note Object',
//       created_at: Date.now(),
//       }
//     };
    
// app.post('/notes', notes.create);
// app.get('/notes', notes.findAll);
// app.delete('/notes/:noteID', notes.delete);

// const createNextId = Number.parseInt(Math.max(...Object.keys(notes).map((key) => Number.parseInt(key))), 10) + 1;

// const AddNote = ({
//     title,
//     body,
// }) 

// notes[id] = {
//     id,
//     title,
//     body,
//     created_at: Date.now(),
// };
// return notes[id]
