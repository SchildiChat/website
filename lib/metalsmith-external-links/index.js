/*
 * Metalsmith plugin to make links to external websites open in new tabs.
 *
 * Thanks to https://github.com/segmentio/metalsmith-permalinks
 * and https://github.com/majodev/metalsmith-headings-identifier
 * for inspiration on how to implement a metalsmith plugin to achieve this.
 */

'use strict';

const debug = require('debug')('metalsmith-external-links');
const error = debug.extend('error');

const path = require('path');

// HTML parser
const cheerio = require('cheerio');

/**
 * Check whether a file is an HTML file.
 *
 * @param {String} str The path
 * @return {Boolean}
 */
const html = str => path.extname(str) === '.html';

/**
 * Metalsmith plugin to make links to external websites open in new tabs.
 *
 * @param  {Object} options
 *   @property {String} internal_url
 *
 * @return {Function}
 */
const plugin = options => {

    var opts = (typeof options === 'object') && options || {};

    if (!opts.internal_url) {
        opts.internal_url = [];
    } else if (!Array.isArray(opts.internal_url)) {
        opts.internal_url = [opts.internal_url];
    }

    return (files, metalsmith, done) => {
        setImmediate(done);

        Object.keys(files).forEach(file => {
            const data = files[file];

            if (!html(file)) return;
            //debug('checking file: %s', file);

            // load contents with cheerio to parse html nodes
            var $ = cheerio.load(data.contents.toString());

            $("a").each(function(index, element) {
                var href = $(element).attr("href");
                var target = $(element).attr("target");
                // Only touch links that have a href, and don't already define a target
                if (href && !target) {
                    var is_external = href.startsWith("http://") || href.startsWith("https://");
                    opts.internal_url.forEach(iu => {
                        if (href.startsWith(iu)) {
                            is_external = false;
                        }
                    })
                    debug("href:", is_external, href);
                    if (is_external) {
                        $(element).attr("target", "_blank");
                    }
                }
            });

            data.contents = Buffer.from($.html());
            files[file] = data;
        });
    };
};

// Expose `plugin`
module.exports = plugin;

