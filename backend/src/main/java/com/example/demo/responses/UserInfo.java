package com.example.demo.responses;

public class UserInfo {

	private long userId;
	private String firstName;
	private String lastName;
	private String userName;
	
	private Object roles;
	private Object chats;

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Object getRoles() {
		return roles;
	}

	public void setRoles(Object roles) {
		this.roles = roles;
	}

	public Object getChats() {
		return chats;
	}

	public void setChats(Object chats) {
		this.chats = chats;
	}
}
