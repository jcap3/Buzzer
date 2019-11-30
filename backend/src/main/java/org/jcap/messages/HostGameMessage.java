package org.jcap.messages;

import com.google.gson.JsonObject;
import org.jcap.GameSessionManager;
import org.jcap.endpoints.FrontEndBuzzerQueueEndpoint;

import javax.websocket.Session;

public class HostGameMessage implements Message {
    private final String msgTypeIdentifier = "HOSTGAME";

    @Override
    public String processMessage(Session session) {
        GameSessionManager gameSessionManager = GameSessionManager.getInstance();
        String generatedGameCode = gameSessionManager.generateUniqueGameCode();
        try {
            gameSessionManager.addGame(generatedGameCode, FrontEndBuzzerQueueEndpoint.HexToInt(session.getId()));
        }catch (Exception e) {
            e.printStackTrace();
        }
        FrontEndBuzzerQueueEndpoint.sendToSpecificSession(FrontEndBuzzerQueueEndpoint.HexToInt(session.getId()),
                FrontEndBuzzerQueueEndpoint.messageBuilder(MessageTypes.HOSTGAME, generatedGameCode));
        return generatedGameCode;
    }

    @Override
    public String getMsgTypeIdentifier() {
        return this.msgTypeIdentifier;
    }

}
