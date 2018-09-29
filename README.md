I’ll assume the Heroku app is all set up and the final step is the deployment process. Here’s the simple but yet “not going to argue with you” solution:

Head to root directory of the repo that contains index.html which dictates the main HTML page.
Run touch composer.json to create a file called composer.json.
Add the following line: {} inside.
Run touch index.php to create a file called index.php.
Add the line: <?php include_once("index.html"); ?> inside.
Now update the repo on Github if it’s connected to your account or Heroku command git push heroku master . Wait for the automatic deploy to work its magic and tada!



Initialize git repository by the command "git init", if there is no git repository.
Run "git add . " to add all files dot (.) means all
Than run "git commit -m "First commit" " for the first commit.
Login to heroku. No need if you are already logged in.
Now create heroku app by running "heroku create [appname]"
Run "git push heroku master" will push the app to the server and deploy the app.
To visit the app "heroku open"

For any modification and changes use:

git add .
git commit -m "your commit"
git push heroku master
heroku open




