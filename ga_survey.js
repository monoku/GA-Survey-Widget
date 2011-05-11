//Google Analytics Survey Widget
//Injects an small widget with several random an unique questions to
//an specific user. Use it to obtain more precise info about your users
//By @PixelHorror
//For Monoku Labs

function check_resources(){
    interval_id = setInterval(Main,50);
}

function stop_check(){
    clearInterval(interval_id);
}

check_resources();

function Main(){
    if (_gat) {
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

            function generate_html(index){
                var current_question = questions["q"+index];

                var question_text = document.createElement("p");
                question_text.innerHTML = current_question.question;
                var question_spot = document.getElementById('widget_question');
                var answers_spot= document.getElementById('widget_answers');

                question_spot.appendChild(question_text);

                for (var i=0; i < current_question.answers.length; i++)
                {
                    var answers_text = document.createElement("li");
                    answers_text.innerHTML = current_question.answers[i];
                    answers_spot.appendChild(answers_text);
                }
            }

        if(counter < 6) {
            generate_html(selected_question);
        }

        /*var answer_list = document.getElementById("widget_answers");*/

        //for (var i=0;i < 2 ; i++)
        //{
            //answer_list[i].addEventListener("click",push_to_analytics);
        //}

            function push_to_analytics()
            {
                _gaq.push(['_setCustomVar',
                selected_question,                   
                questions["q"+selected_question].question_short,
                this.innerHTML, 
                1  
                ]);
            }
        stop_check();
    }
}
