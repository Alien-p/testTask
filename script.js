let map = new Map();

let readyBtn =  $('#ready');
let rightAnswers = ["x+5=11", "5+x=11"].sort();

$('button#answer').click( function() {
    $(this).toggleClass("buttonClicked");
    
    checkBtnInList(this);
});

function checkBtnInList (button) {
    let btnText = button.textContent;

    if(map.has(btnText) && map.size == 1) {
        map.clear();
        turnOffReadyBtn(true);
    } else if(map.size == 0) {
        map.set(btnText);
        turnOffReadyBtn(false);
    } else if( !map.has(btnText) && map.size >= 1) {
        map.set(btnText);
    } else {
        map.delete(btnText);
    }
}

/**
 * Checking answers
 */

$('#ready').click( function() {
    checkAnswers(this);
})

function checkAnswers (readyBtn) {
    //Get all selected buttons
    let activeBtns = Array.from( $('.buttonClicked') );
    let textOfActiveBtns = Array.from( map.keys() );
    textOfActiveBtns.sort();

    //Compare answers
    if( JSON.stringify(textOfActiveBtns) == JSON.stringify(rightAnswers) ) {
        $(readyBtn).addClass("buttonReadyCorrect");
        document.getElementById('hint').style.visibility = "hidden"; 
        hideBtns();
    } else if(activeBtns.length >= rightAnswers.length) {
        activeBtns.forEach(btn => {
            let btnIndex = rightAnswers.indexOf(btn.textContent);
            if(btnIndex == -1) {
                btn.classList.remove("buttonClicked");
                btn.classList.add("wrongBtn");

                wrongAnswer("Вычисли x");
            }
        });
    } else {
        wrongAnswer("Это не все правильные ответы");
        refreshBtns();
    }
}

function turnOffReadyBtn (switchBtn) {
    readyBtn.toggleClass("buttonReadyActive");
    readyBtn.attr("disabled", switchBtn);
}

function wrongAnswer(message) {
    document.getElementById('ready').classList.add("wrongBtn"); 
    document.getElementById('hint').textContent = message;
    document.getElementById('hint').style.visibility = "visible";
    turnOffReadyBtn(true);

    refreshBtns();    
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

        map.clear();
    }, 1000);
}
