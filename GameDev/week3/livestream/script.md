# Intro

- *Introduce yourselves*

In this session we’ll be going over getting input from the player and using it to affect gameplay, the basics of writing design documents, and how to import your own assets from the unity asset store or from your computer.

# Section 1: Getting Player Input
 
https://learn.unity.com/tutorial/lesson-1-4-use-user-input-to-control-the-vehicle?uv=2018.4&courseId=5cf96c41edbc2a2ca6e8810f&projectId=5caccdfbedbc2a3cef0efe63
- *In this section, we we’ll be doing the tutorial linked above*

Having player input affect gameplay is one of the most important things to learn when making a game. This section will dive into how to get player input in Unity.
Currently, the car starts going the second you press start and you have no way to steer it. We’re going to fix that today.
We’ll be using the Unity input system to let players control the speed and direction of the car using the arrow keys.

### Part 1: Moving Left and Right
 
The first thing we need to do is let the car move left and right.

- *Open PlayerController script*

Open the PlayerController script we created and add:

<code>public float turnSpeed;</code>

to the top of the script under the speed variable.
 
In the Update() function add:

<code>transform.Translate(Vector3.right * Time.deltaTime * turnSpeed);</code>

This works similarly to the code we use to move the car forward except that it moves the car right along with the turnSpeed variable.  

- *Run the game and move the Turn Speed slider left and right*

If we now run the game and manipulate the Turn Speed value in the inspector, the car will move to the right if it’s positive, go left if it’s negative, and not move left or right if it’s zero.
 
### Part 2: Moving With the Arrow Keys
 
Now we need to make the turn speed and speed variables change based on player input. Unity actually has a built in input system that makes managing and creating inputs much easier on developers.

If you go to the top left corner and click Edit, then Project Settings, you’ll find a large menu of useful project settings. The one we’ll be using today is Input.

If you left-click on the drop-down for Axes in the input menu, there will be a large variety of inputs that you can map to different buttons.
There are many inputs, but we’ll be using Horizontal and Vertical. There are default input for the left and right arrow keys on horizontal (left is negative, right is positive) and the up and down arrow keys on vertical (up is positive, down is negative).
 
- *Open PlayerController script*

If you open up PlayerController again, we can start implementing these inputs into the code. Under the turnSpeed variable write:

<code>public float horizontalInput;</code>

This will track the horizontal input of our player.

Now we need to give the horizontalInput variable a value, which we can do in the Update() function. That input manager we saw in the Project Settings has a built-in class in 
Unity that we can use to access it in the code. At the top of the Update() function add:

<code>horizontalInput = Input.GetAxis(“Horizontal”)</code>

The reason “Horizontal” in the brackets is because this Unity function needs the name of the axis we want to use. This is typed out as a string variable, hence the double quotes. The horizontalInput variable will now be 1 if the right key is pressed, -1 if the left key is pressed, and 0 if neither are pressed.
 
Now we go into our code that moves the car left and right:

<code>transform.Translate(Vector3.right * Time.deltaTime * turnSpeed);</code>
and add: <code>* horizontalInput</code> after turnSpeed making it:

<code>transform.Translate(Vector3.right * Time.deltaTime * turnSpeed * horizontalInput);</code>

This will multiply our whole horizontal movement equation by the horizontal input which can either be 1, -1, or 0.
Now we can go into the game, change Turn Speed to 1 in the inspector and play. We can move the car left and right using the arrow keys.

public float horizontalInput;

#### Section Code
	public float horizontalInput;
	
	void Update() 
	{
		horizontalInput = Input.GetAxis("Horizontal");

		transform.Translate(Vector3.forward * Time.deltaTime * speed);
		transform.Translate(Vector3.right * Time.deltaTime * turnSpeed * horizontalInput);
	}
 
### Part 3: Moving Forward and Backwards
 
Now that we can move left and right, we should make players able to move forward and backwards.

The method of moving the vehicle forwards and backwards is very similar to how we moved it right and left.

- Open input manager Edit > Project Settings > Input

We used the Horizontal axis to move left and right so we’ll be using the Vertical access to move forwards and backwards. The vertical axis is set to up arrow on the positive and down arrow on the negative.

So if we add:

<code>public float forwardInput;</code>

below our horizontalInput variable

<code>forwardInput = Input.GetAxis(“Vertical”);</code>

To the top of our Update() function

And add <code>forwardInput</code> to our code that makes the car go forward, making it:

<code>transform.Translate(Vector3.forward * Time.deltaTime * speed * forwardInput);</code>

We can go into the game and see that our up arrow moves us forward and our back arrow moves us backwards.

