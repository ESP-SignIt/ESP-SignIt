using UnityEngine;
using NativeWebSocket;
using System.Collections;

public class SendVideoFrames : MonoBehaviour
{
    private WebSocket websocket;
    public int frameRate = 10; // frames per second
    private bool isStreaming = false;
    private string ipServer = "ws://26.9.101.104";

    async void Start()
    {
        websocket = new WebSocket(ipServer);

        websocket.OnOpen += () =>
        {
            Debug.Log("WebSocket Connected");
            isStreaming = true;
            StartCoroutine(SendVideoLoop());
        };

        websocket.OnError += (err) => Debug.LogError("WebSocket Error: " + err);
        websocket.OnClose += (e) => Debug.Log("WebSocket Closed");

        await websocket.Connect();
    }

    IEnumerator SendVideoLoop()
    {
        while (isStreaming)
        {
            yield return new WaitForSeconds(1f / frameRate);
            SendFrame();
        }
    }

    void SendFrame()
    {
        Debug.Log("sending");
        Texture2D tex = gameObject.GetComponent<Renderer>().material.mainTexture as Texture2D;
        //Texture2D tex = new Texture2D(Screen.width, Screen.height, TextureFormat.RGB24, false);
        //tex.ReadPixels(new Rect(0, 0, Screen.width, Screen.height), 0, 0);
        //tex.Apply();

        if (tex != null)
        {
            byte[] jpg = tex.EncodeToJPG();
            websocket.Send(jpg);
        }

        // byte[] bytes = tex.EncodeToJPG(50); // you can use PNG too
        // Destroy(tex);

        // if (websocket.State == WebSocketState.Open)
        // {
        //     websocket.Send(bytes); // send as binary
        // }
    }

    async void OnApplicationQuit()
    {
        isStreaming = false;
        await websocket.Close();
    }
}