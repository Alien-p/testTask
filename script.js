let selectedBtnsMap = new Map();
let readyBtn = document.getElementById('ready');
let rightAnswers = ["x+5=11", "5+x=11"].sort();
let answerBtns = document.querySelectorAll('#answer');
let allBtns = Array.from(document.getElementsByTagName("button"));    

readyBtn.addEventListener("click", () => {
    checkAnswers();
});

answerBtns.forEach( (btn) => {
    btn.addEventListener("click", function () {
        this.classList.toggle("buttonClicked");
        this.disabled = true;
        enableBtns(200);
        checkBtnInList(this);
    });
});

function checkBtnInList (button) {
    let btnText = button.textContent;

    if(selectedBtnsMap.has(btnText) && selectedBtnsMap.size == 1) {
        selectedBtnsMap.clear();
        turnOffReadyBtn(true);
    } else if(selectedBtnsMap.size == 0) {
        selectedBtnsMap.set(btnText);
        turnOffReadyBtn(false);
    } else if( !selectedBtnsMap.has(btnText) && selectedBtnsMap.size >= 1) {
        selectedBtnsMap.set(btnText);
    } else {
        selectedBtnsMap.delete(btnText);
    }
}

function checkAnswers () {
    let clickedBtns = document.querySelectorAll('.buttonClicked');
    let activeBtns = Array.from( clickedBtns );
    let textOfActiveBtns = Array.from( selectedBtnsMap.keys() );
    textOfActiveBtns.sort();

    if( JSON.stringify(textOfActiveBtns) == JSON.stringify(rightAnswers) ) {
        rightAnswer();
    } else {
        wrongAnswer(activeBtns);
    }
}

function turnOffReadyBtn (switchBtn) {
    switchBtn ? readyBtn.classList.remove('buttonReadyActive') : readyBtn.classList.add('buttonReadyActive');
    readyBtn.disabled =  switchBtn;
}

function rightAnswer() {
    readyBtn.classList.add('buttonReadyCorrect');
    document.getElementById('hint').style.visibility = "hidden";
    disableBtns();
    hideBtns();
}

function wrongAnswer(activeBtns) {
    let hintBtn = document.getElementById('hint');
    let message = "Вычисли x";
    
    activeBtns.forEach( (btn) => {
        if( rightAnswers.indexOf(btn.textContent) == -1 ) {
            btn.classList.remove("buttonClicked");
            btn.classList.add("wrongAnswer");
        } else {
            message = "Это не все правильные ответы";
        }
    });

    hintBtn.textContent = message;
    disableBtns();
    enableBtns(1000);
    refreshBtns();    
}

function enableBtns(time) {
    setTimeout( () => {
        allBtns.forEach ( function(btn) {
            btn.disabled = false;
        } );
    }, time );
}

function disableBtns() {
    allBtns.forEach ( (btn) => {
        btn.disabled = true;
    });
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
    document.getElementById('hint').style.visibility = "visible";
    document.getElementById('ready').classList.add("wrongAnswer"); 

    setTimeout(() => {
        allBtns.forEach( (btn) => {
            btn.classList = '';
        });

        turnOffReadyBtn(true);
        selectedBtnsMap.clear();
    }, 1000);
}
