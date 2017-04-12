if(document.createElement && (typeof effi_660016670_mastertag == 'undefined')) {
	var protocol = 'http'+((document.location.protocol == 'https:')?'s':'')+'://';
	var effi_660016670_idp = '';
	var effi_660016670_catid = '';
	var effi_660016670_catwording = '';
	var effi_660016670_ref = '';
        var effi_660016670_ref2 = '';
	var effi_660016670_mnt = '';
	var effi_660016670_email = '';
	var effi_660016670_insession = '';
	var effi_660016670_newcustomer = '';
	var effi_660016670_prix = '';
        var effi_660016670_storeid = '';
        var effi_660016670_q = '';
	var effi_660016670_params = new Array();
	var effi_660016670_mastertag = new Object();

	function fn_effi_660016670_parseurl(url) {
		var effi_660016670_result = new Array();
		var effi_660016670_params1 = url.split('&');
		for(var i=0; i<effi_660016670_params1.length; i++) {
			var t = effi_660016670_params1[i].split('=');
			 effi_660016670_result[t[0]] = t[1];
		}
		return  effi_660016670_result;
	}

	var effi_660016670_str_src_js = 'mastertag.effiliation.com';
	var effi_660016670_allScripts = document.getElementsByTagName('script');
	for(var i=0; i<effi_660016670_allScripts.length;i++) {
		var currentScript = effi_660016670_allScripts.item(i);
		var reg_src_js = new RegExp(effi_660016670_str_src_js,'g');
		if(currentScript.src && reg_src_js.test(currentScript.src)) {
			var param = currentScript.src.lastIndexOf('?');
			effi_660016670_params = fn_effi_660016670_parseurl(currentScript.src.substring(param+1));
			break;
		}
	}

	switch(effi_660016670_params.page) {
		case('home'):
			if(typeof effi_660016670_params.insession != 'undefined') effi_660016670_insession = effi_660016670_params.insession;
			if(typeof effi_660016670_params.newcustomer != 'undefined') effi_660016670_newcustomer = effi_660016670_params.newcustomer;
			if(typeof effi_660016670_params.storeid != 'undefined') effi_660016670_storeid = effi_660016670_params.storeid;
			break;
		
		case('search'):
                        if(typeof effi_660016670_params.insession != 'undefined') effi_660016670_insession = effi_660016670_params.insession;
                        if(typeof effi_660016670_params.newcustomer != 'undefined') effi_660016670_newcustomer = effi_660016670_params.newcustomer;
                        if(typeof effi_660016670_params.storeid != 'undefined') effi_660016670_storeid = effi_660016670_params.storeid;
                        if(typeof effi_660016670_params.q != 'undefined') effi_660016670_q = effi_660016670_params.q;
                        break;

		case('product'):
			if(typeof effi_660016670_params.idp != 'undefined') effi_660016670_idp = effi_660016670_params.idp.replace(/%2C/g, ',');
			if(typeof effi_660016670_params.idcat != 'undefined') effi_660016670_catid = effi_660016670_params.idcat;
			if(typeof effi_660016670_params.wordingcat != 'undefined') effi_660016670_catwording = effi_660016670_params.wordingcat;
			if(typeof effi_660016670_params.insession != 'undefined') effi_660016670_insession = effi_660016670_params.insession;
			if(typeof effi_660016670_params.newcustomer != 'undefined') effi_660016670_newcustomer = effi_660016670_params.newcustomer;
			if(typeof effi_660016670_params.storeid != 'undefined') effi_660016670_storeid = effi_660016670_params.storeid;
			if(typeof effi_660016670_params.prix != 'undefined') effi_660016670_prix = effi_660016670_params.prix.replace(/%2C/g, ',');
			break;

		case('category'):
			if(typeof effi_660016670_params.idcat != 'undefined') effi_660016670_catid = effi_660016670_params.idcat;
			if(typeof effi_660016670_params.wordingcat != 'undefined') effi_660016670_catwording = effi_660016670_params.wordingcat;
			if(typeof effi_660016670_params.idp != 'undefined') effi_660016670_idp = effi_660016670_params.idp.replace(/%2C/g, ',');
			if(typeof effi_660016670_params.insession != 'undefined') effi_660016670_insession = effi_660016670_params.insession;
			if(typeof effi_660016670_params.newcustomer != 'undefined') effi_660016670_newcustomer = effi_660016670_params.newcustomer;
			if(typeof effi_660016670_params.storeid != 'undefined') effi_660016670_storeid = effi_660016670_params.storeid;
			break;

		case('addcart'):
			if(typeof effi_660016670_params.idp != 'undefined') effi_660016670_idp = effi_660016670_params.idp.replace(/_/g, ',').replace(/%2C/g, ',');
			if(typeof effi_660016670_params.insession != 'undefined') effi_660016670_insession = effi_660016670_params.insession;
			if(typeof effi_660016670_params.newcustomer != 'undefined') effi_660016670_newcustomer = effi_660016670_params.newcustomer;
			if(typeof effi_660016670_params.storeid != 'undefined') effi_660016670_storeid = effi_660016670_params.storeid;
			if(typeof effi_660016670_params.prix != 'undefined') effi_660016670_prix = effi_660016670_params.prix.replace(/%2C/g, ',');
			if(typeof effi_660016670_params.montant != 'undefined') effi_660016670_mnt = effi_660016670_params.montant;
			break;

		case('sale'):
			if(typeof effi_660016670_params.idp != 'undefined') effi_660016670_idp = effi_660016670_params.idp.replace(/_/g, ',').replace(/%2C/g, ',');
			if(typeof effi_660016670_params.montant != 'undefined') effi_660016670_mnt = effi_660016670_params.montant;
			if(typeof effi_660016670_params.ref != 'undefined') effi_660016670_ref = effi_660016670_params.ref;
			if(typeof effi_660016670_params.email != 'undefined') effi_660016670_email = effi_660016670_params.email;
			if(typeof effi_660016670_params.insession != 'undefined') effi_660016670_insession = effi_660016670_params.insession;
			if(typeof effi_660016670_params.newcustomer != 'undefined') effi_660016670_newcustomer = effi_660016670_params.newcustomer;
			if(typeof effi_660016670_params.storeid != 'undefined') effi_660016670_storeid = effi_660016670_params.storeid;
			if(typeof effi_660016670_params.prix != 'undefined') effi_660016670_prix = effi_660016670_params.prix.replace(/%2C/g, ',');
			break;

		case('form'):
			if(typeof effi_660016670_params.insession != 'undefined') effi_660016670_insession = effi_660016670_params.insession;
			if(typeof effi_660016670_params.newcustomer != 'undefined') effi_660016670_newcustomer = effi_660016670_params.newcustomer;
			if(typeof effi_660016670_params.storeid != 'undefined') effi_660016670_storeid = effi_660016670_params.storeid;
			break;

		case('lead'):
			if(typeof effi_660016670_params.insession != 'undefined') effi_660016670_insession = effi_660016670_params.insession;
			if(typeof effi_660016670_params.newcustomer != 'undefined') effi_660016670_newcustomer = effi_660016670_params.newcustomer;
			if(typeof effi_660016670_params.storeid != 'undefined') effi_660016670_storeid = effi_660016670_params.storeid;
			if(typeof effi_660016670_params.ref != 'undefined') effi_660016670_ref = effi_660016670_params.ref;
			if(typeof effi_660016670_params.ref2 != 'undefined') effi_660016670_ref2 = effi_660016670_params.ref2;
			break;
		case('crm'):
                        if(typeof effi_660016670_params.insession != 'undefined') effi_660016670_insession = effi_660016670_params.insession;
                        if(typeof effi_660016670_params.newcustomer != 'undefined') effi_660016670_newcustomer = effi_660016670_params.newcustomer;
                        if(typeof effi_660016670_params.storeid != 'undefined') effi_660016670_storeid = effi_660016670_params.storeid;
                        break;
		case('generic'):
			if(typeof effi_660016670_params.insession != 'undefined') effi_660016670_insession = effi_660016670_params.insession;
			if(typeof effi_660016670_params.newcustomer != 'undefined') effi_660016670_newcustomer = effi_660016670_params.newcustomer;
			if(typeof effi_660016670_params.storeid != 'undefined') effi_660016670_storeid = effi_660016670_params.storeid;
			break;

		default :
			break;
      }

   // Tag Facebook
   !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','//connect.facebook.net/en_US/fbevents.js');
   fbq('init', '343060132737345');


    if(effi_660016670_params.page == 'home'){
         effi_660016670_engage('home');
      // Tag adikteev
      (function(){
                   try {
                           var adv_header = document.getElementsByTagName("head")[0];
                           var adv_rt_script = document.createElement("script");
                           adv_rt_script.type = "text/javascript";
                           adv_rt_script.src = protocol+"api-adserver.adikteev.com/api/track.js?tag=900";
                           adv_rt_script.id = "adikteev_tracker";
                           adv_header.appendChild(adv_rt_script);
                   } catch (e) {}
      })();

   // Tag Adverline
   var adv_script=protocol+'ads2.adverline.com/retargetproduit/partnertag/null_home.js';
   (function(){
        try {
      var adv_header = document.getElementsByTagName("head")[0];
      var adv_rt_script = document.createElement("script");
      adv_rt_script.type = "text/javascript";
      adv_rt_script.src = adv_script;
      adv_header.appendChild(adv_rt_script);
        } catch (e) {}
   })();

   // Tag bigbangdata
   window._adftrack = {
        pm: '773728',
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('Home'),
        order : { 
             sales: '',
             orderid: '',
             itms: [{ 
                 categoryname: '',
                 productname: '',
                 productid: ''
             }]
        }
    };
    (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'http'+((document.location.protocol == 'https:')?'s':'')+'://'+'track.adform.net/serving/scripts/trackpoint/async/'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();

      // Tag ClickInText
      (function(){
         try {
            var cit_header = document.getElementsByTagName("head")[0];
            var cit_script = document.createElement("script");
            cit_script.type = "text/javascript";
            cit_script.src = protocol + "apicit.net/target/";
            cit_header.appendChild(cit_script);
         } catch (e) {}
      })();
   // Tag Facebook
   fbq('track', 'PageView');

    }

    if(effi_660016670_params.page == 'search'){
         effi_660016670_engage('search');
   // Tag Facebook
   fbq('track', 'Search');

    }

    if(effi_660016670_params.page == 'generic'){
        effi_660016670_engage('generic');
	effi_660016670_launch_generic();
    }

    if(effi_660016670_params.page == 'product'){
        effi_660016670_engage('product');
      // Tag adikteev
      (function(){
                   try {
                           var adv_header = document.getElementsByTagName("head")[0];
                           var adv_rt_script = document.createElement("script");
                           adv_rt_script.type = "text/javascript";
                           adv_rt_script.src = protocol+"api-adserver.adikteev.com/api/track.js?tag=900";
                           adv_rt_script.id = "adikteev_tracker";
                           adv_header.appendChild(adv_rt_script);
                   } catch (e) {}
      })();

      // Tag Adverline
      var adv_cst_v_tag_104143_brand=effi_660016670_catid;
      var adv_cst_v_tag_104143_product=effi_660016670_idp;
      var adv_script=protocol+'ads2.adverline.com/retargetproduit/partnertag/104143_tag.js';
      (function(){
         try {
            var adv_header = document.getElementsByTagName("head")[0];
            var adv_rt_script = document.createElement("script");
            adv_rt_script.type = "text/javascript";
            adv_rt_script.src = adv_script;
            adv_header.appendChild(adv_rt_script);
         } catch (e) {}
      })();

   // Tag bigbangdata
   window._adftrack = {
        pm: '773728',
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('Home'),
        order : { 
             sales: '',
             orderid: '',
             itms: [{ 
                 categoryname: '',
                 productname: '',
                 productid: ''
             }]
        }
    };
    (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'http'+((document.location.protocol == 'https:')?'s':'')+'://'+'track.adform.net/serving/scripts/trackpoint/async/'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();

      // Tag ClickInText
      (function(){
         try {
            var cit_header = document.getElementsByTagName("head")[0];
            var cit_script = document.createElement("script");
            cit_script.type = "text/javascript";
            cit_script.src = protocol + "apicit.net/target/?idp="+effi_660016670_idp;
            cit_header.appendChild(cit_script);
         } catch (e) {}
      })();
   // Tag Facebook
   fbq('track', 'ViewContent', {
     content_ids: effi_660016670_idp,
     content_type: 'product'
   });

    }

    if(effi_660016670_params.page == 'category'){
         effi_660016670_engage('category');
      // Tag Adverline
      var adv_cst_v_listing_103271_listing_type='category';
      var adv_cst_v_listing_103271_product=effi_660016670_idp;
      var adv_script="//ads2.adverline.com/retargetproduit/partnertag/104143_listing.js";
      (function(){
                   try {
                           var adv_header = document.getElementsByTagName("head")[0];
                           var adv_rt_script = document.createElement("script");
                           adv_rt_script.type = "text/javascript";
                           adv_rt_script.src = adv_script;
                           adv_header.appendChild(adv_rt_script);
                   } catch (e) {}
      })();
   // Tag bigbangdata
   window._adftrack = {
        pm: '773728',
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('Home'),
        order : { 
             sales: '',
             orderid: '',
             itms: [{ 
                 categoryname: '',
                 productname: '',
                 productid: ''
             }]
        }
    };
    (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'http'+((document.location.protocol == 'https:')?'s':'')+'://'+'track.adform.net/serving/scripts/trackpoint/async/'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();

      // Tag ClickInText
      (function(){
         try {
            var cit_header = document.getElementsByTagName("head")[0];
            var cit_script = document.createElement("script");
            cit_script.type = "text/javascript";
            cit_script.src = protocol + "apicit.net/target/?rub="+effi_660016670_catid;
            cit_header.appendChild(cit_script);
         } catch (e) {}
      })();
   // Tag Facebook
   fbq('track', 'PageView');

    }

    if(effi_660016670_params.page == 'addcart'){
         effi_660016670_engage('addcart', effi_660016670_mnt);
      // Tag Adverline
      var adv_cst_v_cart_104143_product=effi_660016670_idp;
      var adv_script=protocol+'ads2.adverline.com/retargetproduit/partnertag/104143_cart.js';
      (function(){
                   try {
                           var adv_header = document.getElementsByTagName("head")[0];
                           var adv_rt_script = document.createElement("script");
                           adv_rt_script.type = "text/javascript";
                           adv_rt_script.src = adv_script;
                           adv_header.appendChild(adv_rt_script);
                   } catch (e) {}
      })();

   // Tag bigbangdata
   window._adftrack = {
        pm: '773728',
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('Warenkorb'),
        order : { 
             sales: effi_660016670_mnt,
             orderid: '',
             itms: [{ 
                 categoryname: '',
                 productname: '',
                 productid: effi_660016670_idp
             }]
        }
    };
    (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'http'+((document.location.protocol == 'https:')?'s':'')+'://'+'track.adform.net/serving/scripts/trackpoint/async/'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();

      // Tag ClickInText
      (function(){
         try {
            var cit_header = document.getElementsByTagName("head")[0];
            var cit_script = document.createElement("script");
            cit_script.type = "text/javascript";
            cit_script.src = protocol + "apicit.net/target/?panier=1&idp="+effi_660016670_idp;
            cit_header.appendChild(cit_script);
         } catch (e) {}
      })();
   // Tag Facebook
      var cids = "[";
      var ids_ = effi_660016670_idp;
      for(var i=0; i<ids_.split(',').length; i++) {
        if(i>0) cids+=","
        cids+="'"+ids_.split(',')[i]+"'";
      }
      cids+="]";
  
   fbq('track', 'AddToCart', {
        content_name: 'Shopping Cart',
        content_ids: cids,
        content_type: 'product'
   });

    }

    if(effi_660016670_params.page == 'sale'){
         effi_660016670_engage('sale');
      // Tag adikteev
      (function(){
                   try {
                           var adv_header = document.getElementsByTagName("head")[0];
                           var adv_rt_script = document.createElement("script");
                           adv_rt_script.type = "text/javascript";
                           adv_rt_script.src = protocol+"api-adserver.adikteev.com/api/track.js?tag=901";
                           adv_rt_script.id = "adikteev_tracker";
                           adv_header.appendChild(adv_rt_script);
                   } catch (e) {}
      })();

      // Tag Adverline
      var adv_cst_v_confirmation_104143_section='CST_ORDERID_'+effi_660016670_ref+',CST_TOTALORDER_'+effi_660016670_mnt;
      var adv_cst_v_confirmation_104143_product=effi_660016670_idp;
      var adv_cst_v_confirmation_104143_fprice='';
      var adv_script=protocol+'ads2.adverline.com/retargetproduit/partnertag/104143_confirmation.js';
      (function(){
                   try {
                           var adv_header = document.getElementsByTagName("head")[0];
                           var adv_rt_script = document.createElement("script");
                           adv_rt_script.type = "text/javascript";
                           adv_rt_script.src = adv_script;
                           adv_header.appendChild(adv_rt_script);
                   } catch (e) {}
      })();

   // Tag bigbangdata
window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ? [window._adftrack] : []);
    window._adftrack.push({
        pm: '773728',
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('Thank_You'),
        order : { 
              sales: effi_660016670_mnt,
              orderid: effi_660016670_ref,
              itms: [{ 
                 categoryname: '',
                 productname: ''
              }]
        }
    });
    (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://track.adform.net/serving/scripts/trackpoint/async/'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();

      // Tag ClickInText
      (function(){
         try {
            var cit_header = document.getElementsByTagName("head")[0];
            var cit_script = document.createElement("script");
            cit_script.type = "text/javascript";
            cit_script.src = protocol + "apicit.net/target/?paiement=1"+(effi_660016670_idp!=""?("&idp="+effi_660016670_idp):"");
            cit_header.appendChild(cit_script);
         } catch (e) {}
      })();
   // Tag Facebook
   var cids = "[";
      var ids_ = effi_660016670_idp;
      for(var i=0; i<ids_.split(',').length; i++) {
        if(i>0) cids+=","
        cids+="'"+ids_.split(',')[i]+"'";
      }
      cids+="]";

   fbq('track', 'Purchase', {
     content_ids: cids,
     content_type: 'product',
     value: effi_660016670_mnt,
     currency: 'EUR'
   });

    }

    if(effi_660016670_params.page == 'form'){
        effi_660016670_engage('form');
	effi_660016670_launch_form();
    }

    if(effi_660016670_params.page == 'lead'){
        effi_660016670_engage('lead');
	effi_660016670_launch_lead(effi_660016670_ref);
    }

    if(effi_660016670_params.page == 'crm'){
        effi_660016670_engage('crm');
   // Tag Facebook
   fbq('track', 'PageView');

    }

    // End MasterTag Effiliation
}


function effi_660016670_launch_generic() {
      // Tag adikteev
      (function(){
                   try {
                           var adv_header = document.getElementsByTagName("head")[0];
                           var adv_rt_script = document.createElement("script");
                           adv_rt_script.type = "text/javascript";
                           adv_rt_script.src = protocol+"api-adserver.adikteev.com/api/track.js?tag=900";
                           adv_rt_script.id = "adikteev_tracker";
                           adv_header.appendChild(adv_rt_script);
                   } catch (e) {}
      })();
      // Tag ClickInText
      (function(){
         try {
            var cit_header = document.getElementsByTagName("head")[0];
            var cit_script = document.createElement("script");
            cit_script.type = "text/javascript";
            cit_script.src = protocol + "apicit.net/target/";
            cit_header.appendChild(cit_script);
         } catch (e) {}
      })();
   // Tag Facebook
   fbq('track', 'PageView');

}
function effi_660016670_launch_form() {
  // Tag Adverline
var adv_cst_v_tag_104143_brand='';
var adv_cst_v_tag_104143_product='';
var adv_script='http'+((document.location.protocol == 'https:') ? 's' : '')
+'://ads2.adverline.com/retargetproduit/partnertag/104143_tag.js';
 (function(){
try{
var adv_header = document.getElementsByTagName("head")[0];
var adv_rt_script = document.createElement("script");
adv_rt_script.type="text/javascript";
adv_rt_script.src= adv_script;
adv_header.appendChild(adv_rt_script);
} catch (e) {}
  })();

   // Tag Facebook
   fbq('track', 'Lead');

}
function effi_660016670_launch_lead(ref) {
// Tag adverline
var adv_cst_v_confirmation_104143_section='';
var adv_cst_v_confirmation_104143_product='';
var adv_script='http'+((document.location.protocol == 'https:') ? 's' : '')
+'://ads2.adverline.com/retargetproduit/partnertag/104143_confirmation.js';
 (function(){
try{
var adv_header = document.getElementsByTagName("head")[0];
var adv_rt_script = document.createElement("script");
adv_rt_script.type="text/javascript";
adv_rt_script.src= adv_script;
adv_header.appendChild(adv_rt_script);
} catch (e) {}
  })();

   // Tag Bigbangdata
   window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ? [window._adftrack] : []);
   window._adftrack.push({
        pm: '773728',
        divider: encodeURIComponent('|'),
        pagename: encodeURIComponent('Lead')
   });
   (function () { var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://track.adform.net/serving/scripts/trackpoint/async/'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); })();

   // Tag Facebook
   fbq('track', 'CompleteRegistration');

}

function effi_660016670_engage(_page, _mnt) {
	if(_page) {
		if(_page == 'home' || _page == 'search' || _page == 'product' || _page == 'category' || _page == 'addcart' || _page == 'sale' || _page == 'form' || _page == 'lead' || _page == 'crm' || _page == 'generic') {
			if(_mnt === undefined) {
				_mnt = '';
			}
			var _effi_ws_engage = document.createElement('script');
	        	_effi_ws_engage.type = 'text/javascript';
		        _effi_ws_engage.async = true;
        		_effi_ws_engage.src = ('http'+((document.location.protocol == 'https:')?'s':'')+'://') + 'track.effiliation.com/660016670/'+_page+'/engage.js';
	        	var s = document.getElementsByTagName('script')[0]||document.getElementsByTagName('body')[0];
	        	s.parentNode.insertBefore(_effi_ws_engage, s);
		        if(_page == 'sale') {
        		      var _effi_ws_basket = document.createElement('script');
		              _effi_ws_basket.type = 'text/javascript';
        		      _effi_ws_basket.async = true;
	        	      _effi_ws_basket.src = protocol + 'track.effiliation.com/660016670/0/basket.js';
	        	      s.parentNode.insertBefore(_effi_ws_basket, s);
		        } else {
        		      if(_mnt != '') {
                		    var _effi_ws_basket = document.createElement('script');
		                    _effi_ws_basket.type = 'text/javascript';
        		            _effi_ws_basket.async = true;
	                	    _effi_ws_basket.src = protocol + 'track.effiliation.com/660016670/'+_mnt+'/basket.js';
	               		    s.parentNode.insertBefore(_effi_ws_basket, s);
        		      }
	        	}
		}
	}

}


// adikteev : 900 : 901
// adverline : 104143 : null
// bigbangdata : 773728
// clickintext
// fbdynamicproductads : 343060132737345 : EUR
