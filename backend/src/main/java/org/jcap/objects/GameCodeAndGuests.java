package org.jcap.objects;

import com.google.gson.JsonObject;

import java.util.List;

public class GameCodeAndGuests {
    String gameCode;
    List<JsonObject> guestNames;
    String myName;

    public GameCodeAndGuests(String gameCode, List<JsonObject> guestNames, String myName) {
        this.gameCode = gameCode;
        this.guestNames = guestNames;
        this.myName = myName;
    }

    public String getGameCode() {
        return gameCode;
    }

    public List<JsonObject> getGuestNames() {
        return guestNames;
    }

    public String getMyName() {
        return myName;
    }
}
