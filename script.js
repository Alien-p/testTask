let activeBtns = [];
let readyBtn =  $('#ready');

$('button#answer').click( function() {
    $(this).toggleClass("buttonClicked");

    checkBtnInList(this.textContent);
});

// Activate-disactivate answer button
function checkBtnInList (btn) {
    let btnIndex = activeBtns.indexOf(btn);
    
    if(btnIndex != -1 && activeBtns.length == 1) {
        activeBtns.splice(0, 1);
        readyBtn.toggleClass("buttonReadyActive");
        readyBtn.attr("disabled", true);
    } else if(btnIndex == -1 && activeBtns.length == 0) {
        activeBtns.push(btn);
        readyBtn.toggleClass("buttonReadyActive");
        readyBtn.attr("disabled", false);
    } else if( btnIndex == -1 && activeBtns.length >= 1) {
        activeBtns.push(btn);
    } else {
        activeBtns.splice(btnIndex, 1);
    }
}

/**
 * Checking answers
 */

$('#ready').click( function() {
    
})


