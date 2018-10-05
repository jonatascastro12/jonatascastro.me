const start = process.hrtime();
const task  = process.argv[2];

/* Dependencies
   ========================================================================== */

const config     = require('./config');
const chalk      = require('chalk');
const ghpages    = require('gh-pages');
const plugins    = require('load-metalsmith-plugins')();
const prettytime = require('pretty-hrtime');
const metalsmith = require('metalsmith')(__dirname);

/* Pipeline
   ========================================================================== */

metalsmith
  .source(config.source)
  .destination(config.destination)
  .use(plugins.assets(config.assets))
  .use(plugins.filemetadata(config.filemetadata))
  .use(plugins.slug())
  .use(plugins.dateInFilename())
  .use(plugins.collections(config.collections))
  .use(plugins.dateFormatter(config.dateFormatter))
  .use(plugins.metallic())
  .use(plugins.markdown())
  .use(plugins.permalinks(config.permalinks))
  .use(plugins.layouts(config.layouts))
  .use(plugins.inPlace(config.inPlace));

if (task === 'watch') {
  metalsmith
    .use(plugins.serve(config.serve))
    .use(plugins.watch(config.watch));
}

/* Generate
   ========================================================================== */

metalsmith.build((err) => {
  if (err) throw err;
  else buildCompleted();
});

const buildCompleted = () => {
  console.log('TESTE');
  if (task === 'build') {
    buildDuration();
  }

  if (task === 'deploy') {
    ghpages.publish(config.destination, {
      branch: 'wedeploy',
      repo: 'git@github.com:jonatascastro12/jonatascastro.me.git'
    }, (err) => {
      if (err) throw err;
      else buildDuration();
    });
  }
};

const buildDuration = () => {
  const end = prettytime(process.hrtime(start));
  console.log(`> done in ${chalk.green(end)}`);
}