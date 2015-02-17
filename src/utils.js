var lift = require( "when/node" ).lift;
var npm = require( "npm" );

var api = module.exports = {
	finish: function( msg ) {
		if ( msg ) {
			console.log( msg );
		}
		process.exit( 0 );
	},

	fail: function( msg ) {
		if ( msg ) {
			console.log( msg );
		}
		process.exit( 1 );
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