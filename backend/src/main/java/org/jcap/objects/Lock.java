package org.jcap.objects;

public class Lock {
    private static Lock ourInstance = new Lock();

    public static Lock getInstance() {
        return ourInstance;
    }

    private Lock() {
    }
}
