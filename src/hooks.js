var utils;

module.exports = function( hook, pkg, _utils ) {

	utils = _utils;

	return function( _npmOptions ) {

		if ( !pkg || !pkg.scripts || !pkg.scripts[ hook ] ) {
			return utils.success();
		}

		var npmOptions = _npmOptions || {};

		utils.loadNpm( npmOptions )
			.then( function( npm ) {

				npm[ "run-script" ]( hook, function( err ) {

					if ( err ) {
						return utils.fail( err );
					}

					return utils.success();

				} );

			}, function( err ) {
					utils.finish();
				} );

	};

};
