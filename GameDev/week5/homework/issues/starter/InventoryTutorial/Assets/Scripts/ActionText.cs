using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class ActionText : MonoBehaviour
{
    public void ShowText(string text)
    {
        gameObject.GetComponent<TextMeshProUGUI>().text = text;
    }
}
