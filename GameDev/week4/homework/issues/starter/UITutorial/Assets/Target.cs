using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Target : MonoBehaviour
{
    private Rigidbody targetRb;
    private float minSpeed = 12;
    private float maxSpeed = 16;
    private float maxTorque = 10;
    private float xRange = 4;
    private float ySpawnPos = -6;


    // Start is called before the first frame update
    void Start()
    {
        targetRb = GetComponent<Rigidbody>();

        targetRb.AddForce(RandomForce(), ForceMode.Impulse);
        targetRb.AddTorque(Random.Range(-10, 10), Random.Range(-10, 10), RandomTorque(), ForceMode.Impulse);

        transform.position = RandomSpawnPos();
    }

    // Update is called once per frame
    void Update()
    {

    }

    private void OnMouseDown() {
      Destroy(gameObject);
    }

    private void OnTriggerEnter(Collider other) {
      Destroy(gameObject);
    }

    Vector3 RandomForce() {
        return Vector3.up * Random.Range(minSpeed, maxSpeed);
    }

    float RandomTorque() {
        return Random.Range(-maxTorque, maxTorque);
    }

    Vector3 RandomSpawnPos() {
        return new Vector3(Random.Range(-xRange,xRange), ySpawnPos);
    }
}
