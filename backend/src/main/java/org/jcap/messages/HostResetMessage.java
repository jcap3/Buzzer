package org.jcap.messages;

import org.jcap.Client;
import org.jcap.GameData;
import org.jcap.GameSessionManager;
import org.jcap.endpoints.FrontEndBuzzerQueueEndpoint;

public class HostResetMessage implements Message {
    @Override
    public String processMessage(Client client, SimpleMessage simpleMessage) {
        GameSessionManager gameSessionManager = GameSessionManager.getInstance();
        String gameCode = gameSessionManager.getGameCodeBySessionId(client.getSessionId());
        GameData gameData =  gameSessionManager.getGameDataByGameCode(gameCode);
        gameData.setFirstClicker(null);
        for (Integer integer : gameData.getAllClientsInThisGameData()) {
            FrontEndBuzzerQueueEndpoint.sendToSpecificSession(integer, new SimpleMessage(MessageTypes.HOST_RESET, null));
        }

        return "success";
    }

    @Override
    public String getMsgTypeIdentifier() {
        return null;
    }
}
