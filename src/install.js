#!/usr/bin/env node

/*
	1. Find .git directory
	2. Check if hook scripts already exist
	3. Rename existing hooks
	4. Copy src-ctrl hooks
*/

var fs = require( "fs-extra" );
var path = require( "path" );
var utils = require( "./utils.js" );
var srcCtrlHooks = path.resolve( __dirname, "hooks" );

function createHook( name, hookFolder ) {
	var filename = path.resolve( hookFolder, name );

	if ( fs.existsSync( filename ) ) {
		fs.renameSync( filename, filename + ".src-ctrl.backup" );
	}

	var newHook = path.resolve( srcCtrlHooks, name );

	fs.copySync( newHook, filename );
}

utils.findRootDirectory()
	.then( function( dir ) {
		if ( !dir ) {
			console.error( "Failed to find root git directory." );
			console.error( "src-ctrl install failed" );
		}

		var hookFolder = path.resolve( dir, ".git/hooks" );

		try {
			createHook( "pre-commit", hookFolder );
			createHook( "pre-push", hookFolder );
		} catch ( e ) {
			console.log( "Failed to install hooks." );
			console.log( e.toString() );
		}

		process.exit();
	}, function( err ) {
		console.error( "Failed to find root git directory." );
		console.error( "src-ctrl install failed" );
		console.log( err );
		process.exit();
	} );
