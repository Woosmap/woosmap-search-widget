(function(){var DomReady={};var userAgent=navigator.userAgent.toLowerCase();var browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:(/msie/.test(userAgent))&&(!/opera/.test(userAgent)),mozilla:(/mozilla/.test(userAgent))&&(!/(compatible|webkit)/.test(userAgent))};var readyBound=false;var isReady=false;var readyList=[];function domReady(){if(!isReady){isReady=true;if(readyList){for(var fn=0;fn<readyList.length;fn++){readyList[fn].call(window,[]);}
readyList=[];}}};function addLoadEvent(func){var oldonload=window.onload;if(typeof window.onload!='function'){window.onload=func;}else{window.onload=function(){if(oldonload){oldonload();}
func();}}};function bindReady(){if(readyBound){return;}
readyBound=true;if(document.addEventListener&&!browser.opera){document.addEventListener("DOMContentLoaded",domReady,false);}
if(browser.msie&&window==top)(function(){if(isReady)return;try{document.documentElement.doScroll("left");}catch(error){setTimeout(arguments.callee,0);return;}
domReady();})();if(browser.opera){document.addEventListener("DOMContentLoaded",function(){if(isReady)return;for(var i=0;i<document.styleSheets.length;i++)
if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return;}
domReady();},false);}
if(browser.safari){var numStyles;(function(){if(isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return;}
if(numStyles===undefined){var links=document.getElementsByTagName("link");for(var i=0;i<links.length;i++){if(links[i].getAttribute('rel')=='stylesheet'){numStyles++;}}
var styles=document.getElementsByTagName("style");numStyles+=styles.length;}
if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return;}
domReady();})();}
addLoadEvent(domReady);};DomReady.ready=function(fn,args){bindReady();if(isReady){fn.call(window,[]);}else{readyList.push(function(){return fn.call(window,[]);});}};bindReady();if(typeof window.APICITRETARGETSN=='undefined')
window.APICITRETARGETSN=0;document.apicitFromTimeout=false;document.ApicitLoaded=false;var execApicit=function(){if(document.ApicitLoaded)return;document.ApicitLoaded=true;var e;try{var ss='://apicit.net/target/';var sx='://apicit.net/target/ping';var s=document.getElementsByTagName('script');var b;var apicitsrc='';var f=0;for(var a=0;a<s.length;a++)
{var p=s[a].src;if(p&&p.indexOf('mastertag.effiliation.com')>0)
{apicitsrc='1';break;}
else if(p&&p.indexOf('retargeting.veoxa.com')>0)
{apicitsrc='2';break;}
else if(p&&p.indexOf('img.metaffiliation.com')>0)
{apicitsrc='3';break;}
else if(p&&p.indexOf('img.netaffiliation.com')>0)
{apicitsrc='3';break;}}
for(var a=0;a<s.length;a++)
{var p=s[a].src;if(p&&(p.indexOf(ss)>0)&&(p.indexOf(sx)==-1))
{if(f<window.APICITRETARGETSN)
{f++;continue;}
window.APICITRETARGETSN++;var i=p.indexOf('?');if(i>-1)p=p.substr(i+1)+'&';else
{var i=p.indexOf('&');if(i>-1)p=p.substr(i+1)+'&';else p='';}
var s=document.createElement('script');s.type='text/javascript';var ref=(window!=window.top)?document.referrer:document.location.href;var ref2=(window!=window.top)?document.location.href:'';s.src=document.location.protocol+'//apicit.net/target/ping.php?'+p+'ref='+escape(ref)+(ref2?'&trueref='+escape(ref2):'')+'&apicitsrc='+apicitsrc+'&fromtimeout='+(document.apicitFromTimeout?1:0);var b=document.getElementsByTagName('body')[0];if(b.firstChild!=null)b.insertBefore(s,b.firstChild);else b.appendChild(s);return true;}}
return false;}catch(e){};};DomReady.ready(function(){execApicit();});var tw=4000;var nowait={'empty':1,'www.piecesetpneus.com':1,'www.aubert.com':1,'www.carrefour.fr':1,'www.ecotour.com':1,'www.voyance-web.fr':1,'modz.fr':1,'m.brandalley.fr':1,'alltricks.fr':1,'www.reserverunessai.com':1,'be.amoureux.com':1,'uxanalytics.content-square.fr':1,'valthorens.freegun.com':1,'android.brandalley.fr':1,'alltricks.es':1,'sauramps.com':1,'www.tvfestival.com':1,'retargeting.veoxa.com':1,'www.itopsport.it':1,'telephone.ecotour.com':1,'w3.ecotour.com':1,'m.ecotour.com':1};if(typeof nowait[window.location.host]!='undefined')tw=1;setTimeout(function(){document.apicitFromTimeout=true;execApicit();},tw);})();