package jar.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender;
    private String type; // JOIN, CHAT, LEAVE
    private String receiver;

    private String content;
    private String room;

    private LocalDateTime timestamp = LocalDateTime.now();

    public Long getId() { return id; }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getReceiver() { return receiver; }
    public void setReceiver(String receiver) { this.receiver = receiver; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;}
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getRoom() { return room; }
    public void setRoom(String room) { this.room = room; }


}
