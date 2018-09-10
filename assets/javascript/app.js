var panel = $('#quiz-area');
var countStartNumber = 30;


/// CLICK EVENTS ///

$(document).on('click', '#start-over', function(e) {
    game.reset();
});

$(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
});

$(document).on('click', '#start', function(e) {
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestion();
});

/// QUESTIONS ///

var questions = [{
    question: "The Powerpuff Girls are made up of Sugar, Spice & Everything Nice",
    answers: ["True", "False"],
    correctAnswer: "True",
    image: "assets/images/girls.gif"
}, {
    question: "What is the name of the pink Powerpuff Girl?",
    answers: ["Beauty", "Sugar", "Blossom", "Beatrice"],
    correctAnswer: "Blossom",
    image: "assets/images/blossom.gif"
}, {
    question: "What is the name of the blue Powerpuff Girl?",
    answers: ["Bubbles", "Bethany", "Sweetheart", "Cupcake"],
    correctAnswer: "Bubbles",
    image: "assets/images/bubbles.gif"
}, {
    question: "What is the name of the green Powerpuff Girl?",
    answers: ["Bonnie", "Sour", "Candy", "Buttercup"],
    correctAnswer: "Buttercup",
    image: "assets/images/buttercup.gif"
}, {
    question: "Who created the Powerpuff Girls?",
    answers: ["Mayor", "Professor", "Him", "Unknown"],
    correctAnswer: "Professor",
    image: "assets/images/professor.gif"
}, {
    question: "What was accidentally poured into the mixture to create the Powerpuff Girls?",
    answers: ["Rat poison", "Mercury", "Plutonium", "Chemical X"],
    correctAnswer: "Chemical X",
    image: "assets/images/chemicalx.gif"
}, {
    question: "What city do the Powerpuff Girls fight crime in?",
    answers: ["Toonsville", "Cosmos", "Townsville", "Metropolis"],
    correctAnswer: "Townsville",
    image: "assets/images/townsville.gif"
}, {
    question: "Who is the Powerpuff Girls' number one enemy?",
    answers: ["Mojo Jojo", "Gang Green Gang", "Rowdyruff Boys", "Fuzzy Lumpkins"],
    correctAnswer: "Mojo Jojo",
    image: "assets/images/mojojojo.gif"
}];

///GAME FUNCTIONS///

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,
    countdown: function() {
        game.counter--;
        $('#counter-number').html(game.counter);

        if (game.counter === 0) {
            console.log('TIME UP');
            game.timeUp();
        }
    },
    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++){
            panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
        }
    },
    nextQuestion: function() {
        game.counter = countStartNumber;
        $('#counter-number').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function() {
        clearInterval(timer);
        $('#counter-number').html(game.counter);

        panel.html('<h2>Out of Time!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
        panel.append('<img src="' + questions[this.currentQuestion].image + '"/>');

        if (game.currentQuestion === questions.length - 1) {
            setTiemout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function() {
        clearInterval(timer);

        panel.html('<h2>Complete! Here are your scores!</h2>');
        $('#counter-number').html(game.counter);
        panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
        panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
        panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
        panel.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function(e) {
        clearInterval(timer);

        if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },
    answeredIncorrectly: function () {
        game.incorrect++;
        clearInterval(timer);
        panel.html('<h2>Nope!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer + '</h3>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1){
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredCorrectly: function(){
        clearInterval(timer);
        game.correct++;
        panel.html('<h2>Correct!</h2>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function() {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};
