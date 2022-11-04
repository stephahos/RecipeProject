<Recipe Project>

This is a web app for you to find and select various reciptes based on your preferences. This could be whether you eat meat, or prefer vegetarian or vegan, and also culinary preferences, calories or time available to cook.


User Stories
404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
500 - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
homepage - As a user I want to be able to access the homepage so that I see what the app is about, and navigate to the login or signup pages
login - As a user I want to be able to sign in easily to get to my account
signup - as a user I want to be able to sign up quickly and easily with clear instructions that work if I follow them
logout - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
search page - As a user I want  to be able to state my preferences for the kind of food I would like to cook
results page - As a user I want to see options of tasty-looking meals that I can select and add to my favourites, or get more details
Favourites page - As a user I want to be able to see the recipes I have previously selected, and then access the details or remove them
Details page - As a user I want to see the full instructions and ingredients, a full-size image, as well as other information, like calorific content and the time it takes to cook.

Backlog
API: link to an API with high-quality images and information
Random recipe image on homepage

User profile:


...
ROUTES:

GET /
renders the homepage

GET /auth/signup
redirects to /search if user logged in
renders the signup form 

POST /auth/signup
redirects to /search if user logged in
body:
username
password
redicects to /search once successfully signed up

GET /auth/login
redirects to /search if user logged in
renders the login form

POST /auth/login
redirects to /search if user logged in
body:
username
password

LOGOUT button redirects to homepage, but how?
GET homepage?

GET /search
renders search form

POST /search
redirects to /results

GET /results
renders results list: objects containing the name and a photo of the dish, as well as a button to (un)favourite it ("success"), and link => GET /recipe:id

POST /results
button (heart or star that changes colour) :id to favourites list?; link to /recipes/:id

GET /favourites
renders favourites list: objects containing the name and a photo of the dish, as well as a button to (un)favourite it ("success"), and link => GET /recipe:id

GET /recipes/:id
renders details of one recipe

Models
User model

username: String
password: String

Recipe model

name: String
instructions: [String]
calories: Number
cuisineType: String
cookTimeMinutes: Number
difficulty: easy, moderate, hard?
image: URL

attendees: [ObjectId<User>]
Links
Trello
Link to your trello board or picture of your physical board

Git
The url to your repository and to your deployed project

Repository Link

Deploy Link

Slides
The url to your presentation slides

Slides Link