// 3.1: Phonebook backend step1
// Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

//we need to install & require express 
//install via npm install express
const express = require('express')
//time to create a server
const app = express()

//Data to use
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//prep date and time stuff
let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

//lets use get statements now for routing people
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
// we need a get function pointing at the /api/persons page too

app.get('/api/persons', (request, response) => {
   response.json(persons)
})

// 3.2: Phonebook backend step2
// Implement a page at the address http://localhost:3001/info that looks roughly like this:

app.get('/api/info', (request, response) => {
    response.write(`Phonebook has info for ${Object.keys(persons).length} people`)
    response.write('<br>')
    response.write(month + "-" + date + "-" + year)
    response.write('<br>')
    response.write(String(ts))
    response.end()
    
    
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    }else {
        response.status(404).end()
    }
})



//define the port
const PORT = 8000
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
//lets get nodemon going too
//npm install --save-dev nodemon in terminal
//don't forget to do     "dev": "nodemon index.js", in the scripts section of the package.json


