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

 function checkAnswers (readyBtn) {

    let activeBtns = Array.from( $('.buttonClicked') );

    if( JSON.stringify(activeBtnsText) == JSON.stringify(rightAnswers) ) {
        $(readyBtn).addClass("buttonReadyCorrect");
        document.getElementById('hint').style.visibility = "hidden"; 
        hideBtns();
    } else if(activeBtns.length >= rightAnswers.length) {
        activeBtns.forEach(btn => {
            let btnIndex = rightAnswers.indexOf(btn.textContent);
            if(btnIndex == -1) {
                btn.classList.remove("buttonClicked");
                btn.classList.add("wrongBtn");

                document.getElementById('ready').classList.add("wrongBtn"); 
                document.getElementById('hint').textContent = "Вычисли x"
                document.getElementById('hint').style.visibility = "visible";

                refreshBtns();
            }
        });
    } else {
        document.getElementById('hint').textContent = "Это не все правильные ответы"
        document.getElementById('hint').style.visibility = "visible";
        document.getElementById('ready').classList.add("wrongBtn"); 
        refreshBtns();
    }
}



function hideBtns() {
    let elements = Array.from($(".container > *"));
    setTimeout( () => {
        elements.forEach ( function(element) {
            element.style.display = "none";
        } );
    }, 1500 );

}

function refreshBtns() {
    let elements = Array.from($(".middle > *"));

    setTimeout(() => {
        $('#hint').removeClass();
        $('#ready').removeClass();
        elements.forEach( (btn) => {
            $(btn).removeClass();
        })
        activeBtnsText = [];
    }, 1000);
}

$('#ready').click( function() {
    checkAnswers(this);
})


