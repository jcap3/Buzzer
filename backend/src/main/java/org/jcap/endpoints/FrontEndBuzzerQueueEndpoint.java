package org.jcap.endpoints;

import com.google.gson.Gson;
import org.jcap.messages.Message;
import org.jcap.messages.SimpleMessage;
import org.jcap.messages.decoders.SimpleMessageDecoder;
import org.jcap.messages.decoders.StringMessageDecoder;
import org.jcap.messages.encoders.SimpleMessageEncoder;
import org.jcap.messages.encoders.StringMessageEncoder;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;

import org.jcap.GameSessionManager;

@ServerEndpoint(value = "/connect", decoders = {StringMessageDecoder.class, SimpleMessageDecoder.class},
        encoders = {StringMessageEncoder.class, SimpleMessageEncoder.class})
public class FrontEndBuzzerQueueEndpoint {

    private static HashMap<Integer, Session> frontEndSession = new HashMap<>(); // improvement, create object to handle clients that will contain the Session and has a client type of either Host or Guest
    private GameSessionManager gameSessionManager = GameSessionManager.getInstance();
    private Gson gson = new Gson();

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("FE connected: " + session.getId());
        frontEndSession.put(HexToInt(session.getId()), session);
        // temp printouts
        System.out.println("session size: " + frontEndSession.size());
        System.out.println("Games on memory: "+ gameSessionManager.printGames());

    }

    @OnMessage
    public void onMessage(Session session, SimpleMessage message) {
        Message messageType = message.getMessageType().getMsgTypeEquivalent();
        messageType.processMessage(frontEndSession.get(HexToInt(session.getId())), message);
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("FE disconnected");
        try {
            frontEndSession.remove(HexToInt(session.getId()));
            gameSessionManager.removeGame(HexToInt(session.getId()));
            gameSessionManager.removeGuestToExistingGame(HexToInt(session.getId()), gameSessionManager.getGameCodeBySessionId(HexToInt(session.getId())));
        } catch (Exception e) {
            System.out.println(frontEndSession.toString());
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.out.println("Error occurred: " + throwable.getMessage() + "\n" + "Caused by: " + throwable.getCause());
    }

    public static void broadcast(String jsonMessage) {
        try {
            for (Integer key : frontEndSession.keySet())
                frontEndSession.get(key).getBasicRemote().sendObject(jsonMessage);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
    }

    public static void sendToSpecificSession(int frontEndSessionId, SimpleMessage simpleMessage) {
        try {
            frontEndSession.get(frontEndSessionId).getBasicRemote().sendObject(simpleMessage);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
    }

    public static Integer HexToInt(String generatedHexSessiodId) {
        return Integer.parseInt(generatedHexSessiodId, 16);
    }

}
