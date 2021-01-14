Challenge 1.

private void OnCollisionEnter(Collision collision){
	...
		...
		playerAnim.SetInteger("DeathType_int", 1);
		//solution
		audioSource.Stop();
	}
}

Challenge 2.

void Update(){
	...
		...
		isOnGround = false;
	
	//solution
	} else if (gameOver) {
		audioSource.volume -= .03f;
		audioSource.pitch -= .03f;
	}
}


