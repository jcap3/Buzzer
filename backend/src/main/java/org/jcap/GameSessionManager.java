package org.jcap;

import java.util.HashSet;
import java.util.Set;

public class GameSessionManager {

    private volatile Set<String> games;
    private static GameSessionManager ourInstance = new GameSessionManager();

    private GameSessionManager() {
        games = new HashSet<>();
    }

    private int getRandomIntegerBetweenRange(int min, int max){
        return (int)(Math.random()*((max-min)+1))+min;
    }

    private char getCharacterEquivalentOfInteger(int givenInteger) {
        return (char)givenInteger;
    }

    public static GameSessionManager getInstance() {
        return ourInstance;
    }

    public String generateUniqueGameCode () {
        StringBuilder gameCode;
        do {
            gameCode = new StringBuilder("");
            for (int i = 0; i < 6; i++) {
                gameCode.append(i < 3 ? getCharacterEquivalentOfInteger(getRandomIntegerBetweenRange(65, 90)) : String.valueOf(getRandomIntegerBetweenRange(0, 9)));
            }
        } while (games.contains(gameCode.toString()));
        return gameCode.toString();
    }

    public void addGame (String gameCode) throws Exception {
        if (games.contains(gameCode))
            throw new Exception("Game Code Already exist");
        else games.add(gameCode);
    }

}
