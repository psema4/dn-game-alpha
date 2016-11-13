module.exports = function(config) {
    var clientId = -1
      , _isPlaying = false
      , _isPaused = false
      , _isGameOver = true
    ;

    if (typeof window === 'undefined') {
        return config;
    }

    function init() {
        // include aframe
        var s = document.createElement('script');
        s.src = '/game/assets/aframe.min.js';
        document.body.appendChild(s);

        // setup the stage
        // FIXME: fire on script loaded
        setTimeout(function() {
            // the aframe scene
            var t = document.createElement('a-scene');
            t.innerHTML = '<a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>'
                        + '<a-box position="-1 0.5 -3" rotation="0 45 0" width="1" height="1" depth="1" color="#4CC3D9"></a-box>'
                        + '<a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>'
                        + '<a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>'
                        + '<a-sky color="#ECECEC"></a-sky>'
            ;
            $('.stage.window')[0].appendChild(t);

            // ---- site/game controls
            var u = document.createElement('div');
            u.id = 'game-controls';
            u.innerHTML = '<button class="btn btn-primary">Debug</button>';
            u.innerHTML += '<button class="btn btn-default">Close</button>';
            u.innerHTML += '<button class="btn btn-success">Pause</button>';
            $('.stage.window')[0].appendChild(u);
            $('#game-controls').css({
                position: 'absolute'
              , top: '0px'
              , left: '0px'
              , width: '100%'
            });

            // ---- create a pause screen
            var items = [
                '<div class="flexi"><center><h1>PAUSE</h1></center></div>'
              , '<div class="flexi" style="height: 32px;">&nbsp;</div>'
              , '<div class="flexi"><center>Pause content here...</center></div>'
              , '<div class="flexi" style="height: 32px;">&nbsp;</div>'
              , '<button class="btn btn-primary flexi" onclick="site.showWindow(\'.debug.window\');">Debug</button>'
              , '<button class="btn btn-success flexi">Play</button>'
              , '<div class="flexi" style="height: 32px;">&nbsp;</div>'
              , '<div class="flexi" style="height: 32px;">ClientId: <span id="pause-client-id"></span></div>'
            ];
        
            var w = document.createElement('section');
            w.className = 'pause window';
            w.innerHTML = util.format('<div class="modal-container darkbg"><div class="modal-window"><div class="flex flexc">%s</div></div></div>', items.join(''));
            document.body.appendChild(w);
            $(w).hide();

            // ---- control handlers
            $('.stage.window button.btn-primary').click(function() {
                site.showWindow('.debug.window');
            });

            $('.stage.window button.btn-default').click(function() {
                //game.quit();
                // FIXME: reload page until teardown available
                location.href += '';
            });

            $('.stage.window button.btn-success').click(function() {
                pause();
            });
        
            $('.pause.window button.btn-success').click(function() {
                play();
            });

            // ---- start
            game.reset();
        }, 250);
    }

    function exit() {
        // TODO: remove aframe & cleanup
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

    function onData(data) {
        var res = false;

        log(data);

        switch (data.command) {
            case 'welcome':
                clientId = data.data.clientId;
                $('#pause-client-id').text(clientId);
                break;

            case 'registered':
                username = data.data.username;
                log('username changed to ' + username);
                break;

            case 'namechange':
                username = data.data.username;
                log('username changed to ' + username);
                break;

            default:
        }

        return res;
    }

    socket.on('event', onData);

    // ---- return the game client
    return {
        name: config.name
      , description: config.description
      , version: config.version
      , screenshots: config.screenshots.map(function(i) { return i.url; })
      , social: config.social

      , init: init
      , exit: exit

      , reset: reset
      , quit: quit
      , play: play
      , pause: pause
      , isPlaying: isPlaying
      , isPaused: isPaused
      , isGameOver: isGameOver

      , onData: onData
    };
};
