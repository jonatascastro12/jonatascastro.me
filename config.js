const jsRe = new RegExp('.js$');


module.exports = {
  deploy: {
    bucketName: "jonatascastro.me",
    distributionId: 'E3FSFUX88C5RSH'
  },
  cleanCss: {
    files: 'css\\*.css',
    cleanCSS: {
      rebase: true
    }
  },
  cssPacker: {
    assetsSource: 'src\\assets',
    outputPath: 'css/'
  },
  uglify: {
    concat: {
      file: 'bundle.min.js',
      root: 'js'
    },
    removeOriginal: true,
    windows: true,
    root: 'src/assets/js',
    files: [
      'js\\jquery.js',
      'js\\senna.min.js',
      'js\\headroom.min.js',
      'js\\simple-lightbox.min.js',
      'js\\main.js'
    ],
    filter: function (name) {
      return name.match(jsRe);
    }
  },
  source: 'src/content',
  destination: 'dist',
  assets: {
    source: 'src/assets',
    destination: '.'
  },
  filemetadata: [
    {
      pattern: 'articles/*.md',
      metadata: {
        collection: 'articles',
        layout: 'article.html'
      }
    }
  ],
  collections: {
    articles: {
      pattern: 'articles/*.md',
      sortBy: 'date',
      reverse: true
    },
    homeArticles: {
      pattern: 'articles/*.md',
      sortBy: 'date',
      reverse: true,
      limit: 3
    }
  },
  dateFormatter: {
    format: 'MMM DD, YYYY'
  },
  permalinks: {
    linksets: [{
      pattern: ':slug',
      match: {
        collection: 'articles'
      }
    }]
  },
  layouts: {
    engine: 'handlebars',
    directory: 'src/layouts',
    partials: {
      footer: '../partials/footer',
      header: '../partials/header',
      navbar: '../partials/navbar'
    }
  },
  inPlace: {
    directory: 'src/layouts',
    engine: 'handlebars'
  },
  serve: {
    port: 8000,
    verbose: true
  },
  watch: {
    paths: {
      "${source}/**/*": true,
      "src/assets/**/*": "**/*",
      "src/content/**/*": "**/*",
      "src/layouts/**/*": "**/*.html",
      "src/partials/**/*": "**/*.html"
    }
  }
};