
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

query = "SELECT articles.url , articles.text , articles.title , 1000 * UNIX_TIMESTAMP(created_at) as date FROM articles , unread_articles WHERE articles.id = unread_articles.article_id AND unread_articles.user_id = " ;

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

