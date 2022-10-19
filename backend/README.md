# Around the U.S. Back End  
  
## SPRINT 12 PROJECT LOG

This is the project we entered the back end world, communicationg with server side.
For our project we had used Node.js , Express.js together 

## Tools utilized 
With Node.js we set up the server also added dependencies for Express and Nodemon so we can have tools like lint and auto refresh due to node.  By utilizing "npm run lint" command I had a chance to clean lot's of minor space/indent based errors and had a smoother code.
nodemon is a good tool as well - each save I hade a chance to see the results.

## Project 
The project requires us to create to 'Json' files including cards and users fetchable data - which we should 'GET' them with postman. In our data compartment we added those 2 Json files.

## Project Tech: Routes
Routing is what we implemented based on the theory.  We based the initialization of any activity with json files from App.JS . It's like a reception for routing.
  ## Expres   
  We called express.js by binding app value to it and we put it in use with app.use(call to router).
  ## Routing 
  We used the '/routes' folder to include the categorized items we want to route.  Users & Cards respectively. Adding a basic index.js is actually useful for getting use to more complicated projects. 
  /index.js  acted as a hub and the file where we defined 'router' with express(), so it become ready to get/use it's abilities as router . With use ability we are able to reach users or cards just by adding them to the address bar:
  localhost:3000/users  
  ## Status Messages and Responses
  In each route file where we want to reach data we have server responses. 
  fs.promises used together with 'res' command.
  Also we set Status with res.status(404) lines.

## After words
Even though I feel like I have a long way to go - this base is helping me to get used to the logic of the project. I'll read theory 12 again to make the pieces put together as well again.  


`/data` — JSON files to temporarily emulate database integration.  
  
`/routes` — routing files.  
  
All other directories are optional and may be created by the developer if necessary.   
  
## Running the Project  
  
`npm run start` — to launch the server.  
  
`npm run dev` — to launch the server with the hot reload feature.  



