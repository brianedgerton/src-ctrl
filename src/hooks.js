var _ = require( "lodash" );
var sequence = require( "when/sequence" );
var utils;

module.exports = function( hook, pkg, _utils ) {

	utils = _utils;

	return function() {

		if ( !pkg !pkg.scripts || !pkg.scripts[ hook ] ) {
			return utils.success();
		}

		utils.loadNpm( pkg )
			.then( function( npm ) {

				npm[ "run-script" ]( hook, function( err ) {

					if ( err ) {
						return utils.fail( err );
					}

					return utils.success();

				} );

			} );

	};

};
