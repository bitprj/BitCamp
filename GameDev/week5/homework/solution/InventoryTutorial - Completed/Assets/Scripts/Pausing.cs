using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Pausing : MonoBehaviour
{
    public bool paused = false;
    public PlayerMovement playerMovement;
    public MoveView moveView;
    public GameObject pauseMenu;

    // Start is called before the first frame update
    void Start()
    {
        UpdateWhenPauseUnpause();
    }

    // Update is called once per frame
    void Update()
    {
        if(Input.GetKeyDown(KeyCode.I))
        {
            paused = !paused;
            UpdateWhenPauseUnpause();
        }
    }

    void UpdateWhenPauseUnpause()
    {
        if (paused)
        {
            Cursor.lockState = CursorLockMode.None;
        }
        else
        {
            Cursor.lockState = CursorLockMode.Locked;
        }

        pauseMenu.GetComponent<InventoryUI>().UpdateButtons();
        playerMovement.enabled = moveView.enabled = !paused;
        pauseMenu.SetActive(paused);
    }
}
