//setup Express
var express = require('express');
var app = express();
//setup Mongo connection
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mean.psu.ac.th:27017/";
//db - fullstack
//collection - products
var options = { useUnifiedTopology: true, useNewUrlParser: true }

//set the view engine to ejs
app.set('view engine', 'ejs');
//handle
app.get('/', function (req, res) {
    res.render('pages/index', {page_title:"Home - QuizII" });
});

app.get('/products', function (req, res) {
    //Get data from MongoDB
    MongoClient.connect(url, options, function (err, db) {
        if (err) throw err;
        var dbo = db.db("fullstack");
        var query = {};
        dbo.collection("products")
          .find(query)
          .toArray(function (err, result) {
            if (err) throw err;
            //console.log(result);
            res.render('pages/products',{page_title:"Products - QuizII",products :result });
            db.close();
          }
        );
      });
});
app.get('/productdetail/:productId',function(req,res){
    var productid=req.params.productId;
    MongoClient.connect(url, options, function (err, db) {
        if (err) throw err;
        var dbo = db.db("fullstack");
        var query = {ProductID:productid};
        dbo.collection("products")
          .findOne(query,function (err, result) {
            if (err) throw err;
            //console.log(result);
            res.render('pages/productdetail',{page_title:"Detail - QuizII",detail :result });
            db.close();
          }
        );
      });
});

app.listen(8080);
console.log('8080 is the magic port.Express started at http://localhost:8080');