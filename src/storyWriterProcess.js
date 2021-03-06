const logger = require('./logger');
const { loadStories } = require('./storyFinder');
const { writeFile } = require('./writer');

const writeOutStoryLoader = (pathConfig) => {
  logger.debug('writeOutStoryLoader', pathConfig);
  pathConfig.outputFiles.forEach((outputFileConfig) => {
    logger.info('Output file:      ', outputFileConfig.outputFile);
    logger.info('Patterns:         ', JSON.stringify(outputFileConfig.patterns));

    const storyFiles = [];

    outputFileConfig.patterns.forEach((pattern) => {
      const patternStories = loadStories(pattern);
      Array.prototype.push.apply(storyFiles, patternStories);
      logger.info(`Located ${patternStories.length} files matching pattern '${pattern}'`);
    });

    if (storyFiles.length > 0) {
      writeFile(storyFiles, outputFileConfig.outputFile);
      logger.info(`Compiled story loader for ${storyFiles.length} files:\n`, ` ${storyFiles.join('\n  ')}`);
    } else {
      logger.warn('No files were found matching the specified pattern. Story loader was not written.');
    }
  });
};

module.exports = { writeOutStoryLoader };
