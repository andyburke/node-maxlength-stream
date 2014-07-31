maxlength-stream
=========

maxlength-stream is a small, simple *node.js* stream, derived from Transform, which will limit the data passed through it.

# Installation

maxlengh-stream requires *node.js* >=v0.10 and *npm*.

```
npm install maxlength-stream
```

# Usage

```javascript
var Maxlength = require( '../index.js' );

// create a stream that has a max length of 5
var maxlength = new Maxlength( {
    maxLength: 5
} );

// as we get data, append it to our result string
var result = '';
maxlength.on( 'data', function( chunk ) {
    result += chunk;
} );

maxlength.on( 'error', function( error ) {
    if( error === 'exceeded maxlength' ) {
        console.error( 'Exceeded max length for stream!' );
    }
} );

maxlength.on( 'end', function() {
    console.log( result );
} );

maxlength.write( 'hello world' ); // this will error, it is of length > 5
maxlength.end();

```

# Why?

I wanted to be able to limit file upload sizes using piped requests.

# Contributing

Pull requests are welcome. Things to check before submitting:

- Do all the existing tests pass?
- Did you add any relevant tests and ensure they pass?
- Does it jshint cleanly using the .jshintrc settings?
- Has it been jsbeautify-ed using the .jsbeautifyrc settings?

# CHANGELOG

v0.0.1
------
- Initial release.
