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
 * Create array with parents and self in order so they can be marked active in navigation or be shown as breadcrumb
 *
 * @param {object} current
 * @return {array}
 */
const getActive = (current) => {
    var active = [];
    while (current) {
        active.unshift(current);
        current = current.ancestry ? current.ancestry.parent : undefined;
    }
    return active;
}

/**
 * Metalsmith plugin that defaults some values to other values.
 *
 * @param  {Object} options
 * @property {function} [createUriFromPath] Function to create uri from path. Default changes ".md" to ".html", removes "index.html" and adds a "/" at the beginning.
 */
const plugin = options => {
    const defaults = {
      createUriFromPath: path => path.replace(/\.md$/, ".html").replace(/(^|\/|\\)index.html$/, "$1").replace(/^\/?/, "/")
    };
    const settings = Object.assign({}, defaults, options);

    return (files, metalsmith, done) => {
        setImmediate(done);

        Object.keys(files).forEach(file => {
            const data = files[file];

            // navigation stuff
            data.uri = data.uri || settings.createUriFromPath(file);
            data.nav_name = data.nav_name || data.site_title || data.title;
            data.nav_active = getActive(data);

            if (data.title !== undefined) {
                if (data.site_title === undefined) {
                    data.site_title = getMainPage(data).title;
                    debug('setting site_title: %s %s', file, data.site_title);
                }
                if (data.lang === undefined) {
                    data.lang = getFirstDefinition(f => f.lang, "en", data);
                    debug('setting lang: %s %s', file, data.lang);
                }
            }
        });
    };
};

// Expose `plugin`
module.exports = plugin;
