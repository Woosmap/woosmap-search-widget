tc_privacy_used = typeof tc_privacy_used != 'undefined' ? tc_privacy_used : 0;if(tc_privacy_used=='0'){/*										    
 * tagContainer Privacy v2.5						
 * Copyright Tag Commander						
 * http://www.tagcommander.com/					
 * Generated: 30/09/2016 16:39:54             
 * ---                                         	
 * Version   : 021                   	
 * IDP       : 5                   	
 * IDS       : 889              	
 */

tC.privacyVersion='021';
/*!compressed by YUI*/ try{tC.privacy.document=top.document}catch(e){tC.privacy.document=document}(function(q,b){var x=b.getCookie(b.privacy.getCN()),r=x.split("@@@"),l="",a=5,g="021",n=q.getElementById("tc_div_preview"),f=n?n:q.body;if(r.length<=2||(l!=""&&r[1]!=l)){}else{return}var m='En poursuivant votre navigation sur ce site, vous acceptez l\'utilisation de cookies pour améliorer la qualité de votre visite, vous proposer des services et offres adaptés ainsi que des options de partage social. <a href="/charte-cookies.html">Pour en savoir plus et paramétrer votre choix</a>',i="#332424",u="#dbdbdb",t="OK",c="#3b9bce",w="#ffffff",p="optin",o=q.createElement("div"),s=q.createElement("div"),d=q.createElement("button");dom_container_button=q.createElement("div");dom_container_text=q.createElement("div");dom_style=q.createElement("style");o.id="tc_privacy";dom_container_button.id="tc_privacy_container_button";dom_container_text.id="tc_privacy_container_text";d.id="tc_privacy_button";s.id="tc_privacy_text";function v(){var y=q.getElementById("tc_privacy");f.removeChild(y)}function j(){if(p=="optout"){b.privacy.Out(a,g,"ALL")}else{b.privacy.In(a,g,"ALL")}v()}b(o).resetCss().css({width:"100%",background:u,position:n?"absolute":"fixed",zIndex:n?"1":"999999",bottom:"0",left:"0",textAlign:"left",opacity:0.9});b(dom_container_button).resetCss().css({right:"10px",display:"inline-block"});b(d).resetCss().css({color:w,background:c,display:"block",cursor:"pointer",fontSize:"12px",padding:"5px 10px",margin:"10px 0"});b(dom_container_text).resetCss().css({display:"inline-block"});b(s).resetCss().css({color:i,padding:"10px 10px 10px 10px",fontSize:"12px",textAlign:"left"});s.innerHTML=m;d.innerHTML=t;if(d.addEventListener){d.addEventListener("click",function(y){j()},true)}else{if(d.attachEvent){d.attachEvent("onclick",function(y){j()})}}dom_container_button.appendChild(d);dom_container_text.appendChild(s);o.appendChild(dom_container_text);o.appendChild(dom_container_button);f.appendChild(o);dom_style.type="text/css";var k="#tc_privacy_container_text{width:79%;display:inline-block;}#tc_privacy_container_button,#tc_privacy_container_text{vertical-align:middle;}#tc_privacy_container_button{width:19%;display:inline-block;}#tc_privacy_button{float: right;}@media(min-width: 768px) and (max-width: 979px){#tc_privacy_container_text{width:69%;}#tc_privacy_container_button{width:29%;}}@media(max-width: 767px)   {#tc_privacy_container_text{width:100%;}#tc_privacy_container_button{width:100%;}#tc_privacy_button{margin:0 0 0 0;float: none;width:100%;}}";if(dom_style.styleSheet){dom_style.styleSheet.cssText=k}else{dom_style.appendChild(q.createTextNode(k))}var h=q.getElementsByTagName("head")[0];h.appendChild(dom_style);b.privacy.hitCounter(5)})(tC.privacy.document,tC);tc_privacy_used=1;}