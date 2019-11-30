package org.jcap.endpoints;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.jcap.messages.Message;
import org.jcap.messages.MessageTypes;
import org.jcap.messages.decoders.StringMessageDecoder;
import org.jcap.messages.encoders.StringMessageEncoder;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import org.jcap.GameSessionManager;

@ServerEndpoint(value = "/connect", decoders = StringMessageDecoder.class, encoders = StringMessageEncoder.class)
public class FrontEndBuzzerQueueEndpoint {

    private static HashMap<Integer, Session> frontEndSession = new HashMap<>();
    private GameSessionManager gameSessionManager = GameSessionManager.getInstance();
    private Gson gson = new Gson();

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("FE connected: " + session.getId());
        frontEndSession.put(HexToInt(session.getId()), session);
        // temp printouts
        System.out.println("session size: "+frontEndSession.size());

    }

    @OnMessage
    public void onMessage(Session session, String message) {
        Message messageType = MessageTypes.valueOf(message).getMsgTypeEquivalent();
        messageType.processMessage(frontEndSession.get(HexToInt(session.getId())));
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("FE disconnected");
        try{
            frontEndSession.remove(HexToInt(session.getId()));
            GameSessionManager.getInstance().removeGame(HexToInt(session.getId()));
        }catch (Exception e) {
            System.out.println(frontEndSession.toString());
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.out.println("Error occurred: " + throwable.getMessage() + "\n" + "Caused by: "+throwable.getCause());
    }

    public static void broadcast(String jsonMessage) {
        try {
            for(Integer key : frontEndSession.keySet())
                frontEndSession.get(key).getBasicRemote().sendObject(jsonMessage);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
    }

    public static void sendToSpecificSession (int frontEndSessionId, String jsonMessage) {
        try {
            frontEndSession.get(frontEndSessionId).getBasicRemote().sendObject(jsonMessage);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
    }

    public static String messageBuilder (MessageTypes messageTypes, String content) {
        JsonObject object = new JsonObject();
        object.addProperty("messageType", messageTypes.toString());
        object.addProperty("content", content);
        return object.toString();
    }
    
    public static Integer HexToInt(String generatedHexSessiodId) {
        return Integer.parseInt(generatedHexSessiodId, 16);
    }

}
