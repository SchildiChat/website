/*
 * Metalsmith plugin to make links to external websites open in new tabs.
 *
 * Thanks to https://github.com/segmentio/metalsmith-permalinks
 * and https://github.com/majodev/metalsmith-headings-identifier
 * for inspiration on how to implement a metalsmith plugin to achieve this.
 */

'use strict';

const debug = require('debug')('metalsmith-external-links');

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
 *   @property {Array} matchPositive
 *   @property {Array} matchNegative
 *
 * @return {Function}
 */
const plugin = options => {
    const defaults = {
        matchPositive: ["^https?:\/\/.*", "^ftps?:\/\/.*"],
        matchNegative: []
    };
    const settings = Object.assign({}, defaults, options);

    return (files, metalsmith, done) => {
        setImmediate(done);

        Object.keys(files).forEach(file => {
            const data = files[file];

            if (!html(file)) return;
            debug('checking file: %s', file);

            // load contents with cheerio to parse html nodes
            var $ = cheerio.load(data.contents.toString());

            $("a").each(function(index, element) {
                var href = $(element).attr("href");
                var target = $(element).attr("target");
                // Only touch links that have a href, and don't already define a target
                if (href && !target) {
                    debug("href:", href);
                    var is_external = false;
                    settings.matchPositive.forEach(mp => {
                        if ((new RegExp(mp)).test(href)) {
                            debug(mp + " matched positive!");
                            is_external = true;
                        }
                    });
                    settings.matchNegative.forEach(mn => {
                        if ((new RegExp(mn)).test(href)) {
                            debug(mn + " matched negative!");
                            is_external = false;
                        }
                    });
                    debug("is_external:", is_external);
                    if (is_external) {
                        $(element).attr("target", "_blank");
                    }
                }
            });

            data.contents = Buffer.from($.html());
        });
    };
};

// Expose `plugin`
module.exports = plugin;

