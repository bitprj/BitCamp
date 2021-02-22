using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class DifficultyButton : MonoBehaviour
{
    private Button button;
    public int difficulty;
    private SceneLoader sceneLoader;

    // Start is called before the first frame update
    void Start()
    {
      button = GetComponent<Button>();
      button.onClick.AddListener(SetDifficulty);
      sceneLoader = GameObject.Find("Scene Loader").GetComponent<SceneLoader>();
    }

    // Update is called once per frame
    void Update()
    {

    }

    void SetDifficulty() {
      Debug.Log(gameObject.name + " was clicked");
      sceneLoader.StartGame(difficulty);
    }
}
