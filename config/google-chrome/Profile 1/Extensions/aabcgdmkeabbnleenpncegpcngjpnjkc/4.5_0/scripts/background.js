/*Copyright (c) 2017 ksoft http://www.dummysoftware.com*/function onInitialize(){chrome.tabs.getAllInWindow(null,function(e){ZCilY(e)});chrome.tabs.onUpdated.addListener(function(e,t,n){QZwAQ(n)}),chrome.tabs.onRemoved.addListener(function(e,t){JedId(e)}),chrome.extension.onRequest.addListener(function(e,t,n){onRequest(e)}),chrome.runtime.onMessage.addListener(function(e,t,n){onMessage(e)}),chrome.runtime.onInstalled.addListener(function(e){RIsKd(e)}),chrome.notifications.onClicked.addListener(function(e){xGyPk(e)}),canvas.width=19,canvas.height=19,NciOD.src=jVGGP.on}function RIsKd(e){var t=chrome.runtime.getManifest().version;"install"==e.reason?chrome.tabs.create({url:"http://www.dummysoftware.com/easy-auto-refresh?action=install&new="+t}):"update"==e.reason&&e.previousVersion>0&&e.previousVersion<3.7&&chrome.tabs.create({url:"http://www.dummysoftware.com/easy-auto-refresh?action=update&old="+e.previousVersion+"&new="+t})}function ZCilY(e){for(var t,n=0;t=e[n];n++)jwqQh(t.url)||aQVYD(t)}function QZwAQ(e){jwqQh(e.url)||(aQVYD(e),XnsTj(e))}function JedId(e){tfDoj({id:e},!1)}function aQVYD(e){var t=getOptions(e);1==t.refresh?(chrome.pageAction.setIcon({path:jVGGP.on,tabId:e.id}),onRequest({tab:e,refresh:!0})):(chrome.pageAction.setIcon({path:jVGGP.off,tabId:e.id}),tfDoj(e,!0)),chrome.pageAction.show(e.id)}function jwqQh(e){return e.indexOf("chrome:")>-1}function HTwVu(e){for(var t=0;t<kycXa.length;t++){var n=kycXa[t];if(n.tab.id==e.id)return n}return null}function PplzD(e){for(var t=0;t<kycXa.length;t++)if(kycXa[t]==e)return void kycXa.splice(t,1)}function tfDoj(e,t){var n=HTwVu(e);if(null!=n&&(clearInterval(n.intervalId),clearInterval(n.timerIntervalId),PplzD(n),delete Zqakk["tab"+e.id],t&&(chrome.pageAction.setIcon({path:jVGGP.off,tabId:e.id}),chrome.pageAction.show(e.id),chrome.pageAction.setTitle({tabId:e.id,title:"Easy Auto Refresh"})),null!=e.url)){e.url.indexOf("chrome.google.com")==-1&&e.url.indexOf("file://")==-1&&chrome.tabs.executeScript(e.id,{code:"keyPressManager.remove();"});var i=getOptions(e);i.lastRefresh=null,i.nextRefresh=null,saveOptions(e,i)}}function Ifexu(e,t,n){var i=HTwVu(e);return null!=i&&i.intervalValue==t&&(n.isDomain?getDomain(i.tab.url)==getDomain(e.url):i.tab.url==e.url)}function wAOzK(e,t){var n=new Date,i=new Date(mdrjm["tab"+e.id]),a=Math.round((n-i)/1e3);if(isNaN(a)||a>1){var o=1==t.isAutoClick&&null!=t.autoClickId&&t.autoClickId.length>0&&"1"==t.autoClickIdValid;if(o&&!t.isAutoClickAfterRefresh)qVTaZ(e,t.autoClickId),mdrjm["tab"+e.id]=n;else if(1==t.isUrlList&&t.urlList&&t.urlList.length>0){var r=0,s=t.urlListLast;s&&(r=t.urlList.indexOf(s),r>-1?r++:r=0,r>=t.urlList.length&&(r=0));var c=t.urlList[r];if(c){t.urlListLast=c;var l=c,d=c.split("/");d&&d.length<=3&&(l+="/"),saveOptions({url:l},t),chrome.tabs.update(e.id,{url:c},function(e){Ybmrx(e)})}}else e.url.indexOf("chrome.google.com")==-1&&e.url.indexOf("file://")==-1?chrome.tabs.executeScript(e.id,{code:"location.reload(true);"},function(t){Ybmrx(t,function(t){t&&chrome.tabs.update(e.id,{url:e.url})})}):chrome.tabs.update(e.id,{url:e.url});if(o&&t.isAutoClickAfterRefresh){var f=HTwVu(e);f&&(f.autoClickId=t.autoClickId)}}}function refresh(e,t){t.isAllTabs?chrome.tabs.query({windowId:e.windowId},function(e){for(var n in e)wAOzK(e[n],t)}):wAOzK(e,t)}function lXMHp(e){var t,n=getOptions(e);1==n.isRandom?(n=sqwVW(e),t=n.random):SoWrT(n)?(n=oskXC(e),t=n.interval):t=n.interval,1==n.isCache&&chrome.browsingData.removeCache({since:0}),refresh(e,n),n=updateLastRefresh(n,t),saveOptions(e,n),chrome.runtime.sendMessage({message:"updateLastRefresh",lastRefresh:n.lastRefresh,nextRefresh:n.nextRefresh,tabId:e.id})}function onRequest(e){if(1==e.refresh){var t=getOptions(e.tab),n=1e3*t.interval;SoWrT(t)?(t=oskXC(e.tab),n=1e3*t.interval):null!=t.random&&(n=1e3*t.random),Ifexu(e.tab,n,t)&&!e.force||(tfDoj(e.tab,!1),intervalId=setInterval(function(){lXMHp(e.tab,t.random)},n),timerIntervalId=setInterval(function(){wfnpo(e.tab)},1e3),kycXa.push({tab:e.tab,intervalId:intervalId,timerIntervalId:timerIntervalId,intervalValue:n}),t=updateLastRefresh(t,n/1e3),saveOptions(e.tab,t)),e.tab.url.indexOf("chrome.google.com")==-1&&e.tab.url.indexOf("file://")==-1&&chrome.tabs.executeScript(e.tab.id,{code:"keyPressManager.setup("+e.tab.id+");"});var i=SoWrT(t)?t.nextRefresh:n/1e3+" seconds";chrome.pageAction.setIcon({path:jVGGP.on,tabId:e.tab.id}),chrome.pageAction.show(e.tab.id),chrome.pageAction.setTitle({tabId:e.tab.id,title:"Easy Auto Refresh ON : "+i})}else tfDoj(e.tab,!0)}function onMessage(e){"resetInterval"==e.action&&chrome.tabs.get(e.tabId,function(e){onRequest({tab:e,refresh:!0,force:!0}),chrome.pageAction.setIcon({path:jVGGP.restart,tabId:e.id}),chrome.pageAction.show(e.id),setTimeout(function(){var t=e;chrome.tabs.get(t.id,function(n){t.url==n.url&&(chrome.pageAction.setIcon({path:jVGGP.on,tabId:e.id}),chrome.pageAction.show(e.id))})},1e3)})}function sqwVW(e){var t=getOptions(e),n=t.interval,i=parseInt(n,10);i<=10&&(i=60);var a=getRandomInt(10,i);return t.random=a,saveOptions(e,t),chrome.runtime.sendMessage({message:"updateRandomInterval",value:a,tabId:e.id}),onRequest({tab:e,refresh:!0}),t}function SoWrT(e){var t=!1;return e&&(t=1==e.isTimeList&&e.timeList&&e.timeList.length),t}function oskXC(e){for(var t=getOptions(e),n=t.interval,i=[],a=-1,o=-1,r=new Date,s=0;s<t.timeList.length;s++){var c=t.timeList[s],l=c.match(/^(\d{1,2}):(\d{2})$/);if(l&&l.length>=2){var d=l[1],f=l[2],u=60*parseInt(d)*60+parseInt(60*f),h=60*r.getHours()*60+60*r.getMinutes()+r.getSeconds(),m=u-h;i.push({time:c,seconds:m}),m>0&&(a===-1||m<i[a].seconds)?a=i.length-1:(o===-1||m<i[o].seconds)&&(o=i.length-1)}}return a>-1?n=i[a].seconds:o>-1&&(n=i[o].seconds,n=86400+n),t.interval=n,saveOptions(e,t),chrome.runtime.sendMessage({message:"updateTimeInterval",value:n,tabId:e.id}),t}function wfnpo(e){var t=getOptions(e),n=new Date,i=Date.parse(t.nextRefresh),a=t.isTimer?1e4:10;if(!isNaN(i)){var o=new Date(i),r=Math.round((o-n)/1e3);r>-1&&r<a?chrome.pageAction.setIcon({imageData:ORVMK(r,r>99?"8px Tahoma":"10px Courier New"),tabId:e.id}):SoWrT(t)||chrome.pageAction.setIcon({path:jVGGP.on,tabId:e.id})}}function ORVMK(e,t){var n=9,i=8,a=8,o=10,r=1,s=8;return t=t||"10px Courier New",e.toString().length>=2&&(n-=7,a+=7),e.toString().length>=4&&(a+=1,r=0),context.clearRect(0,0,canvas.width,canvas.height),context.drawImage(NciOD,0,0,canvas.width,canvas.height),context.fillStyle="#ffffff",context.fillRect(n,i,a,o),context.strokeStyle="#ff0000",context.strokeRect(n,i,a,o),context.fillStyle="black",context.font=t,context.fillText(e,n+r,i+s),context.getImageData(0,0,canvas.width,canvas.height)}function bUqst(e,t,n){var i=new Date,a=new Date(Zqakk["tab"+e.id]),o=Math.round((i-a)/1e3);(isNaN(o)||o>3)&&chrome.tabs.executeScript(e.id,{file:"scripts/content.js"},function(a){chrome.tabs.sendMessage(e.id,{action:"findText"+t,isText:n},function(n){"undefined"!=typeof n&&1==n.result&&(Zqakk["tab"+e.id]=i,chrome.notifications.create("notification-"+e.windowId+"-"+e.id,{type:"basic",title:"Easy Auto Refresh",message:'The keyword "'+t.trim()+'" was found in Tab '+(e.index+1)+".",contextMessage:e.url,eventTime:i.getTime(),iconUrl:"images/notification.png"}),audio||(audio=new Audio,audio.src="images/notification.mp3"),audio.play())})})}function XnsTj(e){var t=getOptions(e);if(1==t.refresh&&t.isNotify&&t.notifyText){var n=0,i=!1,a=t.notifyText;a.toUpperCase().indexOf("[TEXT]")>0&&(i=!0,a=a.replace(/\[TEXT\]/i,"")),matches=a.match(/(.*)\[(\d+)\]/),matches&&matches.length>=3&&(n=parseInt(matches[2]),n&&(n<0?n=0:n>9&&(n=9),a=matches[1],setTimeout(function(){bUqst(e,a,i)},1e3*n))),n||bUqst(e,a,i)}if(t.isAutoClickAfterRefresh){var o=HTwVu(e);o&&o.autoClickId&&(delete o.autoClickId,qVTaZ(e,t.autoClickId))}}function qVTaZ(e,t){var n="";n=0==t.indexOf("document.")?"var link = null; try { link = "+t.replace(/"/g,"'")+" } catch(e) {} if (link != null) { link.click(); }":"var link = null; try { link = document.querySelector('"+t.replace(/'/g,"\\'").replace(/"/g,'\\"')+"'); } catch(e) {} if (link != null) { link.click(); }",chrome.tabs.executeScript(e.id,{code:n})}function xGyPk(e){var t=e.match(/notification-(\d+)-(\d+)/);if(null!=t&&3==t.length){var n=parseInt(t[1]),i=parseInt(t[2]);chrome.windows.update(n,{focused:!0}),chrome.tabs.update(i,{highlighted:!0}),chrome.notifications.clear(e)}}function Ybmrx(e,t){if(void 0===e){var n=chrome.extension.lastError;if(n&&n.message)if(n.message.indexOf("No tab with id")!=-1){var i=n.message.match(/\d+/);i&&1==i.length&&tfDoj({id:i[0]})}else if(n.message.indexOf("Cannot access contents of the page")!=-1)return void(t&&t(!0))}t&&t()}var kycXa=new Array,mdrjm=[],Zqakk=[],canvas=document.createElement("canvas"),context=canvas.getContext("2d"),NciOD=new Image,audio=null,jVGGP={on:"images/refresh-on-38.png",off:"images/refresh-off-38.png",restart:"images/refresh-restart-38.png"};