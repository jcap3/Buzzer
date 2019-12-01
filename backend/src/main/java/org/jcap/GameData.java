package org.jcap;

import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

public class GameData {
    private Integer hostSessionId;
    private HashMap<Integer, String> guests; // <guestSessionId, guestName>
    private boolean isActive;

    GameData(Integer hostSessionId, HashMap<Integer, String> guests) {
        this.hostSessionId = hostSessionId;
        this.guests = guests;
        this.isActive = true;
    }

    public GameData() {
    }

    public Integer getHostSessionId() {
        return hostSessionId;
    }

    public HashMap<Integer, String> getGuests() {
        return guests;
    }

    public boolean isActive() {
        return isActive;
    }

    public List<JsonObject> getGuestNames () {
        List<JsonObject> guestNames = new ArrayList<>();
        for (String guestName : guests.values()) {
            JsonObject jsonObject  = new JsonObject();
            jsonObject.addProperty("guestName", guestName);
            guestNames.add(jsonObject);
        }
        return guestNames;
    }
}

