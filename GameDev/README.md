# GameDev 🎮

Who doesn’t love video games? From Pac-Man to Mario, video games have ingrained themselves as a staple in day to day live - but how are they made? In the 80s, developers would simply have to code their games from scratch, but nowadays, there are a variety of game-development engines to automate the process. Unity is one of these engines; an industry standard used by multimillion dollar companies and small-time hobbyists alike. Beginner friendly and incredibly versatile, Unity is the gold standard for a reason, and learning it is a surefire way to turn yourself into a bona-fide game developer! 

After learning the fundamentals of how to implement various features and tools in Unity, students will spend a few weeks coding their own games/tech demos to demonstrate what they’ve learned. 

### Prerequisites

Basic programming knowledge (C# is used by Unity, but knowing it isn’t necessary)

### Agenda

Introduction: Week 0 will be an introduction to GameDev, and a broad overview of what exactly makes a game fun! 
The meat and potatoes: Weeks 1 through 3 will cover the barebone essentials of Unity, while weeks 4 through 7 will delve into more advanced usages.
Finale: From week 8 to the end of the program, students will be working with their mentors to focus on their games and make sure they’re as good as can be for the final presentation!


### Tools

- Unity Personal Edition
- Unity Asset Store

## Curriculum Outline
### Week 1

This week, you’ll be learning the basics of the interface. We cover the different windows of the unity interface, manipulating assets, and a basic introduction to scripting.

Learning Objectives

* Project Setup, Basics of the interface 
* Importing Assets (bringing car asset into the environment)
* Controls of the viewport
* Changing the position of gameobjects
* Working with the camera
* Running the game
* Creating and saving layouts for the interface
* Basics of scripts, how do we control our game objects?
* Creating and attaching C# scripts
* Editing scripts using visual studio
* Basics of Update() and Start()
* Moving the vehicle forward using transform.Translate(), no keyboard input yet

### Week 2

In week 2, we dive a little deeper into manipulating game objects and scripting. You’ll learn some C# code, components, and how to control game objects.

Learning Objectives

* Basics of Vector3 class, using Vector3.forward.
* Using Time.deltaTime to implement velocity
* Basics of rigidbody, how to use physics in unity
* Changing mass of rigidbodies
* Duplicating objects
* Basics of public variables, add a speed variable in the script, make it public, change it from the editor
* Creating a new script to make the camera follow the player without using child/parent objects (transform.position = player.transform.position on Update())
* Try this out, see that it doesn’t work, add an offset to the camera position to make it 3rd person view
* Add a Playmode Tint colour to the game in Edit > preferences >colors > playmode tint


### Week 3

In week 3, we’ll be learning how to get input from the player using the Unity Input System and applying that to gameplay, techniques on cleaning up the code and object hierarchy, and how to start creating our own games using project design documents and importing assets into Unity projects from the Unity Asset Store and the internet.

Learning Objectives

* How to get Horizontal and Vertical input from the player using Input Manager axes.
* How to rotate a game object using input.
* How to make your code and object hierarchy cleaner and more readable.
* How to use project design documents to make your own games
* How to import assets from your computer or the Unity Asset Store

### Week 4

This week we will be providing an introduction to user interface, or UI, using a practical example. We will learn how to create basic UI elements such as text and buttons. This includes text that changes throughout the course of our running game and a working restart button. We will also give an example of working with multiple scenes by making a game over screen.



Learning Objectives

* Three types of canvas
* UI text elements
* How to change UI text with code
* UI buttons and how to connect them to a function
* Creating new scenes and switching from one scene to another with code
* Creating and using tags

### Week 5

This week we will finish the game we started last week by adding a main menu with buttons that control the difficulty. This main menu will be our third and final scene, and we will change some of last week’s code to allow all three scenes to work together. By the end of this portion of today's lesson, we will have a main menu with buttons that control the spawn rate of crates, the game itself with dynamic score text, and a game over screen with a button that restarts the game at the previously selected difficulty.
Once we finish our Crates game, we will move on to another example to showcase more UI elements. More specifically, we will show an inventory system that uses grids, panels, and images. This section will also go into how to enable and disable game objects as a quick and easy way hiding items without completely removing them. Starter code is given in the same folder as this file. Please note that the Inventory system is currently in Unity version 2020.1. Playing the starter code you are able to move around a field with wasd, and there are some items in the field. By the end of today's session, you will be able to press i to pull up your inventory menu that shows all the items you've picked up.


Learning Objectives

* More on buttons including how to give them functionality with code
* How to transfer information between different scenes
* Pausing a game
* Creating a grid with panels
* Creating images

### Week 6

This week we’ll learn to find and integrate sound effects into a prototype game, and by the end of lecture you’ll be able to integrate sound effects and background music into any scene. We’ll have a list of tools and code snippets to make these sounds behave the way we want, and we’ll have the licensing knowledge to find sound files legally to integrate them into individual projects,

Learning Objectives

* Audio Sources
* Audio Clips
* How to play sounds (looping and oneshot)
* Where to find free sounds
* Open source licensing

### Week 7

This week we’ll investigate particle effects and learn to put them into last week’s prototype game, and by the end of lecture you’ll be able to understand and manipulate these unique effects. We’ll come away from the lesson with the ability to edit particle systems to their desired effect and play them at will.

Learning Objectives

* Particle Systems
* Editing particle modules
* How to play particle effects
* Reverse-engineering systems

