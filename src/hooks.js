var utils = require( "./utils" );
var when = require( "when" );

module.exports = function( hook, pkg ) {
	return function() {
		if ( !pkg || !pkg.scripts || !pkg.scripts[ hook ] ) {
			return when.resolve();
		}

		return utils.run( pkg.scripts[ hook ] )
		 .progress( function( data ) {
			if ( data.stdout ) {
				console.log( data.stdout )
			}
			if ( data.stderr ) {
				console.log( data.stderr )
			}
		 } ).then( function( result ) {
			return hook + " hook success";
		 }, function( err ) {
			var e = new Error( hook + " hook failed" );
			return when.reject( e );
		 } );
	};
};
