using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class InventorySlot : MonoBehaviour
{
    public Image icon;

    GameObject heldItem;

    Item item;

    // Start is called before the first frame update
    void Awake()
    {
        heldItem = GameObject.Find("HeldItem");
    }

    public void SlotFilled (Item newItem)
    {
        item = newItem;

        icon.sprite = item.icon;
        icon.enabled = true;
    }

    public void SlotClear()
    {
        item = null;

        icon.sprite = null;
        icon.enabled = false;
    }

    public void OnPressed()
    {
        if(heldItem.GetComponent<SpriteRenderer>().sprite != icon.sprite)
        {
            heldItem.GetComponent<SpriteRenderer>().sprite = icon.sprite;
        }
        else
        {
            heldItem.GetComponent<SpriteRenderer>().sprite = null;
        }
    }
}
