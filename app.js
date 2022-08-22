const express = require("express");
const path = require("path");
var mysql = require('mysql');
const jsonToTable = require('json-to-table');
const path2 = __dirname + '/views/';
const app = express();
const json2html = require('node-json2html');
const port = 8000;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var db = "project";
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) 
var connection = mysql.createPool(
    {
        host: "localhost",
        user: "root",
        password: "Yash@123",
        database: "seproject"
    }
);
// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('index.pug', params);
})
app.get('/new1', (req, res) => {
    const params = {}
    res.status(200).render('index1.pug', params);
})
app.get('/login', (req, res) => {
    res.sendFile(path2 + 'login.html')
})
app.post('/login', function (request, response) {
    var username = request.body.uname;
    var password = request.body.psw;
    if (username && password) {
        connection.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                // request.session.loggedin = true;
                // request.session.username = username;
                response.redirect('/new1');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        // response.end();
    }
});
app.get('/reg', (req, res) => {
    res.sendFile(path2 + 'reg.html')
})
app.post('/reg', function (request, response) {
    var name = request.body.uname;
    var password = request.body.psw;
    var age = request.body.age;
    var address = request.body.address;
    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "Insert into staff (name,age,qualification,address,gender) VALUES ('" + request.body.uname + "','" + request.body.age + "','" + request.body.qualification + "','" + request.body.address + "','" + request.body.gender + "')"
        // response.redirect('/');
        response.send("Staff added successfully")
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

        // response.end();
    });

});
app.get('/book', (req, res) => {
    res.sendFile(path2 + 'view.html')
})
app.post('/book', function (request, response) {
    var id = request.body.user_id;
    // var author = request.body.author;
    // var price = request.body.price;
    // var Destination = request.body.Destination;

    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        // var sql = `DELETE FROM userdata WHERE user_id=${id}`;
        var sql = `select * from userdata WHERE user_id=${id}`;
        // response.redirect('/');
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(request.body.uname)
            response.send(result)
            console.log("1 record inserted");
            // response.end();

        });

        // response.end();
    });

});
app.get('/addbook', (req, res) => {
    res.sendFile(path2 + 'addbook.html')
})
app.post('/addbook', function (request, response) {
    var bookname = request.body.bookname;
    var author = request.body.author;
    var price = request.body.price;
    // var Destination = request.body.Destination;

    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "Insert into addbook (bookname,author,price) VALUES ('" + request.body.bookname + "','" + request.body.author + "','" + request.body.price + "')"

        connection.query(sql, function (err, result) {
            if (err) throw err;
            response.send("Book  added successfully")
            console.log("1 record inserted");
            // response.end();
        });
        // response.end();
    });

});
app.get('/track', (req, res) => {
    res.sendFile(path2 + 'table.html')
})
app.post('/track', function (request, response) {
    var id = request.body.user_id;
    // var author = request.body.author;
    // var price = request.body.price;
    // var Destination = request.body.Destination;

    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `DELETE FROM userdata WHERE user_id=${id}`;
        // var sql = `select * from userdata WHERE user_id=${id}`;
        // response.redirect('/');
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(request.body.uname)
            response.send(result)
            console.log("1 record inserted");
        });

        // response.end();
    });

});
app.get('/pay', (req, res) => {
    res.sendFile(path2 + 'update.html')
})
app.post('/pay', function (request, response) {
    var book_id = request.body.book_id;
    var bookname = request.body.bookname;
    var author = request.body.author;
    var price = request.body.price;
    connection.getConnection((err) => {
        if (err) throw err;
        var sql = "update addbook set bookname='" + request.body.bookname + "',author='" + request.body.author + "',price='" + request.body.price + "' where book_id='" + request.body.book_id + "'"
        connection.query(sql, (err, ans) => {
            if (err) throw err;
            console.log("1 RECORDE UPDATED")

        });
        response.send("UPDATED SUCESSFULLY")
    });
});
app.get('/sb', (req, res) => {
    res.sendFile(path2 + 'viewbook.html')
})
app.post('/sb', function (request, response) {
    var id = request.body.book_id;
    // var author = request.body.author;
    // var price = request.body.price;
    // var Destination = request.body.Destination;

    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        // var sql = `DELETE FROM userdata WHERE user_id=${id}`;
        var sql = `select * from addbook WHERE book_id=${id}`;
        // response.redirect('/');
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(request.body.uname)
            let template = { '<>': 'div', 'html': '${book_id} ${bookname} ${author} ${price}' };
            let html = json2html.render(result, template);
            response.send(html)

            console.log(html);
            // response.end();
        });

        // response.end();
    });

});
app.get('/disp', (request, response) => {

    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        // var sql = `DELETE FROM userdata WHERE user_id=${id}`;
        var sql = `select * from userdata`;
        // response.redirect('/');
        connection.query(sql, function (err, result) {
            if (err) throw err;
            let template = { '<>': 'div', 'html': '${user_id} ${username} ${Address} ${Age} ${password}' };
            let html = json2html.render(result, template);
            response.send(result)

            console.log(html);
            // response.end();
        });

        // response.end();
    });

});
app.get('/db', (req, res) => {
    res.sendFile(path2 + 'deletebook.html')
})
app.post('/db', function (request, response) {
    var id = request.body.book_id;
    // var author = request.body.author;
    // var price = request.body.price;
    // var Destination = request.body.Destination;

    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `DELETE FROM addbook WHERE book_id=${id}`;
        // var sql = `select * from userdata WHERE user_id=${id}`;
        // response.redirect('/');
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(request.body.book_id)
            response.send("Book Deleted")
            console.log("1 record inserted");
            // connection.end();
        });

        // response.end();
    });

});
app.get('/ds', (req, res) => {
    res.sendFile(path2 + 'ds.html')
})
app.post('/ds', function (request, response) {
    var id = request.body.staff_id;
    // var author = request.body.author;
    // var price = request.body.price;
    // var Destination = request.body.Destination
    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `DELETE FROM staff WHERE staff_id=${id}`;
        // var sql = `select * from userdata WHERE user_id=${id}`;
        // response.redirect('/');
        connection.query(sql, function (err, result) {
            if (err) throw err;
            // console.log(request.body.book_id)
            response.send("Deleted Staff Succesfully")
            console.log("1 record inserted");

        });

        // response.end();
    });

});
app.get('/dispstaff', (request, response) => {

    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        // var sql = `DELETE FROM userdata WHERE user_id=${id}`;
        var sql = `select * from staff`;
        // response.redirect('/');
        connection.query(sql, function (err, result) {
            if (err) throw err;
            let template = { '<>': 'div', 'html': '${user_id} ${username} ${Address} ${Age} ${password}' };
            let html = json2html.render(result, template);
            response.send(result)

            console.log(html);
            // response.end();
        });

        // response.end();
    });

});
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});