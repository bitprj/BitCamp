Particle System basics (10 mins)

Some special effects in Unity, like explosions, sparks, or even weather, can be made using groups of coordinated particles. Each individual particle unit behaves independently of the rest, with its own starting position, size, and velocity. This idea is captured in Unity’s particle systems, which is just another component you typically add to an empty game object.





Already we can see that this is a very unique game object, with its own window pop-up so we can adjust view settings. Hit pause to freeze the animation, hit restart to have it play from the beginning, press stop to hide the system, and adjust speed with “playback speed”.

Looking at the default particle system more closely, we can see that the individual motion of each particle isn’t that complicated. Each particle travels straight along its own path, and disappears once it has travelled a certain distance - the only thing that differs between them is that each path is randomized within a cone pattern.

In the inspector window, you’ll see many more options that define what the particle system actually looks like. We’ll get into those shortly after, when we start playing with pre-built particle systems.
Review of prototype scene (3 minutes)

Remember our scene from last week? Again, this is a scene taken from the Audio and SFX module on the Unity Learn website, though I’ve completed the collision, animation, and game over steps ahead of time so we can focus on particle effects. I do recommend stepping through the original project from the beginning if you’re curious!

Playing through the scene now, we have a construction worker running through a city scene and jumping over obstacles that spawn regularly. If we collide with an obstacle, we play a death animation and the game ends. Even if you weren’t here to implement sound, we can put in particle effects regardless, and in much the same way.

Our goal today will be to spawn two ready-made particle systems in our game. One will be a persistent running dirt trail, and the other will be a pixelated burst that goes off when we collide with something. And again, we’ll do this by editing the PlayerController script.
Observing particle systems (5 minutes)

Look in Course Library -> Particles to find Unity’s ready-made particle prefabs. Let’s first look at the one called FX_Dirt_Splatter. This is a prefab, which means we can simply drag it into our hierarchy window and use it as a GameObject.



Let’s set the playback speed to something slower so we can appreciate what’s going on. Instead of 2D spheres, it looks like this system is made up of cubes, and that they shrink over time. Looking even closer, it seems the particles also rotate, and are affected by some gravity.

Next, let’s look at FX_Explosion_Smoke.



Slow the playback down, and restart as many times as necessary until you understand what’s going on. Unlike the other two systems, this one emits a fixed number of particles rather than spawning them continuously. Each particle has varying sizes and initial paths, but they all drift upward and grow smaller over time.
Adding particle systems to the game (10 mins)

Now that we know what particle systems are and how to view them, adding them to our game is rather simple. With FX_Dirt_Splatter, simply make the prefab a child of the player and drag it under them - it will keep playing during gameplay.



As for FX_Explosion_Smoke, which is a one-time effect, we need to spawn it and trigger it at the right time via script. First, make the prefab a child of the player, then drag it towards their center.


Now in script, we need a reference to this ParticleSystem component, which we can put with the rest of our declarations.



Then, in PlayerController.cs, navigate to the OnCollisionEnter method that checks for obstacle collisions, and command the particle system to play when we hit something.

 

Finally, save and drag the explosion particle system into our new variable via the inspector.



Now, when you press play, particles will be emitted as the player runs, as if dirt is being kicked up, and an explosion should play when the player loses.

We can make the explosion more visually appealing, but right now the dirt particles are still playing even when we’re off the ground, and when we’ve died. To fix this we need to stop the particle system emission when we’re in the air and when we’ve died, and start it again when we’ve hit the floor:


Editing particle system values (10 minutes)

There are a couple of things visually off about these particle systems when we use them off-the-shelf. For one, the explosion is too big and covers up the screen, and it has no color. Fortunately, we can edit some particle system values in the inspector to fix this.

Let’s start playing with some values. Many of the main options are left for us near the top of the particle system component. These are some of my own suggestions, but take some time to play around with the system and make your own unique edits.

The size of the explosion seems too big, so:
-Adjust [Start Size] to be random values between 0 and .15.

The particles aren’t very eye-catching set to that dark grey, so:
-Set [Start Color] to a bright red (or whatever bright color you want).

The impact seems a bit too violent and spread-out, so:
    -Set [Start Speed] to 0.

Finally, it feels like the particles last for a bit too long, so:
-Adjust [Start Lifetime] to be random values between 1 and 2.



That’s already looking much better, but what about the all the modules below? (These are just short explanations, no need to demonstrate every one.)

Emission dictates how many particles are being created over time, and this particular system has a special emission type called a “burst”. This means that 100 particles are getting created at once. The entire system is set to last only .5 seconds, so this burst only occurs once.

Shape controls the surface from which the particles are emitted, and in some cases can drastically change the look of the system. With this singular burst, this change isn’t too noticeable, so we can ignore it for now.

Velocity/Size/Rotation Over Lifetime all dictate how a particle behaves over time, from the point it spawns to when it disappears. This behavior can be constant, or can be dictated by a curve. Press “Open Editor” at the top of the component and select one of these options to get a better look at these curves:



Size/Rotation By Speed behave similarly, but are instead dependent on how fast the particle is moving. Again, this behavior can be constant, or can be dictated by a curve.

Color Over Lifetime/By Speed is conceptually the same as the others, but instead of handling curves, you can simply edit the mapping with this color slider:



Noise will add a random element to your particles’ motion over time, giving it a more natural look.

Collision allows your particles to collide with GameObjects or planes, in case you’re simulating physical objects. (Triggers function similarly, and can set off OnTriggerEnters on your other game objects.

Lights can cause your particle to glow.

Trails require a Material, and can use that Material to trace the motion of your particles.

Particle systems are just a combination of Unity’s built-in component and all these individual settings; we could reverse engineer nearly any special effect within Unity just by keeping track of these modules!
Looking at Unity’s Particle Pack (10 mins)

https://www.youtube.com/watch?v=mAHIKxu7pnw 

https://assetstore.unity.com/packages/essentials/tutorial-projects/unity-particle-pack-127325 