const express = require('express');
const app = express();
const morgan = require('morgan');

morgan.token('post-data', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ' ';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));

const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})


app.get('/info', (request, response) => {
    const date = new Date()
    const info = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    response.send(info)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const personIndex = persons.findIndex(p => p.id === id)
    if (personIndex !== -1) {
        persons.splice(personIndex, 1)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', express.json(), (request, response) => {
    const newPerson = request.body
    if (!newPerson.name || !newPerson.number) {
        return response.status(400).json({ error: 'name or number missing' })
    }
    if (persons.some(p => p.name === newPerson.name)) {
        return response.status(400).json({ error: 'name must be unique' })
    }
    newPerson.id = (Math.random() * 1000).toString()
    persons.push(newPerson)
    response.status(201).json(newPerson)
}) 

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})