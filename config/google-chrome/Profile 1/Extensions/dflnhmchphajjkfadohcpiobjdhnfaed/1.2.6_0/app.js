/** Variables utiles */
var streamers = ["Corobizar","ImSoFresh","Sardoche","Heimindanger","Nyuw","S4nt4"];
var words = [" très doux"," très frais"," très serein",""," tout roux"," très nouveau"];
var lamaUrl = "http://corobizar.com";
var defaultTooltip = "Corobizar.com - ";
var curr = { isLive: false, streamer: -1, title: ""};
/** Icon config */
chrome.browserAction.setBadgeBackgroundColor({color:"#B1CA20"});

/** Fonction : vérifie l'état du live */
function checkLive(){
	/** Requête GET */
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://app.corobizar.com/live.php?t=" + Date.now(), true);
	xhr.onload = function(){
		if(xhr.status >= 200 && xhr.status < 400){
			var data = JSON.parse(xhr.responseText);
			/** Check islive */
			if(data.isLive){
				var notif = true;
				if(curr.isLive){
					/** Si même streamer, pas de notif */
					if(data.streamer == curr.streamer){
						if(data.title == curr.title) return;
						else notif = false;
					}
				}
				/** Passage en ligne et mise à jour de "curr" */
				curr.isLive = true;
				curr.streamer = data.streamer;
				curr.title = data.title;
				/** Textes */
				var sneaky = (curr.streamer < 0 || curr.streamer == undefined);
				var titlestream = defaultTooltip + (sneaky ? "" : streamers[curr.streamer] + " - ") +  data.title;
				var bodystream = "Salut à toi jeune Lama, " + (sneaky ? "un sneaky stream a été lancé sur le site" : streamers[curr.streamer]+" est en direct sur son stream"+words[curr.streamer]) + ". Rejoins-nous vite !";
				/** Icone */
				chrome.browserAction.setTitle({title:titlestream});
				chrome.browserAction.setBadgeText({text:"ON"});
				chrome.browserAction.setIcon({
					path:{
						"19":"ressources/lama19.png",
						"38":"ressources/lama38.png"
					}
				});
				/** Notification */
				if(notif){
					chrome.notifications.create("isLive",{ 
						type: "basic", 
						iconUrl: "ressources/logo128.png",
						title: defaultTooltip + data.title, 
						message: bodystream,
						isClickable: true
					}, function(){});
				}
			}else if(!data.isLive){
				curr.isLive = false;
				curr.streamer = -1;
				curr.title = "";
				chrome.browserAction.setTitle({title:"Corobizar.com - Offline"});
				chrome.browserAction.setIcon({
					path:{
						"19":"ressources/lamaoff19.png",
						"38":"ressources/lamaoff38.png"
					}
				});
				chrome.browserAction.setBadgeText({text:""});
			}
		}
	};
	xhr.onerror = function(e){};
	xhr.send(null);
}

/** Check toutes les minutes */
setInterval(checkLive, 60000);
document.addEventListener('DOMContentLoaded', function(){
  checkLive();
});

/** Gestion clic sur le logo et sur la notification */
chrome.browserAction.onClicked.addListener(function(){
	chrome.tabs.create({ url: lamaUrl });
});
chrome.notifications.onClicked.addListener(function(){
	chrome.tabs.create({ url: lamaUrl });
});