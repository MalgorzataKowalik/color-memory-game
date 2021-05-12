let squares = [...document.querySelectorAll('div')];
const colors = ['crimson', 'crimson', 'darkmagenta', 'darkmagenta', 'orange', 'orange', 'deeppink', 'deeppink', 'chartreuse', 'chartreuse', 'cornflowerblue', 'cornflowerblue', 'cadetblue', 'cadetblue', 'olive', 'olive', 'plum', 'plum']
const allPairsNumer = colors.length/2;
let guessedPairs = 0;
const activeSquares = [];

const startTime = new Date().getTime();


function drawColors () {
    
    squares.forEach(square => {
        const colorIndex = Math.floor(Math.random()*colors.length);
        square.classList.add(colors[colorIndex]);
        colors.splice(colorIndex, 1);
    })
}
drawColors();



function showColor () {
    this.classList.remove('hidden');

    if (this == activeSquares[0]) return; //makes it impossible to select the same item again

    //actions for the first item:
    if (activeSquares.length === 0) {
        activeSquares[0] = this;
        console.log(activeSquares)
        return;
    }
    //actions for the second item:
    else {
        activeSquares[1] = this;
        console.log(activeSquares)
        squares.forEach(square => square.removeEventListener('click', showColor));
    }

    //checking result:
    setTimeout(function () {  
        if (activeSquares[0].className == activeSquares[1].className) {
            guessedPairs++;
            activeSquares.forEach(square => square.classList.add('guessed'))

            squares = squares.filter(square => !square.classList.contains('guessed'))  //removes guessed elements from squares array

            if (guessedPairs == allPairsNumer) {
                const endTime = new Date().getTime();
                alert(`Your time: ${((endTime - startTime)/1000).toFixed(2)}s`);
                location.reload();
            }
            else {
                squares.forEach(square => square.addEventListener('click', showColor))
            }
        }
            
        else {
            activeSquares.forEach(square => {
                square.classList.add('hidden');
                })
            squares.forEach(square => square.addEventListener('click', showColor));
        }
        activeSquares.length = 0;
    }, 500)
}
squares.forEach(square => {
    square.addEventListener('click', showColor)
})