var zerator_nav = {
    doNotification: function() {
        chrome.notifications.onClicked.addListener(function(notificationId){
            if (notificationId === 'notifyON' + zerator_params.title) {
                chrome.tabs.create({url:zerator.getCurrentRedirectUrl()},function(tab){});
            }
        });
        chrome.notifications.clear('notifyON' + zerator_params.title, function(id) { });
        chrome.notifications.create('notifyON' + zerator_params.title, { type: "basic", title: zerator_params.title, message: zerator_params.message, iconUrl: "iconon128.png" }, function(id) { });
    },
    setIconON: function(on) {
        var status = on ? "on" : "off";
        chrome.browserAction.setIcon({path : "icon" + status + "48.png"});
    },
    goIt: function() {
        if(zerator.isON){
            chrome.tabs.create({url:zerator.getCurrentRedirectUrl()},function(tab){});
        } else {
            chrome.tabs.create({url:zerator_params.offlineUrl},function(tab){});
        }
    }
}

chrome.browserAction.onClicked.addListener(zerator_nav.goIt);

zerator_nav.setIconON(false);
var zerator = new BtnLive(zerator_params.chaines, function(result) {
    zerator_nav.setIconON(result);
    if (result) {
        zerator_nav.doNotification();
    }
}, 120000, 2);
