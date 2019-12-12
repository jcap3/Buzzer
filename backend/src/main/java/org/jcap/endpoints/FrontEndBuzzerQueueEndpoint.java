package org.jcap.endpoints;

import com.google.gson.Gson;
import org.jcap.Client;
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

    private static HashMap<Integer, Client> frontEndSession = new HashMap<>();
    private GameSessionManager gameSessionManager = GameSessionManager.getInstance();
    private Gson gson = new Gson();

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("FE connected! Session id: " + session.getId());
        frontEndSession.put(HexToInt(session.getId()), new Client(session));
        // temp printouts
        System.out.println("session size: " + frontEndSession.size());
        System.out.println("Games on memory: " + gameSessionManager.printGames());

    }

    @OnMessage
    public void onMessage(Session session, SimpleMessage message) {
        Message messageType = message.getMessageType().getMsgTypeEquivalent();
        messageType.processMessage(frontEndSession.get(HexToInt(session.getId())), message);
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("FE disconnected");
        gameSessionManager.removeGame(getClientBySessionId(HexToInt(session.getId())));
        gameSessionManager.removeGuestToExistingGame(HexToInt(session.getId()), gameSessionManager.getGameCodeBySessionId(HexToInt(session.getId())));
        frontEndSession.remove(HexToInt(session.getId()));
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.out.println("Error occurred: " + throwable.getMessage() + "\n" + "Caused by: " + throwable.getCause());
    }

    public static void broadcast(String jsonMessage) {
        try {
            for (Integer key : frontEndSession.keySet())
                frontEndSession.get(key).getSession().getBasicRemote().sendObject(jsonMessage);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
    }

    public static void sendToSpecificSession(Integer frontEndSessionId, SimpleMessage simpleMessage) {
        try {
            frontEndSession.get(frontEndSessionId).getSession().getBasicRemote().sendObject(simpleMessage);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
    }

    public static Integer HexToInt(String generatedHexSessiodId) {
        return Integer.parseInt(generatedHexSessiodId, 16);
    }

    private Client getClientBySessionId (Integer sessionId) {
        return frontEndSession.get(sessionId);
    }

}
