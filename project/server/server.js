const express = require('express');
const fs = require('fs');
const cart = require('./cartRouter');
const stats = require('./stats');
const app = express();


app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/cart', cart);


app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    })
});

app.get('/api/stats', (req, res) => {
    fs.readFile('server/db/stats.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    })
});


app.post ('/api/stats', (req, res) => {
    fs.readFile('server/db/stats.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let newStats = stats.add(JSON.parse(data), req);
            fs.writeFile('server/db/stats.json', newStats, (err) => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {
                    res.send(JSON.stringify({result: 1, text: 'SUCCESS!'}));
                }
            })
        }
    })
});

// app.get()
// app.post()
// app.put()
// app.delete()

// app.get('/', (req, res) => {
//    res.send('Hello World!');
// });
// app.get('/api/users/:id', (req, res) => {
//     // res.send(req.params.id);
//     res.send(req.query);
// });



app.listen(3000, () => console.log('Listen on port 3000...'))