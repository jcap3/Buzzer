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
    private Integer firstClicker;

    GameData(Integer hostSessionId, HashMap<Integer, String> guests) {
        this.hostSessionId = hostSessionId;
        this.guests = guests;
        this.isActive = true;
        firstClicker = null;
    }

    public GameData() {
    }



    public Integer getFirstClicker() {
        return firstClicker;
    }

    public String getNameOfFirstClicker () {
        return guests.get(this.firstClicker);
    }

    public List<Integer> getAllClientsInThisGameData() {
        List<Integer> allSessionIds = new ArrayList<>();
        allSessionIds.add(hostSessionId);
        allSessionIds.addAll(guests.keySet());
        return allSessionIds;
    }

    public void setFirstClicker(Integer firstClicker) {
        this.firstClicker = firstClicker;
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

