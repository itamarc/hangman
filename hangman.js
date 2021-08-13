parts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
nextpart = 0;
word = '';
lettersnotfound = [];

function show(part) {
    document.getElementById(part).style.strokeOpacity = 1;
}

function hide(part) {
    document.getElementById(part).style.strokeOpacity = 0;
}

// Only for test
function reverse(part) {
    // Opacity 1 is visible, 0 is hidden
    if (document.getElementById(part).style.opacity == 1) {
        hide(part);
    } else {
        show(part);
    }
}

function showNextPart() {
    lost = true;
    show(parts[nextpart]);
    nextpart++;
    if (nextpart == parts.length) {
        youHaveLost();
        lost = false;
    }
    return lost;
}

function youHaveLost() {
    document.getElementById('letters').innerHTML = '<h3>You have lost!</h3>';
    console.log("lost");
    for (let i = 0; i < word.length; i++) {
        if (document.getElementById('wordframe').children[i].innerHTML == '&nbsp;') {
            document.getElementById('wordframe').children[i].innerHTML = word[i];
            document.getElementById('wordframe').children[i].style.color = 'red';
        }
    }
    resetStart();
}

function start() {
    word = document.getElementById('word').value.toUpperCase();
    document.getElementById('word').value = '';

    document.getElementById('letter').hidden = false;
    document.getElementById('word').hidden = true;

    document.getElementById('startbtn').hidden = true;
    document.getElementById('guessbtn').hidden = false;

    for (let i = 0; i < parts.length; i++) {
        hide(parts[i]);
    }
    nextpart = 0;
    lettersnotfound = [];

    createWordFrame();
    rebuildLettersNotFound();
    document.getElementById('letter').select();
}

function resetStart() {
    document.getElementById('letter').hidden = true;
    document.getElementById('word').hidden = false;

    document.getElementById('startbtn').hidden = false;
    document.getElementById('guessbtn').hidden = true;

    document.getElementById('word').select();
}

function createWordFrame() {
    colsTmpl = '';
    document.getElementById('wordframe').innerHTML = '';
    for (let i = 0; i < word.length; i++) {
        colsTmpl += '1fr ';
        document.getElementById('wordframe').innerHTML += '<div class="wordcol">&nbsp;</div>';

    }
    document.getElementById('wordframe').style.gridTemplateColumns = colsTmpl;
}

function guess() {
    let letter = document.getElementById('letter').value.toUpperCase();
    document.getElementById('letter').value = '';
    document.getElementById('letter').select();
    let found = false;
    for (let i = 0; i < word.length; i++) {
        if (word[i] == letter) {
            found = true;
            document.getElementById('wordframe').children[i].innerHTML = letter;
        }
    }
    if (found) {
        checkIfWon();
    } else {
        if (showNextPart()) {
            addLetterNotFound(letter);
        }
    }
}

function checkIfWon() {
    won = true;
    for (let i = 0; i < word.length; i++) {
        if (document.getElementById('wordframe').children[i].innerHTML == '&nbsp;') {
            won = false;
        }
    }
    if (won) {
        youHaveWon();
    }
}

function youHaveWon() {
    document.getElementById('letters').innerHTML = '<h3>You have WON!</h3>';
    document.getElementById('letters').children[0].style.color = 'green';
    resetStart();
}

function addLetterNotFound(letter) {
    lettersnotfound.push(letter);
    rebuildLettersNotFound();
}

function rebuildLettersNotFound() {
    lnfdiv = '<h2>Letters Not In The Word</h2>';
    for (let i = 0; i < lettersnotfound.length; i++) {
        const letr = lettersnotfound[i];
        lnfdiv += '<div class="letternotfound">' + letr + '</div>';
    }
    document.getElementById('letters').innerHTML = lnfdiv;
}
