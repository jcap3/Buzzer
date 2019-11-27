package endpoints;

import com.google.gson.Gson;
import messages.decoders.StringMessageDecoder;
import messages.encoders.StringMessageEncoder;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;

@ServerEndpoint(value = "/create-game", decoders = StringMessageDecoder.class, encoders = StringMessageEncoder.class)
public class FrontEndBuzzerQueueEndpoint {

    private static HashMap<Integer, Session> frontEndSession = new HashMap<>();
    private Gson gson = new Gson();

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("new game initiated");
        frontEndSession.put(Integer.parseInt(session.getId()), session);
    }

    @OnMessage
    public void onMessage(Session session, String message) {
        System.out.println(message);
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("FE disconnected");
        try{
            frontEndSession.remove(Integer.parseInt(session.getId()));
        }catch (NumberFormatException e) {
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
            //
        }
    }

}
