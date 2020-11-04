/*
 * Metalsmith plugin that defaults some values to other values.
 */

'use strict';

const debug = require('debug')('metalsmith-auto-defaults');
const error = debug.extend('error');

const path = require('path');

const getMainPage = file => {
    if (file.main_page) {
        return file;
    } else {
        const p = file.ancestry.parent;
        if (p === file || p === null) {
            return file;
        } else {
            return getMainPage(p);
        }
    }
}

const getFirstDefinition = (func, defaultVal, file) => {
    var val = func(file);
    if (val !== undefined) {
        return val;
    } else {
        const p = file.ancestry.parent;
        if (p === file || p === null) {
            return defaultVal;
        } else {
            return getFirstDefinition(func, defaultVal, p);
        }
    }
}

/**
 * Metalsmith plugin that defaults some values to other values.
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

            if (data.title !== undefined) {
                if (data.site_title === undefined) {
                    data.site_title = getMainPage(data).title;
                    debug('setting site_title: %s %s', file, data.site_title);
                }
                if (data.lang === undefined) {
                    data.lang = getFirstDefinition(f => f.lang, "en", data);
                    debug('setting lang: %s %s', file, data.lang);
                }
                files[file] = data;
            }
        });
    };
};

// Expose `plugin`
module.exports = plugin;
