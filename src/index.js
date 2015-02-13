var utils = require( "./utils" );

var cwd = process.cwd();
var pkg;

try {
	pkg = require( cwd + "/package.json" );
} catch (e) {
	return utils.finish( "No package.json found" );
}

if ( !pkg || !pkg.scripts ) {
	return utils.finish( "No commands found." );
}


module.exports = {
	precommit: require( "./hook" )( "precommit", pkg, utils )
};