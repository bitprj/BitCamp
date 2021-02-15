# Assignment 1: Car Boost

## Solution 1:


	using System.Collections;
	using System.Collections.Generic;
	using UnityEngine;

	public class PlayerController : MonoBehaviour
	{
		//Variables
		public float speed = 15.0f;
		private float turnSpeed = 25.0f;
		private float horizontalInput;
		private float forwardInput;
		private float boostInput;
		private float boost;


		// Start is called before the first frame update
		void Start()
		{

		}

		// Update is called once per frame
		void Update()
		{
			boost = 1.0f;
			horizontalInput = Input.GetAxis("Horizontal");
			forwardInput = Input.GetAxis("Vertical");
			boostInput = Input.GetAxis("Jump");

			boost += boostInput;

			// We move the vehicle forward
			transform.Translate(Vector3.forward * Time.deltaTime * speed * forwardInput * boost);

			//We turn the vehicle
			transform.Rotate(Vector3.up, Time.deltaTime * turnSpeed * horizontalInput);
		}
	}

## Solution 2:


	using System.Collections;
	using System.Collections.Generic;
	using UnityEngine;

	public class PlayerController : MonoBehaviour
	{
		//Variables
		public float speed = 15.0f;
		private float turnSpeed = 25.0f;
		private float horizontalInput;
		private float forwardInput;
		private float boostInput;
		private float boost = 2.0f;


		// Start is called before the first frame update
		void Start()
		{

		}

		// Update is called once per frame
		void Update()
		{
			horizontalInput = Input.GetAxis("Horizontal");
			forwardInput = Input.GetAxis("Vertical");
			boostInput = Input.GetAxis("Jump");

			// We move the vehicle forward
			if(boostInput > 0f)
				transform.Translate(Vector3.forward * Time.deltaTime * speed * forwardInput * boost);
			else
				transform.Translate(Vector3.forward * Time.deltaTime * speed * forwardInput);

			//We turn the vehicle
			transform.Rotate(Vector3.up, Time.deltaTime * turnSpeed * horizontalInput);
		}
	}
	
# Assignment 2: Project Design Document

Given the nature of the assignment, there is no set solution. The assignment only needs an original game planned out in the project design document template we provide.

# Assignment 3: Importing Assets

Like the second assignment, there is no set solution. The assignment only needs a Unity project that has assets in it that could be used to develop the game that the students planned in assignment 2. 
