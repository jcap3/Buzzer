package org.jcap;

import com.google.gson.Gson;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

public class GameSessionManager {

    private volatile HashMap<String, GameData> games; // <String gameCode, GameData gameData>
    private static GameSessionManager ourInstance = new GameSessionManager();
    private Gson gson = new Gson();

    public static GameSessionManager getInstance() {
        return ourInstance;
    }

    public String generateUniqueGameCode() {
        StringBuilder gameCode;
        do {
            gameCode = new StringBuilder();
            for (int i = 0; i < 6; i++) {
                gameCode.append(i < 3 ? getCharacterEquivalentOfInteger(getRandomIntegerBetweenRange(65, 90)) :
                        String.valueOf(getRandomIntegerBetweenRange(0, 9)));
            }
        } while (games.keySet().contains(gameCode.toString()));
        return gameCode.toString();
    }

    public void addGame(String gameCode, Integer sessionId) throws Exception {
        if (games.keySet().contains(gameCode))
            throw new Exception("Game Code Already exist");
        else games.put(gameCode, new GameData(sessionId, new HashMap<>()));
        System.out.println("Games on memory: " + printGames());
    }

    public void removeGame(Integer sessionId) throws Exception {
        String gameCode = getGameCodeBySessionId(sessionId);
        if (games.keySet().contains(gameCode)) {
            games.remove(gameCode);
            System.out.println("Removed: " + gameCode);
        } else
            throw new Exception("Game Code does not exist");
    }

    public void addGuestToExistingGame(Integer guestSessionId, String guestName, String gameCode) {
        for (String key : games.keySet()) {
            if (key.equals(gameCode)) {
                games.get(key).getGuests().put(guestSessionId, guestName);
            }
        }
    }

    public void removeGuestToExistingGame(Integer guestSessionId, String gameCode) {
        for (String key : games.keySet()) {
            if (key.equals(gameCode)) {
                games.get(key).getGuests().remove(guestSessionId);
            }
        }
    }

    public String getGameCodeBySessionId(Integer sessionId) {
        for (String gameCode : games.keySet()) {
            if (games.get(gameCode).getHostSessionId().equals(sessionId))
                return gameCode;
        }
        return null;
    }

    public Integer getHostSessionIdOfExistingGameByGameCode(String gameCode) {
        return games.get(gameCode).getHostSessionId();
    }

    public GameData getGameDataByGameCode(String gameCode) {
        return games.get(gameCode);
    }

    public String printGames() {
        return gson.toJson(games);
    }

    private GameSessionManager() {
        games = new HashMap<>();
    }

    private int getRandomIntegerBetweenRange(int min, int max) {
        return (int) (Math.random() * ((max - min) + 1)) + min;
    }

    private char getCharacterEquivalentOfInteger(int givenInteger) {
        return (char) givenInteger;
    }


}
