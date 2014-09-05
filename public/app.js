$(function () {
    var GAME = {};

    GAME.PROTOCOL = 'urn:x-cast:org.lholmquist.attempt';

    this._toggleMenu = function (code, e) {
        var activeGame = $('.games li.active'),
            next = activeGame.next(),
            prev = activeGame.prev();

        switch (code) {
            case 38:
                if (!prev.length) {
                    prev = $('.games li').last();
                }

                activeGame.removeClass('active');
                prev.addClass('active');
                break;
            case 40:
                if (!next.length) {
                    next = $('.games li').first();
                }

                activeGame.removeClass('active');
                next.addClass('active');
                break;
            case 13:
                this.castMessageBus_.send(e.senderId, {event: 'enter'});
                window.location = 'examples/phaser';
                break;
            case 27:
                this.castMessageBus_.send(e.senderId, {event: 'exit'});
                window.location = 'index.html';
                break;
            }
    };

    this.onMessage = function (e) {
        var event = e.data;
        console.log('onMessage', e);
        //parse the message,  if it is a menu thing, do that shizzel
        if (event.message.type === 'menu') {
            this._toggleMenu(event.message.code, e);
            return;
        }

        if(event.message === 27) {
            this._toggleMenu(event.message, e);
            return;
        }

        jumpy(e.data.message, e.data.type);
    };

    this.onSenderConnected = function (e) {
        console.log('onSenderConnected', e);
    };

    this.onSenderDisconnected = function (e) {
        console.log('onSenderDisconnected', e);
    };


    this.castReceiverManager_ = cast.receiver.CastReceiverManager.getInstance();

    this.castMessageBus_ =
        this.castReceiverManager_.getCastMessageBus(
                GAME.PROTOCOL,
                cast.receiver.CastMessageBus.MessageType.JSON
            );

    this.castMessageBus_.onMessage = this.onMessage.bind(this);

    this.castReceiverManager_.onSenderConnected =
        this.onSenderConnected.bind(this);

    this.castReceiverManager_.onSenderDisconnected =
        this.onSenderDisconnected.bind(this);

    this.castReceiverManager_.start();
});

Podium = {};
Podium.keydown = function(k) {
    var oEvent = document.createEvent('KeyboardEvent');

    // Chromium Hack
    Object.defineProperty(oEvent, 'keyCode', {
                get : function() {
                    return this.keyCodeVal;
                }
    });
    Object.defineProperty(oEvent, 'which', {
                get : function() {
                    return this.keyCodeVal;
                }
    });

    if (oEvent.initKeyboardEvent) {
        oEvent.initKeyboardEvent("keydown", true, true, window, false, false, false, false, k, k);
    } else {
        oEvent.initKeyEvent("keydown", true, true, window, false, false, false, false, k, 0);
    }

    oEvent.keyCodeVal = k;

    if (oEvent.keyCode !== k) {
        alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
    }

    document.querySelector('canvas').dispatchEvent(oEvent);
};

Podium.keyup = function(k) {
    var oEvent = document.createEvent('KeyboardEvent');

    // Chromium Hack
    Object.defineProperty(oEvent, 'keyCode', {
                get : function() {
                    return this.keyCodeVal;
                }
    });
    Object.defineProperty(oEvent, 'which', {
                get : function() {
                    return this.keyCodeVal;
                }
    });

    if (oEvent.initKeyboardEvent) {
        oEvent.initKeyboardEvent("keyup", true, true, window, false, false, false, false, k, k);
    } else {
        oEvent.initKeyEvent("keyup", true, true, window, false, false, false, false, k, 0);
    }

    oEvent.keyCodeVal = k;

    if (oEvent.keyCode !== k) {
        alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
    }

    document.querySelector('canvas').dispatchEvent(oEvent);
};


function jumpy(k, type) {
  if (type === 'keydown') {
      Podium.keydown(k);
      return;
  }

  Podium.keyup(k);
}
