#!/usr/bin/env node

/*
	1. Find .git directory
	2. Remove existing hooks
	3. Restore old hooks if they exist
*/

var fs = require( "fs-extra" );
var path = require( "path" );
var utils = require( "./utils.js" );
var srcCtrlHooks = path.resolve( __dirname, "hooks" );

function removeHook( name, hookFolder ) {
	var filename = path.resolve( hookFolder, name );

	if ( fs.existsSync( filename ) ) {
		fs.removeSync( filename );
	}

	var restoreFile = filename + ".src-ctrl.backup";

	if ( fs.existsSync( restoreFile ) ) {
		fs.renameSync( restoreFile, filename );
	}
}

utils.findRootDirectory()
	.then( function( dir ) {
		if ( !dir ) {
			console.error( "Failed to find root git directory." );
			console.error( "src-ctrl uninstall failed" );
		}

		var hookFolder = path.resolve( dir, ".git/hooks" );

		try {
			removeHook( "pre-commit", hookFolder );
			removeHook( "pre-push", hookFolder );
		} catch ( e ) {
			console.log( "Failed to install hooks." );
			console.log( e.toString() );
		}

		process.exit();
	}, function( err ) {
		console.error( "Failed to find root git directory." );
		console.error( "src-ctrl uninstall failed" );
		console.log( err );
		process.exit();
	} );
