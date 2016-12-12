# web-chat-bot

An intuitive chat bot interface that queries a user for information required to onboard them onto a career search service.

## Installation

1. Install dependencies: `npm install`
2. Build application: `npm run build`
3. Start server: `npm start`
4. Navigate to either specified URL and port or `localhost:3000`

## Usage Notes

* Everything is keyed off the person's name. It does not handle the case where two distinct people have the same exact name. In this case, the second person will overwrite the values of the first.
* At any point you can enter '/help' for a list of commands.
* Commands much match exactly.
* At any point you can start over by entering 'Start over'.
* After you enter your name, you can at any point enter a command to retrieve previously entered data.
* At the end of the onboarding process, the bot stops responding. But you can start the process over if you'd like.

## Structure

### Frontend
1. ChatBox module
  * Directive contains the HTML for the chat box
  * Thin controller for chat box
  * Service that contains all API calls and holds data
    * Holding messages in a service means I have access to messages across multiple controllers if necessary
2. Shared module
  * Contains directive that scrolls to bottom of the element if the array of messages change. This is necessary for a natural chatting experience. In a separate module because this is mechanical and could be used across components
3. Architecture choices
  * Organized code based on function
    * At each level, I gather the pieces into modules. In app.js I gather all the modules.

### Backend
* Architecture choices
  * I hold the bot's questions, the order in which it asks questions, and the list of commands in a simple in-memory JSON file. If the bot's question ordering and decision tree were more complex, this could be moved to something like a DB. The data is not tightly coupled to the implementation, so if the source of bot questions were to change, this would be an easy change.
  * I do serve up the bot's questions from the backend. This is in anticipation of a more complex bot decision tree that would continue to live on the backend. This would allow me to change the bot's questions without having to redeploy the application.
  * The DB keys off the name and therefore has to be unique. This is not scalable because if you have two unique people claim they are 'Andrew', the second 'Andrew' will simply overwrite the values of the first 'Andrew'. You would also only see that only one 'Andrew' ever entered data since the backend performs upserts.
  * The index.js contains the routes and the controller file within the db folder contains the the logic to make the DB calls.

## Q & A
What would your next feature(s) be?
* Have one place of configuration that the DB schema, the list of commands, and bot questioning can read from so that if you want to change anything, you only have to change it in one place
* More intelligent message parsing including validation (for example, checking to see the response to the LinkedIn question is actually a link)
* More dynamic bot questions and responses. Right now it just goes in a linear fashion and does not actually do anything differently based on your response (besides the help command and basic retrieval)
* Maybe an upload feature for your resume
* Handle multiple people with the same exact name

What do you think is the weakest part of your overall Stella chat experience?
* The Q&A of the bot is rather simplistic at the moment. But the way it's built makes it easy to build this out further in a future iteration.

What, in your opinion, is the best part (from a user's perspective)?
* The UI/UX scales down nicely for pleasant mobile experience as well as desktop experience. I took inspiration from the iPhone messaging app for design cues.

Do you think that this is a good onboarding experience? Why or why not?
* Not really. When I'm inputting large amount of data, I want to see everything I have already put in and am going to need to put in on one page. With the chat, I have no idea how many questions are left. I have to query the chat bot to see what I wrote previously instead of just scrolling up. With this interface, it is difficult to go back and edit an answer.
