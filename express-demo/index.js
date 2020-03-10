const Joi = require('@hapi/joi')
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' }
]

// read
app.get('/', (req, res) => {
    res.send('hello world!!')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('This course could not be found')
    res.send(course)

})

app.get('/api/courses/:id', (req, res) => {
    res.send(req.query)
})

// create
app.post('/api/courses', (req, res) => {
    // Joi validation logic
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required(),
    // })
    // const result = schema.validate(req.body)

    // validation logic without Joi
    // if (!req.body.name || !req.body.name.length < 3) {
    //     res.status(400).send('please submit a valid course name')
    //     return
    // } if (result.error) {
    //     res.status(400).send(result.error.details[0].message)
    //     return
    // } 

    // Validation logic with abstracted function
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    // post logic
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// update   --------   not finding id
app.put('/api/courses/:id', (res, req) => {
    // Look up course
    // If not found, return 404 status code
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('This course could not be found')

    // Validate
    // Return 404 if invalid
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required(),
    // })
    // const result = schema.validate(req.body)
    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Update course 
    course.name = req.body.name;
    // Return updated course
    res.send(course);
})



// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}...`))


app.delete('/api/courses/:id', (req, res) => {
    // Look up 
    // return 404 if does not exist
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('This course could not be found');

    // delete 
    const index = courses.indexOf(course)
    courses.splice(index, 1)

    // return the same course
    res.send(courses)
})

// refactor / abstraction of validation logic so it can be used in multiple spots
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    })
    return schema.validate(course)
}