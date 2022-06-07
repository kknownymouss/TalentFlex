# TalentFlex
TalentFlex is a great website used for sharing one's interests and talents. Sign in, create an account, post any type of project you've been working on and get honest opinions and ratings from other users on the web. Bond with other people, create friendships, take a look at their work and hobbies. Gain new ideas, methods, tips and tricks that might help improve your skills and knowledge.
# 🌟 TalentFlex's Features
Most of the features present in modern social media platforms have been implemented in TalentFlex. All while maintaining an easy-to-use design and delevering a smooth user experience.
- Login/Signup support.
- Show your talent by posting any **image/video** file to the desired talent feed. Try not to upload posts to feeds where they do not belong.
- Express your opinion by **commenting on any post**.
- Show the author or creator appreciation by **liking their posts**.
- **Edit your account settings** including email, password, profile pciture, etc...
- Check your notifications by using the  **notification feed** showing *any recent comments or likes made to your posts*. These notifications **redirect users to the comment made or post liked**. *Clearing* those notification is also possible.
- Support for **dark/light** mode.
- Get to know users better through the **user feed** showing the corresponding user's *statistics and posts*.
- A **fully fledged chat system** with support for *video/image sending*. Contact any user you like to, anytime you want to. The chat design will change on smaller screen resolutions while maintaining a **modern look**.
- **Search for any user** you want by typing his credentials.
# 🛠 TalentFlex Functionality and Inner Workings
This section will basically explain how TalentFlex was built. This will mostly cover all *backend* work which was written
using **Flask, a micro web framework written in Python**. In addition, this will explain how most of the User Interface Design is built which will cover
the *frontend* part of the web application that was written using **React, a front-end JavaScript library for building user interfaces based
on UI components**. 
### Backend
- TalentFlex uses REST API architecture for server-client communication. Every part and feature of the web application
has its own *api route* in the backend code (Flask) which is responsible for a certain task. The *api routes* are split
that way in order to improve readability and simplify the debugging process.
- All HTTPS requests used are *POST* requests regardless the goal of the request. It was used because it can hold more
content sometimes as the URL can have a maximum length on some browsers, it is not cached by default and it can
be more secure and private. This may violate the REST API principle which states that every method should have its distinct
functionality.
- The underlying database that the web application uses to manage users/posts/comments/talents/likes/notifications... records is **PostgreSQL, a relational database management system**. All queries are made using **SQLAlchemy, an object-relational mapper for the Python programming language**.
- For authentication, the user must login using the email and the password used in the signup process. All passwords are
stored securely using **bcrypt, a password-hashing function** which is extremely resistant to rainbow table-based attacks
due to the *salting* used in the hashing function in addition to the *cost* factor which slows the hashing function
making it prohibitively expensive to brute-force anything.
- Passwords should be more than 7 characters long and contain 2 uppercase, 2 lowercase, 2 digit characters in order to help protect the user against bruteforce attacks.
- User requests to the server are authenticated and validated using two tokens given to the user upon login. The first token, **user_token** represents an *encrypted ID* of the user making the request, which is used to identify the user making the request. The second token, **session_token** is added to the user object in the database upon login and it is compared to the **session_token** in the request body to authenticate the request. The sole purpose of *session_token* is to make sure that the request being made by the user which *user_token* represents (user_token resembles a user ID) is **actually made by that user himself**. For example, if an attacker was able to get hold of the *user_token* and tried to make a request in the name of that user, this will not work as the *session_token* is still needed. And this *session_token* can only be given on login which means that the attacker must know the target's password in order to execute the forged request. It is still vulnerable if the browser gets attacked and both tokens were visibile to the attacker.
- All media and user uploads are handled by **Cloudinary, which provides a cloud-based image and video management services**. When a user uploads a post, the backend code will use the *Cloudinary API* to upload the media to the cloud and the database will keep a record of the **media URL** referring to the image stored in the cloud so the frontend could access it later on. 
- Relations between all models like user-post relations, talent-post relations, notification-comment relations, etc... are handled by SQLAlchemy using one-to-many, many-to-many and self-referential many-to-many relationships.
- The chat system is **not handled by Flask or PostgreSQL**. It uses **Firebase's Cloud Firestore, a flexible, realtime, scalable database from Firebase and Google Cloud** to handle chatting features between the users. Users are stored in **collections** and inside these collections, chat messages are stored in **documents** (documents are stored in collections). For example, if *User A* sends a message to *User B*, that message will get stored in **both User's A collection and User's B collection** in the form of a document containing information like the *content, time of sending, type, sender and receiver* of the chat message. Upon fetching the chat messages, messages are displayed according to the *two collections representing the two chatting users* in cooperation with the *information listed in the documents* inside these collections.
- The chat also supports media sending. **Cloudinary's upload widget** is used to upload the media to the cloud and the chat message containing this media will be stored in a document in *Firebase's Cloudinary Firestore*. The type of this chat message will be **image/video** and the content of the message will be the **URL of the media** referring to the image stored in the cloud.
### Frontend
- The User Interface is built using the **React Library**. The web application's frontend is split into **multiple components** which simplifies readability and makes editing the UI way simpler. The web application relies heavily on conditional rendering and only functional components are used.
- **Bootstrap, a CSS framework** is used to style some elements and components like buttons and forms.
- All requests made to the backend rely on the **Fetch API**. Data that should be sent within the request is basically stored either in the component's state (using the *useState hook*), or in the session storage.
- The feed and posts data are fetched from the backend with the *Fetch API* when the **component first mounts**. This is achieved using the **useEffect** hook. The *Fetch API* also gets called again to update the data whenever the URL or the data the user wants to see, changes. Also, it is called whenever a **submit/edit/post event happens, so the server could update the database**.
- The layout of the UI design is mostly written using **flexbox containers**. These containers help in *organizing the layout and elements* with minimum effort and code while maintaining a good looking user interface.
- The web application is **responsive on most devices and screens**. To maintain a *good looking responsive* design, **CSS breakpoints and the react-responsive library** are used. These breakpoints are defined according to the **min-width** property. Some devices with specific screen sizes *may have an unpleasing view* due to the **breakpoints failing to target these screens**. This will most likely be fixed in the future.
- To integrate scrolling animation, **AOS Library, animate on scroll, is used**. This will give the design a smoother display while making the user experience better.
- **react-router, a standard library for routing in React**, is used to handle **navigation** around the web application. All *dynamic URLs* are created and handled with the help of this library. *Dynamic post URLs* are created using the **database ID of that post** and *user profile URLs* are created using the **username** of that user.
- The *loggedIn/loggedOut state* of the user is saved in **session storage**. When the user logs in successfully, the frontend will receive a *success response* from the backend meaning that the user is logged in now. 
- Some routes are only accessible **to logged in users**. To protect these routes from logged out users, a **PrivateRoute** component is used. This route will only allow users who are logged in by **checking if they have both *session_token* and *user_token* in session storage**. Some other routes use the **PublicRoute** component. This will make sure that these routes are only **accessible to loggedOut users** by making sure the *session_token* and *user_token* are **not available/stored in session_storage**. For example, the *login/signup pages* should only be accessed by users who aren't logged in yet.
- **Firebase's Cloud Firestore** is directly connected the the frontend *without any relations with the backend code*. The setup can be found in the **ChatDisplay** component. This will explain how the chat functionality works. The way chatting is handled is also explained in the above **backend** section.
- The **searching feature** is achieved by **setting a timeout** of 2 seconds when the user types in a new character to the search bar. The timeout will be **cleared and reset every time the user inserts a new character**. After the timeout is **completed**, a request will be sent to the backend containing the inputted characters in the search bar. This will help with keeping the functionality while **using less requests**.