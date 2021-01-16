using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Pausing : MonoBehaviour
{
    public PlayerMovement playerMovement;
    public MoveView moveView;
    public GameObject inventoryMenu;

    // Start is called before the first frame update
    void Start()
    {
        UpdateValues();
    }

    // Update is called once per frame
    void Update()
    {
        if(Input.GetKeyDown(KeyCode.I))
        {
            StaticVariables.paused = !StaticVariables.paused;
            UpdateValues();
        }
    }

    void UpdateValues()
    {
        if (StaticVariables.paused)
        {
            Cursor.lockState = CursorLockMode.None;
        }
        else
        {
            Cursor.lockState = CursorLockMode.Locked;
        }

        inventoryMenu.GetComponent<InventoryUI>().UpdateUI();
        playerMovement.enabled = moveView.enabled = !StaticVariables.paused;
        inventoryMenu.SetActive(StaticVariables.paused);
    }
}
