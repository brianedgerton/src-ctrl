require( "../setup.js" );

var _ = require( "lodash" );
var path = require( "path" );
var proxyquire = require( "proxyquire" ).noPreserveCache();
var utils;
var drudgeon;

describe( "Utility functions", function() {
	before( function() {
		drudgeon = sinon.stub().returns( {
			run: sinon.stub().resolves( true )
		} );

		utils = proxyquire( "../../src/utils.js", {
			drudgeon: drudgeon
		} );
	} );

	describe( "when running commands", function() {
		describe( "when there are multiple commands", function() {
			var command;
			before( function( done ) {
				drudgeon.reset();
				command = "gulp test && gulp lint";

				utils.run( command )
					.then( function() {
						done();
					} );
			} );

			it( "should create the drudgeon set properly", function() {
				var set = _.values( drudgeon.lastCall.args[0] );

				var expected = [
					{
						cwd: process.cwd(),
						cmd: "gulp",
						args: [ "test" ]
					},
					{
						cwd: process.cwd(),
						cmd: "gulp",
						args: [ "lint" ]
					}
				];

				set.should.eql( expected );
			} );
		} );

		describe( "when there is a single command", function() {
			var command;
			before( function( done ) {
				drudgeon.reset();
				command = "gulp test";

				utils.run( command )
					.then( function() {
						done();
					} );
			} );

			it( "should create the drudgeon set properly", function() {
				var set = _.values( drudgeon.lastCall.args[0] );

				var expected = [
					{
						cwd: process.cwd(),
						cmd: "gulp",
						args: [ "test" ]
					}
				];

				set.should.eql( expected );
			} );
		} );
	} );

	describe( "when finding the root git directory", function() {
		var result;
		before( function( done ) {
			var utilsLive = require( "../../src/utils.js" );
			utilsLive.findRootDirectory()
				.then( function( res ) {
					result = res;
					done();
				} );
		} );

		it( "should resolve to the correct folder", function() {
			result.should.equal( path.resolve( __dirname, "../../" ) );
		} );
	} );
} );
