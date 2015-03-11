var when = require( "when" );
var npm = require( "npm" );
var _ = require( "lodash" );

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

	loadNpm: function( _options ) {
		var options = _.merge( { dev: true }, ( _options || {} ) );

		return when.promise( function( resolve, reject ) {
			npm.load( options, function( err, instance ) {
				if ( err ) {
					return reject( new Error( "Problem loading NPM" ) );
				}

				resolve( instance );
			} );
		} );

	}
};
