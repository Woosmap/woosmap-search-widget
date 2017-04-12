function EnterEventSearch(e) {
    if (e.keyCode == 13) {
        __doPostBack('<%=txtBxRecherche.UniqueID%>', "");
        e.preventDefault();
    }
}





$(document).keypress(function (e) {
   
    if (e.which == 13) {
        
        //alert('pwd = ' + $('#inputPassword').value);
        if (typeof $('#MainContent_txtEmail').value === "undefined") {
            //alert('email1 = ' + $('#MainContent_txtEmail').value);
            //document.location = '/produits_categorie.aspx?txtSearch=' + $('#ctl00$txtBxRecherche').value;
            return true;
            //  alert('email 1= ' + $('#inputEmail').value);
            e.preventDefault();
        }
        else {
            //document.location = '/produits_categorie.aspx?txtSearch=' + $('#ctl00$txtBxRecherche').value;
            //Mettre la fonction d'appel au webservice
            return;
        }

    }
});



$(document).ready(function () {
    $("#top-cart").click(function () {
        $("#top-cart").addClass("top-cart-open");
    });


    $("#btnNews").click(function () {
        document.location = 'http://www.joueclub.fr/newsletter.aspx?txtEmail=' + $("#widget-subscribe-form-email").value;
    });
});

//function getBasket() {
//    //$("#top-cart-trigger").empty();
//    NbProduit = '0';
//    montantTotal = '0';
//    lignesProduits = 'ras';
//    var options = {};
//    options.url = "/webservices/SvcConnect.asmx/GetPanier";
//    options.type = "POST";
//    options.contentType = "application/json";
//    options.dataType = "json";
//    options.success = function (data) {
//        var nbProduit = '0';
//        var lignesPanier = data.d.LesLignesPanier;
//        var nbProduit = data.d.NbProduit;
//        if (typeof nbProduit == 'undefined')
//        { NbProduit = '0 => undefined'; }

//        // var montantTotal = data.d.MontantTotal;

//        if (nbProduit != '') {
//            $("#top-cart").append("<a href=\"#\" id=\"top-cart-trigger\"><img src=\"/img/icon-panier.png\" class=\"icon-shopping-cart\" alt=\"votre panier\" /><span id=\"nbProduit\">" + nbProduit + "</span><div class=\"cart-text\">Panier</div> </a>");
//        };
//        var lignesProduits = "";
//        var montantLigne = 0;
//        if (lignesPanier != null) {
//            $.each(lignesPanier, function (index, lignePanier) {
//                var Description = lignePanier.Description;
//                var PrixAvecDevise = lignePanier.PrixUnitaireAvecDevise;
//                var Prix = lignePanier.PrixUnitaire;
//                var Quantite = lignePanier.Quantite;
//                montantLigne += Prix * Quantite;

//                var Img = lignePanier.GdeImage;
//                var urlRoute = lignePanier.UrlRoute;
//                lignesProduits += "<div class=\"top-cart-item clearfix\"><div class=\"top-cart-item-image\">" + Img + "</div>" +
//                            "<div class=\"top-cart-item-desc\"><a href=\"" + urlRoute + "\">" + Description + "</a><span class=\"top-cart-item-price\">" + Prix + "</span><span class=\"top-cart-item-quantity\">x " + Quantite + "</span></div>"
//                    + "</div>";
//            });
//            montantTotal = Math.round(montantLigne * 100) / 100;
//            //alert('lignesPanier = ' + lignesPanier.length);
//        }
//        else {
//            // alert('lignesPanier=0');
//            NbProduit = '0';
//            montantTotal = '0';
//            lignesProduits = 'ras';
//        }
//        //alert('NbProduit = ' + NbProduit + ' montantTotal = ' + montantTotal+', lignes produits : ' + lignesProduits);

//        var url = "/afficherpanier.aspx";

//        $("#top-cart").append("<div class=\"top-cart-content\"><div class=\"top-cart-title\"><h4>Votre panier</h4></div><div class=\"top-cart-items\">" + lignesProduits + "</div><div class=\"top-cart-action clearfix\"><div class=\"fleft top-checkout-price\">Montant total : " + montantTotal + "</div><br /><div  class=\"nomargin divcenter\"><div class=\"col-sm-9 divcenter\"><a href=\"/afficherpanier.aspx\" class=\"btn-panier\"> Voir le panier</a></div></div></div></div>");
//    },
//    options.error = function (jqXHR, status, err) { alert(err) };
//    $.ajax(options);
//    // alert('coucou');

//}