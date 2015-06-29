var when = require( "when" );
var _ = require( "lodash" );
var drudgeon = require( "drudgeon" );

var api = {

	findRootDirectory: function() {
		return drudgeon( {
			step: "git rev-parse --show-toplevel"
		} ).run()
			.then( function( result ) {
				if ( !result || !result.step || !result.step[0] ) {
					return null;
				}
				var dir = result.step[0].trim();
				return dir;
			} );
	},

	run: function( command ) {
		var commands = _.map( command.split( "&&" ), function( c ) {
			return c.trim();
		} );

		var set = _.reduce( commands, function( memo, com ) {
			var args = _.map( com.split( " " ), function( piece ) {
				return piece.trim();
			} );

			var cmd = args.shift();

			var key = _.uniqueId( "step_" );
			memo[ key ] = {
				cwd: process.cwd(),
				cmd: cmd,
				args: args
			};

			return memo;
		}, {} );

		return drudgeon( set ).run();
	}
};

module.exports = api;
