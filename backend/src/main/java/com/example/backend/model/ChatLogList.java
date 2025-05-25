package com.example.backend.model;

import com.example.backend.entity.ChatLog;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlElement;

import java.util.List;

@XmlRootElement(name="chatLogs")
public class ChatLogList {
    private List<ChatLog> chatLog;
    public ChatLogList() {}
    public ChatLogList(List<ChatLog> chatLog) { this.chatLog = chatLog; }
    @XmlElement(name="chatLog")
    public List<ChatLog> getChatLog() { return chatLog; }
    public void setChatLog(List<ChatLog> chatLog) { this.chatLog = chatLog; }
}
