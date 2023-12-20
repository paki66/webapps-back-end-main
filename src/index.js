import express from 'express'
import connnect from './db.js'
import cors from 'cors';
import data from './store.js';


const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

//endpointi za task
app.get('/taskovi', (req, res) => res.json(data.task));

app.post('/taskovi', (req, res) => {
    res.statusCode = 201;
    res.setHeader('Location', '/taskovi/1234');
    res.send();
});

app.get('/taskovi/id/:id', (req, res) => {
    let taskId = req.params.id;
    taskId = parseInt(taskId);
    taskId -= 1;
    taskId = String(taskId);
    const task = data.task[taskId];

    if (task) {
        res.json(task);
      } else {
        res.status(404).send('task not found');
      }
});



app.delete('/taskovi/:id', (req, res) => {
  let taskId = req.params.id;
  taskId = parseInt(taskId);
  taskId -= 1;
  taskId = String(taskId);

    if (data.task[taskId]) {
      //delete data.task[taskId]; 
      res.status(204).send();
    } else {
      res.status(404).send('task not found');
    }
})

app.listen(port, () => console.log(`Slušam na portu ${port}`)) 