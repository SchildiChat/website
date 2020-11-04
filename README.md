# schildichat-website

This project builds www.schildi.chat using [metalsmith](https://metalsmith.io/).

## Prepare build

```
npm install
```

## Build

```
make
```

## Info about metalsmith

- [Website](https://metalsmith.io)
- [Step by step guide](https://metalsmith.io/step-by-step/#tl-dr)
- [GitHub](https://github.com/segmentio/metalsmith)

Layout files use handlebars:

- [handlebarsjs](https://handlebarsjs.com/)
- [block helpers](https://handlebarsjs.com/guide/block-helpers.html#simple-iterators)


## Plugins

Install plugins with
```
npm install --save-dev <pluin-name>
```
in order to have them put into the dependencies.

- [Markdown plugin](https://github.com/segmentio/metalsmith-markdown)
- [Markdown options](https://marked.js.org/#/USING_ADVANCED.md)
- [sass plugin](https://github.com/stevenschobert/metalsmith-sass)
- [default values plugin](https://github.com/metalsmith/metalsmith-default-values)
- [headings plugin](https://github.com/segmentio/metalsmith-headings)
- [headings-identifier plugin](https://github.com/majodev/metalsmith-headings-identifier)
- [ancestry](https://github.com/tests-always-included/metalsmith-ancestry)
- [nested layouts](https://github.com/firesideguru/metalsmith-nested)


# TODO

- Website privacy policy and impressum
- Subpage for web (or direct link to app.schildi.chat?)
- Subpage for desktop
