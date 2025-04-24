using UnityEngine;
using NativeWebSocket;

public class WebSocketTest : MonoBehaviour
{
    WebSocket websocket;

    private string ipServer = "ws://192.168.235.159:8081";

    async void Start()
    {
        websocket = new WebSocket(ipServer);
        Debug.Log("websocket is :" + websocket);
        websocket.OnOpen += () =>
        {
            Debug.Log("WebSocket connected!");
            websocket.SendText("Unity connected via manual install");
        };

        websocket.OnError += (err) => Debug.LogError("WebSocket error: " + err);
        websocket.OnClose += (e) => Debug.Log("WebSocket closed");
        websocket.OnMessage += (bytes) =>
        {
            string msg = System.Text.Encoding.UTF8.GetString(bytes);
            Debug.Log("Message from server: " + msg);
        };

        await websocket.Connect();
    }

    //void Update() => websocket?.DispatchMessageQueue();

    async void OnApplicationQuit() => await websocket.Close();
}