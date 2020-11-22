# schildichat-website

This project builds schildi.chat using [metalsmith](https://metalsmith.io/).

## Prepare build

```
yarn install
```

## Build

```
make
```

## Info about metalsmith

- [Website](https://metalsmith.io)
- [Step by step guide](https://metalsmith.io/step-by-step/#tl-dr)
- [GitHub](https://github.com/segmentio/metalsmith)

## Info about handlebars:

- [handlebarsjs](https://handlebarsjs.com/)
- [block helpers](https://handlebarsjs.com/guide/block-helpers.html#simple-iterators)


## Plugins

Install plugins with
```
yarn install --dev <plugin-name>
```
in order to have them put into the devDependencies.

### Used
- [ignore stuff](https://github.com/segmentio/metalsmith-ignore)
- [default values plugin](https://github.com/metalsmith/default-values)
- [generate favicons](https://github.com/arccoza/metalsmith-favicons);
- [discover handlebars helpers](https://github.com/timdp/metalsmith-discover-helpers)
- [nested layouts](https://github.com/firesideguru/metalsmith-nested)
- [discover handlebars partials](https://github.com/timdp/metalsmith-discover-partials)
- [ancestry](https://github.com/tests-always-included/metalsmith-ancestry)
- [transform source files in place](https://github.com/metalsmith/metalsmith-in-place)
- [use layouts as skeleton for source files](https://github.com/metalsmith/metalsmith-layouts)
- [multi language](https://www.npmjs.com/package/metalsmith-multi-language)
- [link prefixes](https://github.com/evoja/metalsmith-prefixoid)
- [sass plugin](https://github.com/sounisi5011/metalsmith-dart-sass)

### Interesting, but currently unused
- [headings plugin](https://github.com/segmentio/metalsmith-headings)
- [headings-identifier plugin](https://github.com/majodev/metalsmith-headings-identifier)
- [generate navigation](https://github.com/unstoppablecarl/metalsmith-navigation) (maybe rather use ancestry to meet individual needs)
- [inline svg](https://github.com/meatysolutions/metalsmith-inline-svg)
- responsive images: [generate](https://github.com/AnthonyAstige/metalsmith-picset-generate) and [helper](https://github.com/AnthonyAstige/metalsmith-picset-handlebars-helper)
- [optimize svgs](https://github.com/ben-eb/metalsmith-svgo)
- [svg sprites](https://github.com/10xjs/metalsmith-svg-sprite)

### jstransformers
Those are used by `metalsmith-in-place` and `metalsmith-layouts`, in our case:
- `jstransformer-handlebars` for handlebars
- `jstransformer-markdown-it` for markdown

Which transformers to use is determined by file extension in order from right to left.  
They can be used together (e.g. `*.md.hbs` for handlebars --> markdown --> html).

# TODO

- Website privacy policy and impressum
- Back navigation from subpages
- Contents
- Pass related links as {desc,link} array (append useful common set of variables, e.g. github_src_link)
- postcss: minimize, vendor prefixes, path adjustment
- Reconsider font stack (maybe just use that from Bootstrap)
