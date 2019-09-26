let activeBtnsText = [];

let readyBtn =  $('#ready');
let rightAnswers = ["x+5=11", "5+x=11"];
rightAnswers.sort();

$('button#answer').click( function() {
    $(this).toggleClass("buttonClicked");
    
    checkBtnInList(this);
});

// Activate-disactivate answer button
function checkBtnInList (button) {
    let btnText = button.textContent;
    let btnIndex = activeBtnsText.indexOf(btnText);
    
    if(btnIndex != -1 && activeBtnsText.length == 1) {
        activeBtnsText.splice(0, 1);
        readyBtn.toggleClass("buttonReadyActive");
        readyBtn.attr("disabled", true);
    } else if(btnIndex == -1 && activeBtnsText.length == 0) {
        activeBtnsText.push(btnText);
        readyBtn.attr("disabled", false);
        readyBtn.toggleClass("buttonReadyActive");
    } else if( btnIndex == -1 && activeBtnsText.length >= 1) {
        activeBtnsText.push(btnText);
    } else {
        activeBtnsText.splice(btnIndex, 1);
    }

    activeBtnsText.sort();
}

/**
 * Checking answers
 */

 function markAnswers (readyBtn) {
    let activeBtns = [];

    if( JSON.stringify(activeBtnsText) == JSON.stringify(rightAnswers) ) {
        $(readyBtn).addClass("buttonReadyCorrect"); 
    } else {
        activeBtns = Array.from( $('.buttonClicked') );
        
        activeBtns.forEach(btn => {
            let btnIndex = rightAnswers.indexOf(btn.textContent);
            if(btnIndex == -1) {
                btn.classList.remove("buttonClicked");
                btn.classList.add("wrongBtn");
                readyBtn.classList.add("wrongBtn"); 

                document.getElementById('hint').textContent = "Вычисли x"
                document.getElementById('hint').style.visibility = "visible";
            }
        });
    }
}

function refreshBtns() {
    setTimeout(() => {
        $('#hint').removeClass();
        $('#answer').removeClass();
        $('#ready').removeClass();
    }, 1000);
}

$('#ready').click( function() {

    markAnswers(this);

    refreshBtns();

    //  {
    //     $(this).addClass("buttonReadyWrong");

    //  } 

    // setTimeout(() => {
    //     $(this).removeClass("buttonReadyWrong");

    // }, 1000);

})


