package org.jcap;

public enum ClientTypes {
    HOST(0), GUEST(1);

    private Integer codeEquivalent;

    public Integer getCodeEquivalent() {
        return codeEquivalent;
    }

    private ClientTypes(Integer codeEquivalent) {
        this.codeEquivalent = codeEquivalent;
    }
}
