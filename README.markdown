#Google Analytics Survey Widget v1.1.0
##By Monoku

##Description
This is an small and experimental javascript snippet that generates an small embeddable survey from a pool of user created questions. This information can be analized in the Google Analytics User's section, under custom variables. 

##Usage
###Structure
The repository has the following file structure:

media/
--src
--stylesheets
--config.rb
ga_survey.js
index.html

In the media folder you'll find the CSS and SCSS sources if you want to alter the widget's look. As you can see, I used the included reset in
Compass, which was the CSS Authoring Framework used to create them.

The config.rb is just the configuration file for compass, it's compressing the CSS by default.

ga_survey.js is the file that you want to use on your site.

index.html is a simple example file so you can see how the widget works when it loads.

###Installation
To use you must get your hands dirty with a litte of Javascript, HTML and CSS. You have two ways of using the widget:

1. Unzip or clone the whole repo in your site directory.

2. Edit your index HTML and add ga_survey in your script's area.

3. Edit the JS file and modify the questions and answers that are in the array.

4. Also, you'll need to install the debug version of analytics on your site. You can do this by adding: "/u/ga_debug.js" instead of the normal analytics file.

That's pretty much it, enjoy it and report bugs, because I'm pretty sure there are loads.

##External Dependencies
If you want to modify the survey's style, you can get your hands dirty editing the CSS (it was generated) or better, use Compass v0.10.6 if you're confortable with SCSS markup (it's pretty easy, actually).
