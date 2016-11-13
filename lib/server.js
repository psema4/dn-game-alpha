var util = require('util');

module.exports = function(config) {
    function onData(data, session) {
        var res = false;

        switch (data.command) {
            case 'register':
                res = { command: 'registered', data: { clientId: session.clientId, username: session.username } }
                break;

            case 'ping':
                res = { command: 'pong', data: { clientId: session.clientId, username: session.username, timestamp: new Date().getTime() } };
                break;

            default:
                console.log('unsupported command "%s": %s', data.command, util.inspect(data));
        }

        return res;
    }

    return {
        name: config.name
      , description: config.description
      , version: config.version
      , screenshots: config.screenshots
      , onData: onData
    };
};
