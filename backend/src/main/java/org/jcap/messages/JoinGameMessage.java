package org.jcap.messages;

import com.google.gson.internal.LinkedTreeMap;
import org.jcap.GameSessionManager;
import org.jcap.endpoints.FrontEndBuzzerQueueEndpoint;

import javax.websocket.Session;

public class JoinGameMessage implements Message {
    private final String identifier = "JOINGAME";

    @Override
    public String processMessage(Session session, SimpleMessage simpleMessage) {
        GameSessionManager gameSessionManager = GameSessionManager.getInstance();
        if (!isMessageContentIsLinkedTreeMap(simpleMessage)) {
            System.out.println("SimpleMessage.content wrong format");
            return null;
        }
        LinkedTreeMap linkedTreeMapContent = (LinkedTreeMap) simpleMessage.getContent();
        gameSessionManager.addGuestToExistingGame(FrontEndBuzzerQueueEndpoint.HexToInt(session.getId()),
                linkedTreeMapContent.get("guestName").toString(),
                linkedTreeMapContent.get("gameCode").toString());
        FrontEndBuzzerQueueEndpoint.sendToSpecificSession(
                gameSessionManager.getHostSessionIdOfExistingGameByGameCode(linkedTreeMapContent.get("gameCode").toString()),
                new SimpleMessage(MessageTypes.HOST_JOINGAME,
                        gameSessionManager.getGameDataByGameCode(linkedTreeMapContent.get("gameCode").toString()).getGuestNames())
        );
        return identifier;
    }

    @Override
    public String getMsgTypeIdentifier() {
        return this.identifier;
    }

    private boolean isMessageContentIsLinkedTreeMap (SimpleMessage simpleMessage) {
        return simpleMessage.getContent().getClass().getName().contains("LinkedTreeMap");
    }
}
