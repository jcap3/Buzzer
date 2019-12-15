package org.jcap.messages;

import com.google.gson.JsonObject;
import org.jcap.Client;
import org.jcap.ClientTypes;
import org.jcap.GameData;
import org.jcap.GameSessionManager;
import org.jcap.endpoints.FrontEndBuzzerQueueEndpoint;
import org.jcap.objects.GameCodeAndGuests;

public class HostGameStartGameMessage implements Message {
    @Override
    public String processMessage(Client client, SimpleMessage simpleMessage) {
        GameSessionManager gameSessionManager = GameSessionManager.getInstance();
        String gameCode = gameSessionManager.getGameCodeBySessionId(client.getSessionId());
        GameData gameData =  gameSessionManager.getGameDataByGameCode(gameCode);
        for (Integer guestId : gameData.getGuests().keySet()) {
            GameCodeAndGuests gameCodeAndGuests = new GameCodeAndGuests(gameCode, gameData.getGuestNames(), gameData.getGuests().get(guestId));
            FrontEndBuzzerQueueEndpoint.sendToSpecificSession(guestId, new SimpleMessage(MessageTypes.HOST_START_GAME, gameCodeAndGuests));
        }

        return "success";
    }

    @Override
    public String getMsgTypeIdentifier() {
        return null;
    }
}
