var utils = require( "./utils" );

var cwd = process.cwd();
var pkg;

try {
	pkg = require( cwd + "/package.json" );
} catch ( e ) {
	utils.finish( "No package.json found" );
}

var hooks = [ "precommit", "prepush" ].reduce( function( memo, hook ) {
	memo[ hook ] = require( "./hooks" )( hook, pkg, utils );
	return memo;
}, {} );

module.exports = {
	hooks: hooks
};
