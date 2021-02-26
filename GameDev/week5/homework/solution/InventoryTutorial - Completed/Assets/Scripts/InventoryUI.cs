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
        for (int i = 0; i < itemsParent.childCount; i++)
        {
            slots[i] = itemsParent.GetChild(i);
        }

        inventory = Inventory.instance;
        inventory.onItemChangedCallback = UpdateButtons;
    }

    public void UpdateButtons()
    {
        for(int i = 0; i < slots.Length; i++)
        {
            if(i < inventory.items.Count)
            {
                slots[i].GetComponent<InventorySlot>().SlotFilled(inventory.items[i]);
            }
            else
            {
                slots[i].GetComponent<InventorySlot>().SlotClear();
            }

            slots[i].GetComponent<Button>().enabled = (i < inventory.items.Count);
        }
    }
}
