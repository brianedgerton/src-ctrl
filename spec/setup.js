var when = require( "when" );
var sinon = require( "sinon" );
require( "sinon-as-promised" )( when.Promise );

global.sinon = sinon;

var chai = require( "chai" );
var chaiAsPromised = require( "chai-as-promised" );
chai.use( require( "sinon-chai" ) );
chai.use( chaiAsPromised );
global.should = chai.should();
