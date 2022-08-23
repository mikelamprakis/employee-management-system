package com.example.demo.entities.enums;

public enum RequestStatus {
    PENDING_FOR_APPROVAL("PENDING FOR APPROVAL"),
    APPROVED("APPROVED"),
    REJECTED("REJECTED");

    private String name;
    private RequestStatus(String type) {
        name = type;
    }

    public String getName() {
        return name;
    }

    public static String getCategory(int index){
        return RequestStatus.values()[index].toString();
    }
}
