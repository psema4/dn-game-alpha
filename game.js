var config = require('./config')
  , server = (typeof window === 'undefined') ? require('./lib/server')(config) : {}
  , client = (typeof window !== 'undefined') ? require('./lib/client')(config) : {}
;

module.exports = (function() {
    var gameModule = {
            site: {
                name: config.name
              , description: config.description
              , version: config.version
              , screenshots: config.screenshots
            }
          , server: server
          , client: client
        }
    ;

    return gameModule;
})();
