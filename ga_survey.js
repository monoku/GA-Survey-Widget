//Google Analytics Survey Widget
//Injects an small widget with several random an unique questions to
//an specific user. Use it to obtain more precise info about your users
//By @PixelHorror
//For Monoku Labs


window.addEvent('load', function(){
    //Main Questions Array
    var questions = {
        q1: {question:"Cual es tu color favorito?",question_short:"Color",answers:["rojo","verde","azul"]},
        q2: {question:"Cual es Genero?",question_short:"genero",answers:["Masculino","Femenino"]},
        q3: {question:"Cual sabor de helado favorito?",question_short:"sabores",answers:["Fresa","Vainilla","Mora","Atun"]}
    };
    //Common Variables
    var counter = 1;
    var selected_question;
    var is_found = false;

    while(!is_found && counter < 6)
    {
        var pageTracker = _gat._getTrackerByName();
        var customVar = pageTracker._getVisitorCustomVar(counter);
        if (typeof(customVar) === "undefined")
        {
            selected_question = counter;
            is_found = true;
        }
        counter++;
    }

    if(counter === 6) {
        function generate_html(index){
            var current_question = questions["q"+index];

            new Element('p',{html:current_question.question}).inject($('widget_question'));
            for (var i=0; i < current_question.answers.length; i++)
                new Element('li',{html:current_question.answers[i]}).inject($('widget_answers'));
        }
    }

    generate_html(selected_question);

    $$('#widget_answers li').addEvent('click', function() {

        _gaq.push(['_setCustomVar',
            selected_question,                   
            questions["q"+selected_question].question_short,
            this.innerHTML, 
            1  
            ]);
    });
});
