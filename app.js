
var express = require ( 'express' ) ;
var mysql_lib = require ( 'mysql') ;

var app = express () ;

var mysql = mysql_lib.createPool ({
	host: '37.139.8.146' ,
	user : 'root',
	passsword: 'Wireless123',
	database: 'stiriAPI',
	connectionLimit: 100
}) ;

query = "SELECT article_id AS id FROM unread_articles WHERE user_id = " ;

app.listen(4000);

app.get ( '/unread/:id' , function ( req , web_res ) {

	current_query = query + req.params.id

	mysql.getConnection ( function ( err , conn ) {
		conn.query ( current_query , function ( err , res ) {
			if ( err )
				console.log ( err ) ;
			else
				web_res.send(res) ;
			conn.end();
		})
	})
})

