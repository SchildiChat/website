/*
 * Metalsmith plugin that defaults some values to other values.
 */

'use strict';

const debug = require('debug')('metalsmith-auto-defaults');

const getMainPage = file => {
    if (!file.is_subpage) {
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
 * Get favicons html
 * 
 * @param {object} metadata 
 * @return {array}
 * 
 * see:
 * https://stackoverflow.com/questions/20498409/adding-text-to-beginning-of-each-array-element
 * https://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string
 * https://stackoverflow.com/questions/10152650/javascript-match-string-against-the-array-of-regular-expressions
 */
const getFaviconsHtml = (metadata) => {
    if (!(metadata.favicons && metadata.favicons.html)) return;

    var faviconsMetaRemove = [
        'apple-mobile-web-app',
        'mobile-web-app',
        'application-name',
        'manifest',
        'theme-color'
    ].map(i => new RegExp('<(meta name|link rel)="' + i + '.*'))

    return metadata.favicons.html.filter(e => !faviconsMetaRemove.some(rx => rx.test(e)));
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

        const favicons = getFaviconsHtml(metalsmith.metadata());

        Object.keys(files).forEach(file => {
            const data = files[file];

            // navigation stuff
            data.uri = data.uri || settings.createUriFromPath(file);
            data.nav_name = data.nav_name || data.page_title || data.title;
            data.nav_active = getActive(data);

            data.favicons = favicons;

            if (data.title !== undefined) {
                if (data.page_title === undefined) {
                    data.page_title = getMainPage(data).title;
                    debug('setting page_title: %s %s', file, data.page_title);
                }
                if (data.lang === undefined) {
                    data.lang = getFirstDefinition(f => f.lang, "en", data);
                    debug('setting lang: %s %s', file, data.lang);
                }
                if (data.error_number) {
                    data.title += ' ' + data.error_number;
                }
                if (data.error_description) {
                    data.title += ': ' + data.error_description;
                }
            }
        });
    };
};

// Expose `plugin`
module.exports = plugin;
