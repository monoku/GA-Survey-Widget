//Google Analytics Survey Widget v.1.1.0
//Injects an small widget with several random an unique questions to
//an specific user. Use it to obtain more precise info about your users
//visit: https://github.com/PixelHorror/GA-Survey-Widget for more info, fixes and detailed use
//Copyright (c) 2011 Jeronimo Osorio (@PixelHorror) for Monoku (www.monoku.com)
//Licensed under the MIT license. http://www.opensource.org/licenses/mit-license.php


(function() {
    //We set an interval for checking external resources
    function checkResources(){
        intervalId = setInterval(Main,300);
    }

    //Stops the upper function
    function stopCheck(){
        clearInterval(intervalId);
    }

    checkResources();

    //Main widget function 
    function Main(){

        var questionCounter = 1;
        var selectedQuestion;
        var isFound = false;

        //We check if the gat object has loaded, this comes from the Analytics debug.
        if (_gat) {
            //Main Questions Array
            var questions = {
                q1: {question:"Cual es tu color favorito?",question_short:"Color",answers:["rojo","verde","azul"]},
                q2: {question:"Cual es Genero?",question_short:"genero",answers:["Masculino","Femenino"]},
                q3: {question:"Cual sabor de helado favorito?",question_short:"sabores",answers:["Fresa","Vainilla","Mora","Atun"]},
                q4: {question:"Cual es tu musica favorita?",question_short:"musica",answers:["Rock","Salsa","Electro","Atun"]},
                q5: {question:"Cual es tu nacionalidad?",question_short:"nacionalidad",answers:["Colombiano","Europeo","Japones","Atun"]}
            };

            //If we haven't found the question and we're under the 5 limit questions
            while(!isFound && questionCounter < 6)
            {
                var pageTracker = _gat._getTrackerByName();
                var customVar = pageTracker._getVisitorCustomVar(questionCounter);
                //The custom var hasn't been set, so we asign it as an active question
                if (typeof(customVar) === "undefined")
                {
                    selectedQuestion = questionCounter;
                    isFound = true;
                }
                questionCounter++;
            }
			
			//Generates the html of the widget
            //@params recieves an integer which indicates the index of the chosen question
            function generateHTML(index){
                var currentQuestion = questions["q"+index];

                var questionText = document.createElement("p");
                questionText.innerHTML = currentQuestion.question;
                var questionSpot = document.getElementById('widget_question');
                var answersSpot= document.getElementById('widget_answers');

                questionSpot.appendChild(questionText);

                for (var i=0; i < currentQuestion.answers.length; i++)
                {
                    var answersText = document.createElement("li");
                    answersText.innerHTML = currentQuestion.answers[i];
                    answersSpot.appendChild(answersText);
                }
            }
			
			//injects the structure of the widget, so it can be styled
            function injectMarkup(){
                var parent_div   = document.createElement("div");
                var question_div = document.createElement("div");  
                var answers_ul = document.createElement("ul");  
                var info_div = document.createElement("div");  
                var detail_div = document.createElement("div");  
                var close_p = document.createElement("p");  

                close_p.id = "widget_kill";
                parent_div.id = "widget_container";
                question_div.id = "widget_question";
                answers_ul.id = "widget_answers";
                info_div.id = "widget_info";
                close_p.innerHTML = "x";
                detail_div.id = "widget_info_detail";
                info_div.innerHTML = "Info";
                detail_div.innerHTML = "La informaci&oacute;n suministrada es an&oacute;nima y sera utilizada solo con fines estad&iacute;sticos. Este no es un banner.";

                var testElements = [close_p, question_div, answers_ul, info_div];
				
				for (var i=0; i < testElements.length; i++) {
					parent_div.appendChild(testElements[i]);
				}
			
				info_div.appendChild(detail_div);
				
                var element = document.getElementsByTagName("body")[0];
                element.appendChild(parent_div);
            }

      
            //Shows the hidden info in the widget
            function showElement() {
                var element = document.getElementById("widget_info_detail");
                element.style.display = "block";
            }
            
            //Hides the widget
            function killWidget() {
                var element = document.getElementById("widget_container");
                element.style.display = "none";
            }

            //Generates an small thanks message
            function showThanksMessage(){
                var thanks_message = document.createElement("p");  
                var killTimer = window.setTimeout(killWidget, 2000);
                thanks_message.id = "widget_thanks";
                thanks_message.innerHTML = "Muchas Gracias por tu aporte :)";
                document.getElementById("widget_container").appendChild(thanks_message);
            }

            //Generates a link so we can link some external styles
            //TODO: Add a parameter so we can give it an external, not hardcored route.
            function injectStyle(){
                var head_element = document.getElementsByTagName("head")[0];
                var style_element = document.createElement("link");
                style_element.setAttribute("type","text/css");
                style_element.setAttribute("rel","stylesheet");
                //TODO: send this as a parameter
                style_element.setAttribute("href","media/stylesheets/screen.css");
                head_element.appendChild(style_element);
            }

            //Generates and binds the interaction events. Remember attachEvent is for IE
            function bindEvents() {

                var answer_list = document.getElementById("widget_answers");

                for (var i=0; i < answer_list.childNodes.length; i++)
                {
                    if (answer_list.childNodes[i].addEventListener) {
                        answer_list.childNodes[i].addEventListener("click",pushToAnalytics,false);
                    }
                    else if (answer_list.childNodes[i].attachEvent) { 
                        var htmlText = answer_list.childNodes[i].innerHTML;
                        //We use an anonymous function to send a parameter here.
                        answer_list.childNodes[i].attachEvent("onclick", function(){pushToAnalytics(htmlText)});
                    }
                } 

                var element = document.getElementById("widget_info");
                var close = document.getElementById("widget_kill");

                if (element.addEventListener) {
                    element.addEventListener("click",showElement,false);
                    close.addEventListener("click",killWidget,false);
                }
                else if (element.attachEvent) {
                    element.attachEvent("onclick",showElement);
                    close.attachEvent("onclick",killWidget);
                }
            }

            //Push the selected answer to Analytics
            function pushToAnalytics(element)
            {
                _gaq.push(['_setCustomVar',
                        selectedQuestion,                   
                        questions["q"+selectedQuestion].question_short,
                        element, 
                        1  
                        ]);
                var container = document.getElementById("widget_question");
                var second_container = document.getElementById("widget_answers");

                showThanksMessage();

                var info = document.getElementById("widget_thanks");
                info.style.display = "block";


                container.style.display = "none";
                second_container.style.display = "none";
            }

            //If we find an available question slot call the following functions
            if(isFound) {
                injectMarkup();
                generateHTML(selectedQuestion);
                injectStyle();
                bindEvents();
            }

            //Stop checking
            stopCheck();
        }
    }
})();
