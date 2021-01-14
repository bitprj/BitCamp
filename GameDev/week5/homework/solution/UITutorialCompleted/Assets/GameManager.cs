using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public List<GameObject> targets;
    private float spawnRate = 1.0f;
    private int score;
    public TextMeshProUGUI scoreText;
    private int difficulty;

    // Start is called before the first frame update
    void Start()
    {
        difficulty = GameObject.Find("Scene Loader").GetComponent<SceneLoader>().difficulty;
        Debug.Log("The difficulty is set to  " + difficulty);
        spawnRate /= difficulty;
        StartCoroutine(SpawnTarget());
        score = 0;
        UpdateScore(0);

    }

    // Update is called once per frame
    void Update()
    {

    }

    IEnumerator SpawnTarget() {
        while(true) {
            yield return new WaitForSeconds(spawnRate);
            int index = Random.Range(0, targets.Count);
            Instantiate(targets[index]);
        }
    }

    public void UpdateScore(int scoreToAdd) {
      score += scoreToAdd;
      scoreText.text = "Score: " + score;
    }

    public void GameOver() {
      SceneManager.LoadSceneAsync("Game Over");
    }


}
