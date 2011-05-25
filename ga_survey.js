//Google Analytics Survey Widget
//Injects an small widget with several random an unique questions to
//an specific user. Use it to obtain more precise info about your users
//By @PixelHorror
//For Monoku Labs

//small function to check if GA, specially GQ is available for use.
function check_resources(){
    interval_id = setInterval(Main,50);
}

//Stops the upper function
function stop_check(){
    clearInterval(interval_id);
}

check_resources();

//Main body
function Main(){
    if (_gat) {
        //Main Questions Array
        var questions = {
            q1: {question:"Cual es tu color favorito?",question_short:"Color",answers:["rojo","verde","azul"]},
            q2: {question:"Cual es Genero?",question_short:"genero",answers:["Masculino","Femenino"]},
            q3: {question:"Cual sabor de helado favorito?",question_short:"sabores",answers:["Fresa","Vainilla","Mora","Atun"]},
            q4: {question:"Cual es tu musica favorita?",question_short:"musica",answers:["Rock","Salsa","Electro","Atun"]},
            q5: {question:"Cual es tu nacionalidad?",question_short:"nacionalidad",answers:["Colombiano","Europeo","Japones","Atun"]}
        };
        //Common Variables
        var counter = 1;
        var selected_question;
        var is_found = false;

        while(!is_found && counter < 6)
        {
            var pageTracker = _gat._getTrackerByName();
            var customVar = pageTracker._getVisitorCustomVar(counter);
            //The custom var hasn't been set, so we asign it as an active question
            if (typeof(customVar) === "undefined")
            {
                selected_question = counter;
                is_found = true;
            }
            counter++;
        }

        //Generates the html of the widget
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

        //injects the structure of the widget, so it can be styled
        function inject_markup(){
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

            parent_div.appendChild(close_p);
            parent_div.appendChild(question_div);
            parent_div.appendChild(answers_ul);
            parent_div.appendChild(info_div);
            info_div.appendChild(detail_div);

            var element = document.getElementById("body");
            element.appendChild(parent_div);
        }

        function show_element() {
            var element = document.getElementById("widget_info_detail");
            element.style.display = "block";
        }

        function kill_widget() {
            var element = document.getElementById("widget_container");
            element.style.display = "none";
        }

        function show_thanks_message(){
            var thanks_message = document.createElement("p");  
            thanks_message.id = "widget_thanks";
            thanks_message.innerHTML = "Muchas Gracias por tu aporte :)";
            document.getElementById("widget_container").appendChild(thanks_message);
        }

        //Injects the style
        function inject_style(){
            var head_element = document.getElementsByTagName("head")[0];
            //Use your custom CSS here.
            //TODO: add a way to add external resources instead of embedded css
            var style_element = document.createElement("style");
            style_element.innerHTML = "type='text/css'>html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline}body{line-height:1;color:black;background:white}ol,ul{list-style:none}table{border-collapse:separate;border-spacing:0;vertical-align:middle}caption,th,td{text-align:left;font-weight:normal;vertical-align:middle}q,blockquote{quotes}q:before,q:after,blockquote:before,blockquote:after{content}a img{border:none}#widget_container{display:inline-block;position:fixed;bottom:2%;right:5%;border:1px solid #c3c3c3;-moz-border-radius:5px;-webkit-border-radius:5px;-o-border-radius:5px;-ms-border-radius:5px;-khtml-border-radius:5px;border-radius:5px;font-family:Verdana, Arial;font-size:12px;width:150px;color:#5e5e5e}#widget_container #widget_kill{float:right;padding-right:5px;padding-top:5px;cursor:pointer;color:#5E5E5E;margin:0}#widget_container #widget_question{padding-bottom:0 10px;margin:0 10px}#widget_container #widget_answers{padding:0 10px;margin:0 0 10px 0}#widget_container #widget_answers li{-moz-border-radius:5px;-webkit-border-radius:5px;-o-border-radius:5px;-ms-border-radius:5px;-khtml-border-radius:5px;border-radius:5px;-moz-box-shadow:#c3c3c3 2px 2px 2px 1px 1px 5px 0;-webkit-box-shadow:#c3c3c3 2px 2px 2px 1px 1px 5px 0;-o-box-shadow:#c3c3c3 2px 2px 2px 1px 1px 5px 0;box-shadow:#c3c3c3 2px 2px 2px 1px 1px 5px 0;border:1px solid #c3c3c3;color:#009ada;padding:8px;margin:5px 0}#widget_container #widget_answers li:hover{color:white;background:#009ada;border:1px solid #3D7F7F;cursor:pointer}#widget_container #widget_info{background:#dddddd;font-weight:bold;padding:5px;cursor:pointer}#widget_container #widget_info #widget_info_detail{font-size:10px;display:none}#widget_container .hidden{display:none}#widget_container #widget_thanks{padding:10px;color:#009ADA;font-weight:bold;font-size:15px}";
            head_element.appendChild(style_element);
        }
        function bind_events() {

            var answer_list = document.getElementById("widget_answers");

            for (var i=0; i < answer_list.childElementCount; i++)
            {
                answer_list.childNodes[i].addEventListener("click",push_to_analytics,false);
            } 

            var element = document.getElementById("widget_info");
            var close = document.getElementById("widget_kill");

            element.addEventListener("click",show_element,false);
            close.addEventListener("click",kill_widget,false);
        }

        function push_to_analytics()
        {
            _gaq.push(['_setCustomVar',
                    selected_question,                   
                    questions["q"+selected_question].question_short,
                    this.innerHTML, 
                    1  
                    ]);
            var container = document.getElementById("widget_question");
            var second_container = document.getElementById("widget_answers");

            show_thanks_message();

            var info = document.getElementById("widget_thanks");
            info.style.display = "block";


            container.style.display = "none";
            second_container.style.display = "none";
        }

        if(is_found) {
            inject_markup();
            generate_html(selected_question);
            inject_style();
            bind_events();
        }
        else {
            console.log("All done, bro");
        }

        stop_check();
    }
}
