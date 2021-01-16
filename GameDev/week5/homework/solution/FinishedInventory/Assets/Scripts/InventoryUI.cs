using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class InventoryUI : MonoBehaviour
{
    public Transform itemsParent;

    Inventory inventory;

    Transform[] slots;

    // Start is called before the first frame update
    void Awake()
    {
        slots = new Transform[itemsParent.childCount];
        inventory = Inventory.instance;
        inventory.onItemChangedCallback += UpdateUI;

        for (int i = 0; i < itemsParent.childCount; i++)
        {
            slots[i] = itemsParent.GetChild(i);
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void UpdateUI ()
    {
        for(int i = 0; i < slots.Length; i++)
        {
            if(i < inventory.items.Count)
            {
                slots[i].GetComponent<InventorySlot>().AddItem(inventory.items[i]);
                slots[i].GetComponent<Button>().enabled = true;
            }
            else
            {
                slots[i].GetComponent<InventorySlot>().ClearSlot();
                slots[i].GetComponent<Button>().enabled = false;
            }
        }
    }
}
