var chai = require( "chai" );
var chaiAsPromised = require( "chai-as-promised" );
chai.use( chaiAsPromised );
chai.use( require( "sinon-chai" ) );

global.sinon = require( "sinon" );
global.should = chai.should;
require( "sinon-as-promised" );

