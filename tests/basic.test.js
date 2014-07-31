/* jshint node: true */
'use strict';

var Maxlength = require( '../index.js' );

module.exports = {
    'test instantiation': function( beforeExit, assert ) {
        var maxlength = new Maxlength( {
            maxLength: 1024
        } );
        assert.type( maxlength, 'object' );
        assert.ok( maxlength instanceof Maxlength );
        assert.eql( maxlength._maxLength, 1024 );
    },
    
    'test streaming': function( beforeExit, assert ) {
        var maxlength = new Maxlength( {
            maxLength: 1024
        } );

        var result = '';
        
        maxlength.on( 'data', function( chunk ) {
            result += chunk;
        } );
        
        maxlength.on( 'end', function() {
            assert.eql( result, 'hello world' );
        } );
        
        maxlength.write( 'hello world' );
        maxlength.end();
    },
    
    'test hitting max length': function( beforeExit, assert ) {
        var maxlength = new Maxlength( {
            maxLength: 8
        } );

        var result = '';
        
        maxlength.on( 'data', function( chunk ) {
            result += chunk;
        } );
        
        maxlength.on( 'error', function( error ) {
            assert.eql( error, 'exceeded maxlength' );
        } );
        
        maxlength.write( 'hello world' );
        maxlength.end();
    }
};