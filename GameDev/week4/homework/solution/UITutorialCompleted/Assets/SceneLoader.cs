using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoader : MonoBehaviour
{
    public int difficulty;

    // Start is called before the first frame update
    void Start()
    {
      DontDestroyOnLoad(this.gameObject);
    }

    // Update is called once per frame
    void Update()
    {

    }

    public void StartGame(int difficultyValue) {
      difficulty = difficultyValue;
      SceneManager.LoadSceneAsync("Main Game");
    }

}
