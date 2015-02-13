var when = require( "when" );
var lift = require( "when/node" ).lift;
var spawn = require( "child_process" ).spawn;
var npm = require( "npm" );

var api = module.exports = {
	finish: function( msg ) {
		if ( msg ) {
			console.log( msg );
		}
		process.exit( 1 );
	},

	fail: function( msg ) {
		if ( msg ) {
			console.log( msg );
		}
		process.exit( 1 );
	},

	parseArgs: function( command ) {
		var pieces = command.split( " " );
		var cmd = pieces.shift();

		return {
			cmd: cmd,
			args: pieces
		};
	},

	loadNpm: function( pkg ) {
		var p = lift( npm.load )( pkg );

		return p.then( function() {
			return npm;
		}, function( err ) {
				return api.finish( "Problem loading package.json" );
			} );
	}
};