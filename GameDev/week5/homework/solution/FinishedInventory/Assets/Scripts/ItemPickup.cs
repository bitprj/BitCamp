using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ItemPickup : MonoBehaviour
{
    public Item item;
    public SpriteRenderer image;
    Inventory inventory;
    ActionText actionText;

    private void Awake()
    {
        image.sprite = item.icon;
    }

    private void Start()
    {
        actionText = GameObject.Find("ActionText").GetComponent<ActionText>();
        inventory = Inventory.instance;
    }

    private void OnTriggerEnter(Collider other)
    {
        if(other.gameObject.name.Equals("Player"))
        {
            if (inventory.Add(item))
            {
                actionText.ShowText("Picked up " + item.name + ".");
                Destroy(gameObject);
            } 
        }
    }
}
