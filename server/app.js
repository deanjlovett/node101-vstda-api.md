const express = require('express');
const morgan = require('morgan');

const app = express();

// add your code here
app.use(express.json());

var todoList = 
[ // mock data
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

app.get('/', (req, res) => {
    // console.log('===============================');
    // console.log('Status message from server');
    // console.log('===============================');

    res.status(200).send({status:'ok'});
});

app.get('/api/TodoItems', (req, res) => {
    // console.log('===============================');
    // console.log('Read All Todo Items from List');
    // console.log('===============================');
    
    res.status(200).send(todoList);
});

app.get('/api/TodoItems/:id', (req, res) => {
    // console.log('===============================');
    // console.log('Read Single Todo Item from List');
    // console.log('===============================');

    let key = req.params.id;

    ///////////////////////
    // old thinking: forEach with if statement
    //
    // todoList.forEach( v => {
    //     if( v.todoItemId == key ) {
    //         res.status(200).send(v);
    //     }
    // });

    ///////////////////////
    // better thinking: array filter
    //
    // let item = todoList.filter( v => v.todoItemId == key )[0];

    ///////////////////////
    //  new thinking: array find
    //

    let item = todoList.find( v => v.todoItemId == key );
    if (item )
        res.status(200).send(item);

    //////////////////////
    //  todo:   do something intellegent if we don't find it
    //          other than trip off the end of the method
    //
    //          perhaps flower or a condolence note for the missing item
    //

});

app.post('/api/TodoItems/', (req, res) => {
    // console.log('=================================');
    // console.log('Create a Single Todo Item');
    // console.log('=================================');

    ///////////////////////
    // old thinking, one properties at a time
    //
    // var newbee = {
    //     todoItemId: req.body.todoItemId,
    //     name: req.body.name,
    //     priority: req.body.priority,
    //     completed: req.body.completed
    // };

    ///////////////////////
    // new thinking, set all properties at once

    var newbee = req.body;


    ///////////////////////
    // old thinking: forEach with if statement
    //
    // var newbee = req.body;
    // var found=false;
    // todoList.forEach( (v,i)=>{
    //     if( v.todoItemId == newbee.todoItemId ) {
    //         todoList[i] = newbee;
    //         found=true;
    //     }
    // });
    // if( !found ) {
    //     todoList.push(newbee);
    // }

    ///////////////////////
    // new thinking: array findIndex
    //

    let index = todoList.findIndex( v => v.todoItemId == newbee.todoItemId );
    if( index != -1 ) {
        todoList[index] = newbee;
    }else{
        todoList.push(newbee);
    }

    res.status(201).send(newbee);
});

app.delete('/api/TodoItems/:number', (req, res) => {
    // console.log('=================================');
    // console.log('Delete Single Todo Item from List');
    // console.log('=================================');

    var key = req.params.number;

    ///////////////////////
    // old thinking: array forEach with if statement
    //
    // let deleteMe = {};
    // for (let i = 0; i < todoList.length; i++){
    //     if( todoList[i].todoItemId == key){
    //         deleteMe = todoList.splice(i,1)[0];
    //         break;
    //     }
    // };

    ///////////////////////
    // new thinking: array findIndex
    //

    let deleteMe = {};
    let index = todoList.findIndex( v => v.todoItemId == key );
    if( index != -1 )
        deleteMe = todoList.splice(index,1)[0];

    res.status(200).send(deleteMe);
});

module.exports = app;
