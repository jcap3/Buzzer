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

    public String generateUniqueGameCode () {
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

    public void addGame (String gameCode, Integer sessionId) throws Exception {
        if (games.keySet().contains(gameCode))
            throw new Exception("Game Code Already exist");
        else games.put(gameCode, new GameData(sessionId, new HashSet<>()));
        System.out.println("Added: "+printGames());
    }

    public void removeGame (Integer sessionId) throws Exception{
        String gameCode = getGameCodeBySessionId(sessionId);
        if (games.keySet().contains(gameCode)) {
            games.remove(gameCode);
            System.out.println("Removed: "+gameCode);
        }
        else
            throw new Exception("Game Code does not exist");
    }

    private String printGames () {
        return gson.toJson(games);
    }

    private GameSessionManager() {
        games = new HashMap<>();
    }

    private int getRandomIntegerBetweenRange(int min, int max){
        return (int)(Math.random()*((max-min)+1))+min;
    }

    private char getCharacterEquivalentOfInteger(int givenInteger) {
        return (char)givenInteger;
    }

    private String getGameCodeBySessionId (Integer sessionId) {
        for (String gameCode : games.keySet()) {
            if (games.get(gameCode).getHostSessionId().equals(sessionId))
                return gameCode;
        }
        return null;
    }

}
