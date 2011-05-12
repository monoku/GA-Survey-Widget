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

        function inject_markup(){
            var parent_div   = document.createElement("div");
            var question_div = document.createElement("div");  
            var answers_ul = document.createElement("ul");  
            var info_div = document.createElement("div");  
            var detail_div = document.createElement("div");  

            parent_div.id = "widget_container";
            question_div.id = "widget_question";
            answers_ul.id = "widget_answers";
            info_div.id = "widget_info";
            detail_div.id = "widget_info_detail";

            parent_div.appendChild(question_div);
            parent_div.appendChild(answers_ul);
            parent_div.appendChild(info_div);
        }

        inject_markup();

        function inject_style(){
            var head_element = document.getElementsByTagName("head")[0];
            var style_element = document.createElement("style");
            style_element.innerHTML = "type='text/css'>html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline}body{line-height:1;color:black;background:white}ol,ul{list-style:none}table{border-collapse:separate;border-spacing:0;vertical-align:middle}caption,th,td{text-align:left;font-weight:normal;vertical-align:middle}q,q:before,q:after,blockquote:before,img{border:none}#widget_container{display:inline-block;position:relative;border:1px solid #c3c3c3;-moz-border-radius:5px;-webkit-border-radius:5px;-o-border-radius:5px;-ms-border-radius:5px;-khtml-border-radius:5px;border-radius:5px;font-family:Verdana, Arial;font-size:12px;color:#5e5e5e;width:250px}#widget_container #widget_question{padding:10px}#widget_container #widget_answers{padding:10px}#widget_container #widget_answers li{-moz-border-radius:5px;-webkit-border-radius:5px;-o-border-radius:5px;-ms-border-radius:5px;-khtml-border-radius:5px;border-radius:5px;-moz-box-shadow:#c3c3c3 2px 2px 2px 1px 1px 5px 0;-webkit-box-shadow:#c3c3c3 2px 2px 2px 1px 1px 5px 0;-o-box-shadow:#c3c3c3 2px 2px 2px 1px 1px 5px 0;box-shadow:#c3c3c3 2px 2px 2px 1px 1px 5px 0;border:1px solid #c3c3c3;color:#009ada;padding:8px;margin:5px 0}#widget_container #widget_answers li:hover{color:white;background:#009ada;border:1px solid #3D7F7F;cursor:pointer}#widget_container #widget_info{background:#dddddd}#widget_container .hidden{display:none}#widget_container .thanks{padding:10px;color:#009ADA;font-weight:bold;font-size:15px}";
            head_element.appendChild(style_element);
        }

        inject_style();
        if(counter < 6) {
            generate_html(selected_question);
        }

        var answer_list = document.getElementById("widget_answers");

        for (var i=0;i < answer_list.children.length - 1 ; i++)
        {
            //This line fucks shit up like no tomorrow, it doesn't let the code stop checking.
            //answer_list[i].addEventListener("click",push_to_analytics);
        } 

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