#### Section Code
	public float horizontalInput;
	public float forwardInput;
	
	void Update() 
	{
		horizontalInput = Input.GetAxis("Horizontal");
		forwardInput = Input.GetAxis("Vertical");

		transform.Translate(Vector3.forward * Time.deltaTime * speed * forwardInput);
		transform.Translate(Vector3.right * Time.deltaTime * turnSpeed * horizontalInput);
	}

### Part 4: Make the Vehicle Rotate When Turning
 
We now have control of the vehicle's direction but when you turn left or right we slide instead of actually turning like a car would. We’re going to fix that.
To demonstrate how we would fix this, we need to have a top down view. To do this, we go to the Scene view, click the green “y” button in the top right corner, click on the Vehicle in the Hierarchy and press F with our mouse in the scene view to zoom in.

Now select the Rotate tool in the top left corner (it has two arrows making a circle), select Vehicle, and start to rotate the vehicle by clicking on it and dragging it left and right. You can see in the inspector that the Rotation Y value is being changed when we do this, so that’s the value we need to change when we turn.

If we go back into our PlayerController script, we can write a line of code that rotates the vehicle on the y axis when we turn. To do this, we use the Rotate function in the transform class that we previously used to move the vehicle left and right. In the Update() function write:

<code>transform.Rotate()</code>

This rotate function takes two arguments in the brackets: An axis, and an angle. As we saw earlier the axis we need to rotate on is the y axis so we’ll be using Vector3.up. We can create an angle with:

<code>Time.deltaTime * turnSpeed * horizontalInput</code>

Together this creates:

<code>transform.Rotate(Vector3.up, Time.deltaTime * turnSpeed * horizontalInput);</code>

We can also delete the code we used to make the car slide right and left.

#### Section Code
	public float horizontalInput;
	public float forwardInput;
	
	void Update() 
	{
		horizontalInput = Input.GetAxis("Horizontal");
		forwardInput = Input.GetAxis("Vertical");

		transform.Translate(Vector3.forward * Time.deltaTime * speed * forwardInput);
		transform.Rotate(Vector3.up, turnSpeed * horizontalInput * Time.deltaTime);
	}

### Part 5: Cleaning Up the Code and Hierarchy
 
In the hierarchy, we have a lot of obstacles that are taking up a lot of space, they don’t look nice and as we add more game objects they’ll get in the way. If we look at Environment in our hierarchy, we can see a great way of managing these game objects by putting them inside another game object.

To do this, right-click on the hierarchy and press Create Empty. This will create an empty game object that is not visible in the game and does nothing. In the inspector, rename the game object to Obstacles. Select all the obstacles by clicking on the first one and then hold shift and click on the last one. Drag all the obstacles into the Obstacles game object and they’ll be tidy and out of the way.
 
Next is to make the public variables in the PlayerController script private. Making a variable private means it can’t be edited from the inspector and can only be edited by going into the code. Since we’re done testing, we can make our variables private to tidy our inspector. Your variables at the top should look like this:

	private float speed = 5.0f;
	private float turnSpeed = 25.0f;
	private float horizontalInput;
	private float forwardInput;

We need to put values on speed and turnSpeed because before we were giving them values in the inspector which we can’t do now that they’re private.
Now we can add more comments. We can put <code>//Private Variables</code> on top of the variables section at the top, add <code>//Get Player Input</code> above horizontalInput and forwardInput in the Update() function, and we can add <code>//Rotate the Vehicle Left and Right</code> above the Rotate code. This makes the code more readable and makes it more understandable when you come back to it later.

#### Section Code
	//Private Variables
	private float speed = 20.0f;
	private float turnSpeed = 45.0f;
	private float horizontalInput;
	private float forwardInput;
	
	void Update() 
	{
		//Get Player Input
		horizontalInput = Input.GetAxis("Horizontal");
		forwardInput = Input.GetAxis("Vertical");
		
		//Moves the car forward
		transform.Translate(Vector3.forward * Time.deltaTime * speed * forwardInput);
		
		//Rotate the Vehicle Left and Right
		transform.Rotate(Vector3.up, turnSpeed * horizontalInput * Time.deltaTime);
	}

# Section 2: Project Design Documents
Copy of empty design document template: https://docs.google.com/document/d/1DbHWUeKPZAuWpAHIe5jLvKjAI-ez42-gsUT65UlWzHI/edit
 
Copy of example design document:
https://connect-prd-cdn.unity.com/20190524/00b9802d-b8fb-4047-af70-fa9b7ac3a9a9_Project_Design_Doc__EXAMPLE_.pdf?_ga=2.178214828.825690690.1607295147-1757362476.1602960309

Part 1: Project Concept
One of the most important things you need to do when creating your own game is to create a Project Design Document. This allows a developer to plan and write out the concepts and mechanics that their game will use. A design document will help you keep track of your ideas, stay consistent, and plan out how much time it will take to create your game.
We’re going to go through an example of what a Design Document would look like based off of the car game we just made and how we can expand upon it.

