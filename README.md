## SPRINT 15 REACT-AROUND-API-FULL
The API of "Around the U.S." with authorization and registration handled by the back-end server.

This repository contains the full API of "Around the U.S." project that features user authorization and user registration and handles cards and users. Please add to this readme:

    a link to repository with the complete React application which uses this API;
    a link to the website that hosts your API.



# Frontend
React-Around Project has been used as a starting draft. Changes and improvements mainly are on utils folder. Api.js & Auth.js has some address redirection for the domain registered on student domain site. Main work done on Components/App.js a lot of the constants defining user, card working on previous lay out needed small changes on the current setting. So each function needed to be checked together with app.js of backend part.  
Also some corrections done on api.js and auth.js file based on deconstructar assignment logic tracked.
After having consistent api.js / app.js / auth.js bridges. Page functioned correctly.

Nginx use (config file setting) done on vm for it.

# Backend
Around-Express Project has been used as a starting draft. app.js had some new installations like dotenv / cors . Also logger - winstonexpress installed to keep error logs of the site. Also joi-celebrate added as well.
Routes have some changes over auth middleware protection and validator functions added for each. In errors it shows nicely on network. Index.js for routes had the auth implementation as parent had 2 validator function; rest of the validators implemented on cards and users routes.
errorHandler.js added for 500 response, while an error folder added for 400(BadRequest) , 403(Forbidden), 404(NotFound), 409(ExistingError - for registration) added. 

On VM the project controlled with PM2 add on and logs used for finding and correcting the errors.


# Conclusion
It is the most challenging project of the entire course as the final sprint project. It did require reorganization of several files bridging each other. 
Secret Keys created and shared with my cloud server. SSH shares enabled file transfer to my VM.
This project is the first implementation for VM usage on cloud as a server, hosting your project online besides the git umbrella independantly.

VM practices provided with the project. On the VM , frontend had nginx usage. With setting domains in the config file we had our domain name hosted on the cloud. Files built on Frontend with scp command on local bash (by SSH handshake) and the Backend had files with git pull.
With all of this the difficulties were a hard learning experiences.

http://mnamer.students.nomoredomainssbs.ru // api.mnamer.students.nomoredaminssbs.ru - where you can find my project.
A video cover will be added to Linkedin shortly after fixes