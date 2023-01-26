// 3.1: Phonebook backend step1
// Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

//we need to install & require express 
//install via npm install express
const express = require('express')
//time to create a server
const app = express()
//activate json parser
app.use(express.json())

//morgan middleware
const morgan = require('morgan')

//gets time it took to log request
app.use(morgan('tiny', function(req,res) {
  console.log(req.hostname)
}))

morgan.token('param', function(req,res,param){
  console.log(req.params[param])
})
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
//3.3: Phonebook backend step3
// Implement the functionality for displaying the information for a single phonebook entry. 
//The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5
// If an entry for the given id is not found, the server has to respond with the appropriate status code.


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    }else {
        response.status(404).end()
    }
})

// 3.4: Phonebook backend step4
// Implement functionality that makes it possible to delete a single phonebook
//entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

// Test that your functionality works with either Postman or the Visual Studio Code REST client.
//wont' delete, but I get the 204 code.
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  person = persons.filter(person => person.id !== id)
   
    response.status(204).end()

})

//3.5: Phonebook backend step5
// Expand the backend so that new phonebook entries can be added by 
//making HTTP POST requests to the address http://localhost:3001/api/persons.

// Generate a new id for the phonebook entry with the 
//Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.

app.post('/api/persons', (request, response) => {
  // const maxId = persons.length > 0
  // ? Math.max(...persons.map(n => n.id))
  // : 0
  
  if(!body.name || !body.number || body.name === persons.name){
    return response.status(400).json({
      error: 'content missing or name is not unique'
    })
  }

  
  const person = {
    name: body.name,
    id: Math.floor(Math.random()),
    number: body.number,
  }

  persons = persons.concat(person)
  response.json(person)
})

//define the port
const PORT = 8000
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
//lets get nodemon going too
//npm install --save-dev nodemon in terminal
//don't forget to do     "dev": "nodemon index.js", in the scripts section of the package.json


