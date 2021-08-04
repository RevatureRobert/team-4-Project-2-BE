# Scouter Backend

## Project Description
Scouter is a serverless social mobile application designed to be a community for anime viewers. With Scouter, a user can log in by creating and verifying their account through email. Once logged in, the user now has access to all that Scouter has to offer! This includes editting their profile, viewing anime pages, and seeing the opinions of the rest of the anime community along with sharing their own opinions. This is the backend repository.

_Scouter Mobile is only available on Android._

To develop/run the frontend for Scouter, refer to our documentation on our frontend repository.\
[Scouter Frontend](https://github.com/RevatureRobert/team-4-Project-2-FE)

## Technologies and Languages Used
* TypeScript
* Docker
* AWS V3 - Cognito, DynamoDB, Amplify, S3, Lambda, CodePipeline
* Severless Application Framework
* Jest

## Features
* Login/SignUp authentication
* Profile Page
  * Editing bio: greeting / about me sections, adding profile picture, follow button
  * Favorites list: shows all anime you have favorited 
  * Post: Details all the posts a user has posted
  * Following list: displays the names of all other users a user has followed
* Anime Page
  * Anime Info: displays the photo and related information along with ratings and favorite buttons
  * Posts: shows all related posts regarding an anime
* Drawer Navigation: An icon at the top left of the screen that a user can click on to display it or by swiping at the edge of the left side of the screen
  * Navigates across all major components in the app
  * Holds the Search bar for looking for an anime or a user
  * Includes: Home Page, Anime List, Edit Profile, Profile Page, Logout
* TabView Navigation: a side swipe navigation on an Anime and Profile Page
* Home Page: shows all posts from the user and the users they follow

To-do list:
* Implement follow/following between users and request/approval
* More comprehensive frontend testing

## Getting Started

### For Development:

To clone the repository, run the following command in your terminal:
```powershell
https://github.com/RevatureRobert/team-4-Project-2-BE.git
```

Alternatively, if you have Github Desktop, you can click on **Code** and **Open with Github Desktop**.
Be sure [NodeJS](https://nodejs.org/en/download/) is installed as well as a text editor. We used [Visual Studio Code](https://code.visualstudio.com/download).

To check if NodeJS and Node Package Manager installed correctly, run the following command:
```powershell
node --version
npm --version
```
Both should result in a version display.
Once installed, open up the root of the repository and install Scouter's dependencies by force: 
```powershell
npm install
```
This will read from the package.json and install all necessary dependencies. At this point, everything should be ready.

Now, you are ready to start editing the backend.

Anything pushed to our development branch gets automatically built.

## Contributors
Scouter Developers:
* [Joab Smith](https://github.com/j-m-smith426) 
* [Nick Wang](https://github.com/nickwanguu) 
* [Matthew Hanrahan](https://github.com/Thomas-Marik)
* [Imran Ilyas](https://github.com/imranilyas)

