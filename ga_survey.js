//Test Widget
//Injects an small widget with several random an unique questions to
//an specific user.
//By @PixelHorror
//For Monoku Labs

//Main Questions Array
var questions = {
    q1: "Pregunta #1", q2: "Pregunta #2", q3: "Pregunta #3", 
    q4: "Pregunta #4", q5: "Pregunta #5"
};

$$('#widget_answers ul li').addEvent('click', function() {
   console.log('cliked'); 
});