In Player Control we can put: You control a car in this third-person game where arrow keys makes the player move and turn the car.

This lays out how the player interacts with the game

In Basic Gameplay we can put: During the game, obstacles appear from the road and the goal of the game is to avoid the obstacles and get to the finish. This lays out the player’s goals and what is going to try and stop them from reaching that goal.

In Sound & Effects we can put: There will be sound effects when the car moves, when you crash, and when you win and particle effects when you crash and when you win. There will also be an animation of your car exploding when you crash. This will lay out some of the sounds and effects in your game and the conditions that they are used in.

In Gameplay Mechanics we can put: As the game progresses, obstacles will become more frequent making it harder to avoid them. There will also be a boost that makes you go faster temporarily. This lays out extra gameplay mechanics and how the game will escalate as you play it. This can be an increase in difficulty or complexity.

In User Interface we can put: The speedometer will increase whenever the player presses the up key. At the start of the game, the title Car-Go will appear and the game will end when you get to the finish line or crash. This lays out the user interface which is information that shows up on the screen like the speed of the car, the title (which is a nice little play on words), and win or lose screens.

In Other Features you can add more features that wouldn’t fit in the earlier sections like if you wanted the boost to be able to make the car smash through crates without dying.
 
### Part 2: Project Timeline
 
The project timeline is a great tool to keep your workload consistent and manageable and can help you make your game concept more concrete. Giving yourself due dates will keep you on track and always working towards completing your game. If you don’t want to use your design document to track your progress there are a lot of really good websites and applications that you can use like Trello.
 
### Part 3: Project Sketch
 
A project sketch is a good way to visualize your ideas and really see how things would look on a screen without needing to develop an actual prototype. The art in your project sketch doesn’t need to be good, it only needs to be readable to you and anyone else you’re working with so that the idea for the game is clear.
 
### Part 4: Design Document Conclusion
 
If you want to check out a fully realized design document, we’ve provided an example document for a game called “Oh Deer” that you can look at. We encourage you to try and come up with your own games using this design document template. If you want to try something bigger, there are plenty of larger and more complicated design document templates out there you can try, but while you’re starting out it’s best to start simple and work your way up to that.


# Section 3: Assets and the Unity Asset Store

### Part 1: How to Import Assets with Unity Asset Store
 
The Unity Asset Store is a great resource for those who are trying to make a game but lack certain skills like doing art and animation, just want to make a game quickly, or want temporary assets to use before you create your official game ones.

To get to the Unity Asset Store, simply click the tab that says Asset Store either beside your Scene tab or Game tab. If you don’t see the Asset Store tab, simply go to Window and click Asset Store or press CTRL + 9. 

Once you’re in the asset store, you’ll need to log in with your Unity ID. If you have Unity, you have a Unity ID, you need it to have Unity but if you’re not signed in, just go to the top right corner, click the icon that looks like a stickman in a circle, and sign in.

Once you’ve signed in, you can go to the Assets drop down menu and it will give you a number of options based on what you want. We’re going to click on 3D. You’ll be met with a web page with a lot of assets on it. Some of these assets are free but most you have to pay for. To filter to only free assets simply click the Free Assets checkbox on the right side of the screen.

Once we have the free assets, let's find one we like. (Find a random asset pack) Once we’re on the asset page we can see screenshots, the description, the contents of the package, the releases they’ve made on it, and reviews from other game developers that have used it. 

To download it into our project, we simply need to click on the pack, click Download, then once it’s downloaded click Import.

Once you click that, it will show a large list of assets that will be imported, we can individually uncheck assets and folders that we don’t want before we import it, or we can select all of them or none with the buttons in the bottom left corner.

Click import, and all of those assets will be put into their own folder in your Assets folder that you can use later.


### Part 2: How to Import Assets without Unity Asset Store

Link for Toon Characters 1 Pack by Kenney: https://www.kenney.nl/assets/toon-characters-1

But say we’ve found something we like that’s not on the Asset Store and we want to put it in our project. Here’s how you do it.

In our case we’ll be using a character from the Toon Characters 1 pack from Kenney. The file is on our desktop. So we go into the folder we want to put it into, in my case it’s a Sprites folder, we right click in the folder, and click Import New Asset. This will bring up a file explorer where you can navigate to the asset you want, and just click on it to import it. You can’t import folders but you can select multiple assets and bring them all in.

Another way you can do it is by right clicking inside the Sprites folder again and instead clicking Show In Explorer. From here you can bring assets in directly by dragging them into the explorer.
 
# Conclusion
 
- *Encourage viewers to try and come up with ideas for games with the design documents and look around the Unity Asset Store and the internet for assets that can inspire their games.*


