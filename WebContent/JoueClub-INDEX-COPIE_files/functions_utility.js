

var newWin = null;

function closeWin() {
    if (newWin != null) {
        if (!newWin.closed)
            newWin.close();
    }
}
function popUp(strURL, strType, strHeight, strWidth) {
    closeWin();
    var strOptions = "";
    if (strType == "console") strOptions = "resizable,height=" + strHeight + ",width=" + strWidth;
    if (strType == "popup") strOptions = "resizable,scrollbars,height=" + strHeight + ",width=" + strWidth;
    if (strType == "fixed") strOptions = "status,height=" + strHeight + ",width=" + strWidth;
    if (strType == "elastic") strOptions = "toolbar,menubar,scrollbars,resizable,location,height=" + strHeight + ",width=" + strWidth;
    newWin = window.open(strURL, 'newWin', strOptions);
    newWin.focus();
}