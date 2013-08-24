
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

insert_query = "SELECT article_id AS id FROM unread_articles WHERE user_id = " ;
delete_query = "DELETE FROM unread_articles WHERE user_id = ? AND article_id = ?"

app.listen(4000);

app.get ( '/unread/:id' , function ( req , web_res ) {

	current_query = insert_query + req.params.id

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

app.get ( '/read/:userid/:feedid' , function ( req , web_res ) {

	mysql_set = [ req.params.userid , req.params.feedid ] ;

	mysql.getConnection ( function ( err , conn) {
		conn.query ( delete_query , mysql_set , function ( err , res ) {
			if ( err )
				console.log ( err ) ;
			else
			{
				object = { "success" => true }
				web_res.send ( object ) ;
			}
			conn.end();
		})
	})

}) ;

