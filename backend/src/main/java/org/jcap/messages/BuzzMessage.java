package org.jcap.messages;

import org.jcap.Client;
import org.jcap.GameData;
import org.jcap.GameSessionManager;
import org.jcap.endpoints.FrontEndBuzzerQueueEndpoint;

import java.util.List;

public class BuzzMessage implements Message {
    @Override
    public String processMessage(Client client, SimpleMessage simpleMessage) {
        GameSessionManager gameSessionManager = GameSessionManager.getInstance();
        String gameCode = gameSessionManager.getGameCodeBySessionId(client.getSessionId());
        GameData gameData =  gameSessionManager.getGameDataByGameCode(gameCode);
        if (gameData.getFirstClicker() == null)
            gameData.setFirstClicker(client.getSessionId());
        List<Integer> sessionsToSendFirstClicker = gameData.getAllClientsInThisGameData();
        for (Integer integer : sessionsToSendFirstClicker) {
            FrontEndBuzzerQueueEndpoint.sendToSpecificSession(integer, new SimpleMessage(MessageTypes.BUZZ, gameData.getNameOfFirstClicker()));
        }
        return "success";
    }

    @Override
    public String getMsgTypeIdentifier() {
        return null;
    }
}
