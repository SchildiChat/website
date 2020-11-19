/*
 * Metalsmith plugin that runs php
 */

'use strict';

const debug = require('debug')('metalsmith-php');

const path = require('path');
const { spawn } = require("child_process");

const is_php = str => str.endsWith(".php");

/**
 * Metalsmith plugin that runs php
 *
 * @param  {Object} options
 *
 * @return {Function}
 */
const plugin = opts => {

    return (files, metalsmith, done) => {
        setImmediate(done);

        Object.keys(files).forEach(file => {
            const data = files[file];

            if (!is_php(file)) return;

            var new_contents = Buffer.from("");
            var php = spawn("php");
            php.stdin.setEncoding('utf-8');
            php.stdout.on('data', function(data) {
                new_contents += data;
            });
            php.stdout.on('end', () => {
                // Write content
                data.contents = new_contents;
                // Rename file
                var dest = path.join(path.dirname(file), path.basename(file).replace(/\.php/, '.html'));
                files[dest] = data;
                delete files[file];
            })
            php.stdin.write(data.contents.toString());
            php.stdin.end();

        });
    };
};

// Expose `plugin`
module.exports = plugin;
