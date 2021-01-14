## Audio Source basics (5 mins)

Audio files like .mp3s and .wavs are just another set of assets we can add to our project. We’re going to be relying on one of Unity’s built-in components, the Audio Source. We can use Audio Sources to house one of our audio files, and can call upon the component to play that file in various modes.

To create an Audio Source, simply add one to an object through the inspector (you can put this under the Player object if you have the project open):



You should be able to drag any sound asset in your assets folder into the Audio Source’s [Audio Clip] field. (You can find some in Course Library -> Sound)



Now that that’s set up, we can now play an audio file in our game. Make sure that the Audio Source’s [Play On Awake] field is set to true, press the play button, and you should hear the sound! Also, if you tick the [Looping] field, the sound will play over and over again, perfect for background music.

As we can see, the Audio Source has multiple settings for our audio file, like volume and pitch, as well as options to loop. We can adjust these sliders now, but to change these settings during play, and play the audio clip whenever we want, we need scripts.


## Component Referencing (5 mins)

This is the point where component referencing comes in, and there are a couple ways to do this.

The first is to declare a public variable of the type AudioSource (all components are scripted classes that can be referenced this way):

This allows us to directly drag the Audio Source into our script in the inspector.



The second is to use GetComponent to automatically find the Audio Source for us:



This only works if the Audio Source is attached to the same object as this script, but it saves us the extra time of looking for the component manually.

## Intro to Prototype Scene (10 mins)

This is a scene taken from the Audio and SFX module on the Unity Learn website, though I’ve completed the collision, animation, and game over steps ahead of time so we can focus solely on sound effects. I do recommend stepping through the original project from the beginning if you’re curious about how the rest of the project works.

Playing through the scene, we have a construction worker running through a city scene and jumping over obstacles that spawn regularly. If we collide with an obstacle, we play a death animation and the game ends.

Though there a few moving parts here, we’re just going to look solely at the PlayerController script today, which you can find under the player object. There are two events in this script that we’re interested in - the first is when the player jumps, and the second is when the player bumps into an obstacle. We want to play audio effects in both cases.

## Playing on Command (15 mins)

Now that we have a solid understanding of what Audio Sources are and how to access them, it’s time to put them to use in our game.

First, let’s put on some background music. Put an Audio Source on the Player, then navigate to Course Library -> Sound -> Music in the Assets window to find some tracks. Drag your favorite track into the Audio Source, enable play on awake and looping, and ensure it works in game mode.



Next, we need to play a sound when our player jumps, and when they crash into an obstacle. To do this, we will use this same Audio Source, but we’ll give it other audio clips to play.

To start off, let’s put a component reference in PlayerController. Either method is fine, but I’ll use the automatic reference:



Now let’s handle the jumping and crashing sounds. Declare the AudioClip variables jumpSound and crashSound with the rest of the public variables.



The jumping event is handled in PlayerController’s Update() method, in the if statement. To play a particular audio clip once, we use AudioSource’s PlayOneShot() method. This method requires two arguments: a reference to the audio clip, and the volume of that clip. Let’s put this line in the right place:



And the same with crashing, which is handled in PlayerController’s onCollisonEnter:



All that’s left to do is save, and assign jumpSound and crashSound in the inspector! Navigate to Course Library -> Sound -> SFX to view the collection. Pick your favorite combination of audio clips to drag into the Player Controller component under Player, and press play to make sure everything’s playing correctly.


## Changing sound settings during runtime (5 mins)

We can also mess with an Audio Source’s volume and pitch during runtime, simply by changing their values. Volume ranges from 0 to 1, silence to max volume. Pitch is by default set to 1. Adding 1 raises the clip’s octave, and subtracting 1 decreases the clip’s octave.

As an experiment, let’s raise the Audio Source’s pitch and lower its volume every time the player jumps:



If we listen closely, we’ll notice that the speed of the music becomes more rapid with higher pitch, and that our jumping and crashing sounds are also affected by these changes.

These two values, and some stereo settings, are the only things Audio Sources can adjust directly. For more range of control, Unity has audio filters that you can add as additional components if you so choose.


Finding and looking through free sound asset websites (5 mins)

Your own projects won’t come with ready-made sound files that you can just drag and drop, so it’s important to know where to find the sound effects you’re looking for on your own.

The easiest avenue for finding sounds is freesound.org, a large online collection of sound files, all under the creative commons license. This means any file from the site can be used for free, though some can’t be used commercially, and some require attribution. We’ll talk about this in a bit.

It might be difficult to find the exact sound you’re looking for on this site, but there’s plenty of interesting stuff. Trying to search for “jump” might give you sounds of water splashing, or trampoline noises. You can try sorting by popularity, duration, and user reviews to try narrowing it down.

Another great resource is the Unity Asset Store, which has plenty of free sound assets ready for download. You have greater freedom with these - unless the asset is labelled as restricted, you are free to use it personally and commercially in your games.

To access the Asset Store, either go to Unity’s official store website and log in, or open it from within the editor (though Unity is planning to phase this feature out). Search for the specific asset you want, click download, then import. Confirm all dialog boxes and you should eventually see the assets appear somewhere in your asset window’s root directory.


## Licensing Discussion (10 mins)

Freesound

Now onto what to look out for when browsing free assets. When you click on a sound on freesound.org, you’ll find a small window like this:

Examples:
https://freesound.org/people/optronteam/sounds/551174/




That top part is important licensing information, which lay down some guidelines for legal use. The attribution license means that you can use the sound commercially, but you must give credit to the sound’s author in your game’s credits. You might find other licenses that look like this:

Examples:
https://freesound.org/people/unfa/sounds/550909/, https://freesound.org/people/DaveJf/sounds/550423/,



This one means that you can use the sound for any purpose with no attribution, but you can’t claim you’re the author.

Examples:
https://freesound.org/people/spoonbender/sounds/269462/ 


This one means you can’t use the sound commercially, and when you do use it, you must provide attribution.

Simple enough, but if you ever need clarification, freesound.org has a help page explaining all of this in detail.

Unity Asset Store

The Unity Asset Store is even more straightforward. Once you buy an asset, in most cases you can use the asset commercially without attribution or extra payment (nothing’s stopping you from mentioning the assets you used in credits, though)!
