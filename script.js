let selectedBtns = new Map();

let readyBtn =  $('#ready');
let rightAnswers = ["x+5=11", "5+x=11"].sort();

$('button#answer').click( function() {
    $(this).toggleClass("buttonClicked");
    
    checkBtnInList(this);
});

function checkBtnInList (button) {
    let btnText = button.textContent;

    if(selectedBtns.has(btnText) && selectedBtns.size == 1) {
        selectedBtns.clear();
        turnOffReadyBtn(true);
    } else if(selectedBtns.size == 0) {
        selectedBtns.set(btnText);
        turnOffReadyBtn(false);
    } else if( !selectedBtns.has(btnText) && selectedBtns.size >= 1) {
        selectedBtns.set(btnText);
    } else {
        selectedBtns.delete(btnText);
    }
}

/**
 * Checking answers
 */

$('#ready').click( function() {
    checkAnswers();
})

function checkAnswers () {
    //Get all selected buttons
    let activeBtns = Array.from( $('.buttonClicked') );
    let textOfActiveBtns = Array.from( selectedBtns.keys() );
    textOfActiveBtns.sort();

    //Compare answers
    if( JSON.stringify(textOfActiveBtns) == JSON.stringify(rightAnswers) ) {
        $(readyBtn).addClass("buttonReadyCorrect");
        document.getElementById('hint').style.visibility = "hidden"; 
        hideBtns();
    } else {
        wrongAnswer();
    }
}

// function checkAnswers (readyBtn) {
//     //Get all selected buttons
//     let activeBtns = Array.from( $('.buttonClicked') );
//     let textOfActiveBtns = Array.from( map.keys() );
//     textOfActiveBtns.sort();

//     //Compare answers
//     if( JSON.stringify(textOfActiveBtns) == JSON.stringify(rightAnswers) ) {
//         $(readyBtn).addClass("buttonReadyCorrect");
//         document.getElementById('hint').style.visibility = "hidden"; 
//         hideBtns();
//     } else if(activeBtns.length >= rightAnswers.length) {
//         activeBtns.forEach(btn => {
//             let btnIndex = rightAnswers.indexOf(btn.textContent);
//             if(btnIndex == -1) {
//                 btn.classList.remove("buttonClicked");
//                 btn.classList.add("wrongBtn");

//                 wrongAnswer("Вычисли x");
//             }
//         });
//     } else {
//         wrongAnswer("Это не все правильные ответы");
//     }
// }

function turnOffReadyBtn (switchBtn) {
    switchBtn ? readyBtn.removeClass("buttonReadyActive") : readyBtn.addClass("buttonReadyActive")
    readyBtn.attr("disabled", switchBtn);
}

function wrongAnswer() {
    // document.getElementById('hint').textContent = message;
    
    if(selectedBtns.size < rightAnswers.length) {
        document.querySelectorAll('.buttonClicked').forEach( (btn) => {
            rightAnswers.indexOf(btn.textContent)
        })
    } else {

    }

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
    document.getElementById('hint').style.visibility = "visible";
    document.getElementById('ready').classList.add("wrongAnswer"); 

    setTimeout(() => {
        $('#hint').removeClass();
        $('#ready').removeClass();

        elements.forEach( (btn) => {
            $(btn).removeClass();
        });

        turnOffReadyBtn(true);
        selectedBtns.clear();
    }, 1000);
}
