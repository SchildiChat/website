/*
 * Metalsmith plugin that sets permalink = false for index.html files to avoid moving them to index/index.html
 */

'use strict';

const debug = require('debug')('metalsmith-autoexclude-permalinks');
const error = debug.extend('error');

const path = require('path');

/**
 * Metalsmith plugin that sets permalink = false for index.html files to avoid moving them to index/index.html
 *
 * @param  {Object} options
 *
 * @return {Function}
 */
const plugin = options => {

    return (files, metalsmith, done) => {
        setImmediate(done);

        Object.keys(files).forEach(file => {
            const data = files[file];

            if (path.basename(file) === "index.html" && data.permalink === undefined) {
                data.permalink = false;
                debug('setting file: %s %s', file, data.permalink);
            }
            files[file] = data;
        });
    };
};

// Expose `plugin`
module.exports = plugin;
