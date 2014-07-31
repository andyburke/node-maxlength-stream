/* jshint -W097, node: true */
'use strict';

var stream = require( 'stream' );
var util = require( 'util' );

var Transform = stream.Transform;

module.exports = Maxlength;

function Maxlength( options ) {
    if ( !( this instanceof Maxlength ) ) {
        return new Maxlength( options );
    }

    Transform.call( this, options );
    this._curLength = 0;
    this._maxLength = options.maxLength;
}

util.inherits( Maxlength, Transform );

Maxlength.prototype._transform = function( chunk, enc, callback ) {
    this._curLength += chunk.length;
    if ( this._curLength > this._maxLength ) {
        this.emit( 'error', 'exceeded maxlength' );
        return;
    }
    this.push( chunk, enc );
    callback();
};
