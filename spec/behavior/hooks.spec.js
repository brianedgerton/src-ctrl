var should = require( "should" );
var sinon = require( "sinon" );
var hookFactory;
var pkg;
var utils;
var targetDirectory = __dirname + "/../scripts";

describe( "Hook scripts", function() {
	var originalDirectory;
	before( function() {
		originalDirectory = process.cwd();
		process.chdir( targetDirectory );
		hookFactory = require( "../../src/hooks.js" );
		pkg = require( "../scripts/package.json" );
	} );

	after( function() {
		process.chdir( originalDirectory );
	} );

	describe( "when executing a script that succeeds", function() {
		var hook;
		var result;
		before( function( done ) {
			hook = hookFactory( "pre-commit", pkg );
			hook().then( function( res ) {
					result = res;
					done();
				} );
		} );

		it( "should resolve correctly", function() {
			result.should.equal( "pre-commit hook success" );
		} );
	} );

	describe( "when executing a script that fails", function() {
		var hook;
		var error;
		before( function( done ) {
			hook = hookFactory( "pre-push", pkg );
			hook().then( function( res ) {
					done();
				}, function( err ) {
					error = err;
					done();
				} );
		} );

		it( "should resolve correctly", function() {
			error.message.should.equal( "pre-push hook failed" );
		} );
	} );
} );
