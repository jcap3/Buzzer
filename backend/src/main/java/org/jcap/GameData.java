package org.jcap;

import java.util.Set;

public class GameData {
    private Integer hostSessionId;
    private Set<String> guests;
    private boolean isActive;

    GameData(Integer hostSessionId, Set<String> guests) {
        this.hostSessionId = hostSessionId;
        this.guests = guests;
        this.isActive = true;
    }

    public GameData() {
    }

    Integer getHostSessionId() {
        return hostSessionId;
    }

    public Set<String> getGuests() {
        return guests;
    }

    public boolean isActive() {
        return isActive;
    }
}

