# schildichat-website

This project builds [schildi.chat](https://schildi.chat) using [metalsmith](https://metalsmith.io/).

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

## Info about handlebars

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
- [sass plugin](https://github.com/sounisi5011/metalsmith-dart-sass)
- [postcss](https://github.com/gwillz/metalsmith-postcss)
- [webpack](https://github.com/gwillz/metalsmith-webpack)
- [metalsmith-contenthash](https://github.com/ekytr/metalsmith-contenthash)
- [ancestry](https://github.com/tests-always-included/metalsmith-ancestry)
- [transform source files in place](https://github.com/metalsmith/metalsmith-in-place)
- [use layouts as skeleton for source files](https://github.com/metalsmith/metalsmith-layouts)
- [inline svg](https://github.com/meatysolutions/metalsmith-inline-svg)
- [link prefixes](https://github.com/evoja/metalsmith-prefixoid)
- [minify html](https://github.com/whymarrh/metalsmith-html-minifier)

### Interesting, but currently unused
- [headings plugin](https://github.com/segmentio/metalsmith-headings)
- [headings-identifier plugin](https://github.com/majodev/metalsmith-headings-identifier)
- [generate navigation](https://github.com/unstoppablecarl/metalsmith-navigation) (maybe rather use ancestry to meet individual needs)
- [multi language](https://www.npmjs.com/package/metalsmith-multi-language)
- responsive images: [generate](https://github.com/AnthonyAstige/metalsmith-picset-generate) and [helper](https://github.com/AnthonyAstige/metalsmith-picset-handlebars-helper)
- [optimize svgs](https://github.com/ben-eb/metalsmith-svgo)
- svg sprites: [too old](https://github.com/10xjs/metalsmith-svg-sprite), [(too) new](https://github.com/gwillz/metalsmith-sprites)
- [handlebars alternative](https://github.com/gwillz/metalsmith-handlebars)
- [stylelint](https://github.com/csmets/metalsmith-sass-lint) (or with postcss, but ditching sass or [using it through postcss]((https://github.com/jonathantneal/postcss-sass)) needed)
- [metalsmith-rename](https://github.com/MoOx/metalsmith-rename)
- [minify images](https://github.com/ahmadnassri/metalsmith-imagemin) (this needs glob/pattern and decoupled dependencies added, orient on [gulp plugin](https://github.com/sindresorhus/gulp-imagemin))
- [cache](https://github.com/leviwheatcroft/metalsmith-cache)

### jstransformers
Those are used by `metalsmith-in-place` and `metalsmith-layouts`, in our case:
- `jstransformer-handlebars` for handlebars
- `jstransformer-markdown-it` for markdown

Which transformers to use is determined by file extension in order from right to left.  
They can be used together (e.g. `*.md.hbs` for handlebars --> markdown --> html).
