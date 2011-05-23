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
			info_div.appendChild(detail_div);

            var body = document.getElementsByTagName("body")[0];

            body.appendChild(parent_div);
        }
		
inject_markup();

function thanks_message(){
	var thanks_message = document.createElement("p");  
	thanks_message.id = "widget_thanks";
}