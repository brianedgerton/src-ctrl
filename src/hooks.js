var utils = require( "./utils" );
var when = require( "when" );

module.exports = function( hook, pkg ) {
	return function() {
		if ( !pkg || !pkg.scripts ) {
			return when.resolve();
		}

		var altHookName = hook.replace( "-", "" );
		var foundHook;

		if ( pkg.scripts[ hook ] ) {
			foundHook = hook;
		} else if ( pkg.scripts[ altHookName ] ) {
			foundHook = altHookName;
		}

		if ( !foundHook ) {
			return when.resolve();
		}

		return utils.npmRun( foundHook )
		 .progress( function( data ) {
			if ( data.stdout ) {
				process.stdout.write( data.stdout )
			}
			if ( data.stderr ) {
				process.stderr.write( data.stderr )
			}
		 } ).then( function( result ) {
			return hook + " hook success";
		 }, function( err ) {
			var e = new Error( hook + " hook failed" );
			return when.reject( e );
		 } );
	};
};
