package org.jcap.messages;

import com.google.gson.JsonObject;
import org.jcap.Client;
import org.jcap.ClientTypes;
import org.jcap.GameSessionManager;
import org.jcap.endpoints.FrontEndBuzzerQueueEndpoint;

import javax.websocket.Session;

public class HostGameMessage implements Message {
    private final String msgTypeIdentifier = "HOSTGAME";

    @Override
    public String processMessage(Client client, SimpleMessage simpleMessage) {
        client.setClientType(ClientTypes.HOST);
        GameSessionManager gameSessionManager = GameSessionManager.getInstance();
        String generatedGameCode = gameSessionManager.generateUniqueGameCode();
        try {
            gameSessionManager.addGame(generatedGameCode, client.getSessionId());
        }catch (Exception e) {
            e.printStackTrace();
        }
        FrontEndBuzzerQueueEndpoint.sendToSpecificSession(client.getSessionId(),
                    new SimpleMessage(MessageTypes.HOSTGAME, generatedGameCode));
        return generatedGameCode;
    }

    @Override
    public String getMsgTypeIdentifier() {
        return this.msgTypeIdentifier;
    }

}
