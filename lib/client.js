module.exports = function(config) {
    var _isPlaying = false
      , _isPaused = false
      , _isGameOver = true
    ;

    if (typeof window === 'undefined') {
        return config;
    }

    function reset() {
        _isPlaying = false;
        _isPaused = false;
        _isGameOver = false;
        play();
    }

    function quit() {
        _isPlaying = false;
        _isPaused = false;
        _isGameOver = true;
        site.showWindow('.home.window');
    }

    function play() {
        _isPlaying = true;
        _isPaused = false;
        site.showWindow('.stage.window');
    }

    function isPlaying() {
        return _isPlaying;
    }

    function isPaused() {
        return _isPaused;
    }

    function isGameOver() {
        return _isGameOver;
    }

    function pause() {
        _isPaused = true;
        site.showWindow('.pause.window');
    }

    // create a pause screen
    var items = [
        '<div class="flexi"><center><h1>PAUSE</h1></center></div>'
      , '<div class="flexi" style="height: 32px;">&nbsp;</div>'
      , '<div class="flexi"><center>Pause content here...</center></div>'
      , '<div class="flexi" style="height: 32px;">&nbsp;</div>'
      , '<button class="btn btn-primary flexi" onclick="site.showWindow(\'.debug.window\');">Debug</button>'
      , '<button class="btn btn-success flexi">Play</button>'
    ];

    var w = document.createElement('section');
    w.className = 'pause window';
    w.innerHTML = util.format('<div style="padding-left: 25%; padding-right: 25%; padding-top: 10%;"><div style="border: 2px solid #444; border-radius: 4px; padding: 1em;"><div class="flex flexc">%s</div></div></div>', items.join(''));
    document.body.appendChild(w);
    $(w).hide();

    $('.stage.window button.btn-success').click(function() {
        pause();
    });

    $('.pause.window button.btn-success').click(function() {
        play();
    });

    return {
        name: config.name
      , description: config.description
      , version: config.version
      , screenshots: config.screenshots.map(function(i) { return i.url; })
      , social: config.social

      , reset: reset
      , quit: quit
      , play: play
      , pause: pause
      , isPlaying: isPlaying
      , isPaused: isPaused
      , isGameOver: isGameOver
    };
};
