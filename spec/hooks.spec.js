var should = require( "should" );
var sinon = require( "sinon" );
var hookFactory;
var pkg;
var utils;
var targetDirectory = __dirname + "/scripts";

describe( "hook scripts", function() {
	var originalDirectory;
	before( function() {
		originalDirectory = process.cwd();
		process.chdir( targetDirectory );
		hookFactory = require( "../src/hooks.js" );
		pkg = require( "./scripts/package.json" );
		utils = require( "../src/utils.js" );
	} );

	after( function() {
		process.chdir( originalDirectory );
	} );

	describe( "when executing a script that fails", function() {
		var hook;
		var fail;
		before( function() {
			fail = sinon.stub( utils, "fail" );
			hook = hookFactory( "precommit", pkg, utils );
			hook( { localPrefix: targetDirectory } );
		} );

		after( function() {
			fail.restore();
		} );

		it( "should call fail with error", function() {
			fail.called.should.be.ok;
		} );

	} );

} );
