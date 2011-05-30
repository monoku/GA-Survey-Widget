//Google Analytics Survey Widget v.1.1.0
//Injects an small widget with several random an unique questions to
//an specific user. Use it to obtain more precise info about your users
//visit: https://github.com/PixelHorror/GA-Survey-Widget for more info, fixes and detailed use
//Copyright (c) 2011 Jeronimo Osorio (@PixelHorror) for Monoku (www.monoku.com)
//Licensed under the MIT license. http://www.opensource.org/licenses/mit-license.php


(function() {
    function checkResources(){
        intervalId = setInterval(Main,300);
    }

    //Stops the upper function
    function stopCheck(){
        clearInterval(intervalId);
    }

    checkResources();

    //Main body
    function Main(){

        var questionCounter = 1;
        var selectedQuestion;
        var isFound = false;

        if (_gat) {
            //Main Questions Array
            var questions = {
                q1: {question:"Cual es tu color favorito?",question_short:"Color",answers:["rojo","verde","azul"]},
                q2: {question:"Cual es Genero?",question_short:"genero",answers:["Masculino","Femenino"]},
                q3: {question:"Cual sabor de helado favorito?",question_short:"sabores",answers:["Fresa","Vainilla","Mora","Atun"]},
                q4: {question:"Cual es tu musica favorita?",question_short:"musica",answers:["Rock","Salsa","Electro","Atun"]},
                q5: {question:"Cual es tu nacionalidad?",question_short:"nacionalidad",answers:["Colombiano","Europeo","Japones","Atun"]}
            };

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

      

            function showElement() {
                var element = document.getElementById("widget_info_detail");
                element.style.display = "block";
            }

            function killWidget() {
                var element = document.getElementById("widget_container");
                element.style.display = "none";
            }

            function showThanksMessage(){
                var thanks_message = document.createElement("p");  
                thanks_message.id = "widget_thanks";
                thanks_message.innerHTML = "Muchas Gracias por tu aporte :)";
                document.getElementById("widget_container").appendChild(thanks_message);
            }

            //Injects the style
            function injectStyle(){
                var head_element = document.getElementsByTagName("head")[0];
                //Use your custom CSS here.
                //TODO: add a way to add external resources instead of embedded css
                var style_element = document.createElement("style");
                style_element.setAttribute("type","text/css");
                style_element.innerHTML = "#widget_container{margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;display:inline-block;position:fixed;bottom:2%;right:5%;border:1px solid #c3c3c3;-moz-border-radius:5px;-webkit-border-radius:5px;-o-border-radius:5px;-ms-border-radius:5px;-khtml-border-radius:5px;border-radius:5px;font-family:Verdana, Arial;font-size:12px;width:150px;color:#5e5e5e;background:white}#widget_container #widget_kill{float:right;padding-right:5px;padding-top:5px;cursor:pointer;color:#5E5E5E;margin:0}#widget_container #widget_question{padding-bottom:0 10px;margin:0 10px}#widget_container #widget_answers{padding:0 10px;margin:0 0 10px 0}#widget_container #widget_answers li{-moz-border-radius:5px;-webkit-border-radius:5px;-o-border-radius:5px;-ms-border-radius:5px;-khtml-border-radius:5px;border-radius:5px;-moz-box-shadow:#c3c3c3 2px 2px 2px 1px 1px 5px 0;-webkit-box-shadow:#c3c3c3 2px 2px 2px 1px 1px 5px 0;-o-box-shadow:#c3c3c3 2px 2px 2px 1px 1px 5px 0;box-shadow:#c3c3c3 2px 2px 2px 1px 1px 5px 0;list-style:none;border:1px solid #c3c3c3;color:#009ada;padding:8px;margin:5px 0}#widget_container #widget_answers li:hover{color:white;background:#009ada;border:1px solid #3D7F7F;cursor:pointer}#widget_container #widget_info{background:#dddddd;font-weight:bold;padding:5px;cursor:pointer}#widget_container #widget_info #widget_info_detail{font-size:10px;display:none}#widget_container .hidden{display:none}#widget_container #widget_thanks{padding:10px;color:#009ADA;font-weight:bold;font-size:15px}";
                head_element.appendChild(style_element);
            }
            function bindEvents() {

                var answer_list = document.getElementById("widget_answers");

                for (var i=0; i < answer_list.childElementCount; i++)
                {
                    answer_list.childNodes[i].addEventListener("click",pushToAnalytics,false);
                } 

                var element = document.getElementById("widget_info");
                var close = document.getElementById("widget_kill");

                element.addEventListener("click",showElement,false);
                close.addEventListener("click",killWidget,false);
            }

            function pushToAnalytics()
            {
                _gaq.push(['_setCustomVar',
                        selectedQuestion,                   
                        questions["q"+selectedQuestion].question_short,
                        this.innerHTML, 
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

            if(isFound) {
                injectMarkup();
                generateHTML(selectedQuestion);
                injectStyle();
                bindEvents();
            }

            stopCheck();
        }
    }
})();
