// metalsmith plugins
const Metalsmith = require('metalsmith');
const when = require('metalsmith-if');
const remove = require('@metalsmith/remove');
const defaultValues = require('@metalsmith/default-values');
const favicons = require('metalsmith-favicons');
const discoverHelpers = require('metalsmith-discover-helpers');
const nested = require('metalsmith-nested');
const discoverPartials = require('metalsmith-discover-partials');
const sass = require('@metalsmith/sass')
const postcss = require('@metalsmith/postcss');
const jsBundle = require('@metalsmith/js-bundle')
const contenthash = require('metalsmith-contenthash');
const ancestry = require("metalsmith-ancestry");
const autoDefaults = require("./lib/metalsmith-auto-defaults");
const inPlace = require('@metalsmith/in-place');
const layouts = require('@metalsmith/layouts');
const inlineSVG = require('metalsmith-inline-svg');
const externalLinks = require("./lib/metalsmith-external-links");
const prefixoid = require('metalsmith-prefixoid');
const htmlMinifier = require("metalsmith-html-minifier");

// prefix all absolute paths
var urlPrefix = ""
if (process.env.DEBUG_URL) {
    urlPrefix = process.env.DEBUG_URL;
}
urlPrefix = urlPrefix.replace(/\/?$/, ""); // enforce no ending slash

const isProduction = process.env.NODE_ENV === 'production';

var svgFavicon = 'img/SchildiChat_nopadding.svg';

var site_default_params = {
    title: "SchildiChat",
    layout: 'default.hbs',
    stylesheet: 'base.css',
    nav_show: true,
    is_subpage: true,
    show_link_to_parent: true,
    order_id: 50,
    show_related_links: true,
    show_subpages_in_related_links: true,
    show_in_related_links: true
}

// Run Metalsmith in the current directory.
// When the .build() method runs, this reads
// and strips the frontmatter from each of our
// source files and passes it on to the plugins.
Metalsmith(__dirname)

    .env('NODE_ENV', process.env.NODE_ENV)
    .env('DEBUG', process.env.DEBUG)

    .metadata({
        site_name: "SchildiChat",
        site_description: "SchildiChat is a Matrix client based on Element with a more traditional instant messaging experience.",
        url_prefix: urlPrefix,
        svg_favicon: svgFavicon,
        copyright_date: new Date().getFullYear()
    })

    .use(remove(['**/.gitignore']))

    // frontmatter (thing in markdown before actual markdown) default values
    .use(defaultValues([
        {
            pattern: ['**/*.{html,md,hbs,md.hbs,fakechild}', '!error/**/*'],
            defaults: site_default_params
        },
        {
            pattern: 'error/**/*',
            defaults: Object.assign({}, site_default_params, {
                title: "Error",
                layout: 'error.hbs',
                stylesheet: 'error.css',
                nav_show: false,
                show_link_to_parent: false,
                show_related_links: false,
            })
        }
    ]))

    .use(when(isProduction,
        favicons({
            src: svgFavicon,
            dest: 'img/favicons/',
            icons: {
                favicons: true
            }
        })
    ))
    .use(remove(['img/favicons/manifest.json']))

    // Helpers to use in *.hbs files
    .use(discoverHelpers())

    // Allow nesting layouts // WARN: don't use layouts directory directly after that
    .use(nested({
        directory: 'layouts',
        generated: 'build-layouts'
    }))

    // Partials to include in *.hbs files
    .use(discoverPartials({
        directory: 'partials',
        pattern: /\.hbs$/
    }))

    // sass -> css
    .use(sass())
    
    // postcss
    .use(postcss({
        plugins: {
            'postcss-url': {
                // see: https://github.com/postcss/postcss-url/issues/131
                url: (asset) => (asset.url[0] === '/' ? urlPrefix : '') + asset.url
            },
            'postcss-preset-env': {},
            'autoprefixer': {},
            'postcss-csso': {}
        }
    }))

    // esbuild for js
    .use(jsBundle({
        entries: {
            "js/bundle": 'src/js/bundle.js'
        }
    }))

    // Prevent usage of cached files if they have been changed in between
    .use(contenthash({
    
        // don't keep orignal untagged file
        keep: false,
        
        // use sha256 for hashing
        algorithm: 'sha256',
        
        // match static files
        // uses multimatch  https://www.npmjs.com/package/multimatch
        pattern: ['{js,css}/*'],
        
        // function for determining new filename
        // default function uses only first 16 hexadecimal digits
        rename: function(filepath, digest) {
            
            // we split at the first period, instead of extname
            //  this is to handle .css.map
            var ext = filepath.indexOf('.');
            
            return [
                filepath.substring(0, ext),
                '.', digest.substr(0, 16),
                filepath.substring(ext),
            ].join('');
            
        },
        
    }))

    // Ancestry allows access to parents and children.
    .use(ancestry({
        sortBy: ["order_id", "title"],
        sortFilesFirst: "**/index.*",
        match: "**/*.{html,md,hbs,md.hbs,fakechild}"
    }))

    // Dynamic auto-defaults, to be called after default_values and ancestry
    .use(autoDefaults({
        createUriFromPath: (path) => {
            return path
                .replace(/\.(md|hbs|md\.hbs)$/, ".html")
                .replace(/(^|\/|\\)index.*$/, "$1")
                .replace(/^\/?/, "/");
        },
        stylesheetPrefixPath: "css/"
    }))

    .use(inPlace({
        engineOptions: {
            html: true
        }
    }))

    // Put the HTML fragments from the steps above
    // into our template, using the Frontmatter
    // properties as template variables.
    .use(layouts({
        // Generated by nested
        directory: 'build-layouts',
    }))

    .use(inlineSVG({
        selector: 'img.icon'
    }))
    .use(inlineSVG({
        selector: 'img.svg-embedded'
    }))

    // After layouts, these might add some links as well
    .use(externalLinks({
        matchNegative: ["^https?:\/\/([^\/]*\.)?schildi\.chat.*"]
    }))

    .use(prefixoid([
        {
            prefix: urlPrefix,
            convert_relatives: false,
            tag: 'link',
            attr: 'href'
        }, {
            prefix: urlPrefix,
            convert_relatives: false,
            tag: 'a',
            attr: 'href'
        }, {
            prefix: urlPrefix,
            convert_relatives: false,
            tag: 'object',
            attr: 'data'
        }, {
            prefix: urlPrefix,
            convert_relatives: false,
            tag: 'img',
            attr: 'src'
        }, {
            prefix: urlPrefix,
            convert_relatives: false,
            tag: 'script',
            attr: 'src'
        }
    ]))

    // minify html
    .use(when(isProduction, htmlMinifier()))

    // remove stuff
    .use(remove(['**/*.fakechild'])) // they only add to navigation, not needed as file anymore
    .use(remove(['**/img/**/orig/**'])) // don't preserve original images not needed in production

    // And tell Metalsmith to fire it all off.
    .build(function(err) {
        if (err) { throw err; }
    });
