
package jar.controller;

import jar.model.Message;
import jar.repository.MessageRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.handler.annotation.Payload;
import java.util.*;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;


@Controller
public class ChatWebSocketController {

    private final MessageRepository repository;
    private final SimpMessagingTemplate messagingTemplate;
    private final Map<String, Set<String>> roomUsers = new ConcurrentHashMap<>();
    public ChatWebSocketController(MessageRepository repository,
                                   SimpMessagingTemplate messagingTemplate) {
        this.repository = repository;
        this.messagingTemplate = messagingTemplate;
    }
@MessageMapping("/chat.send")
public void sendMessage(@Payload Message message) {

    // 🔐 Prevent NullPointerException
    if (message == null || message.getRoom() == null || message.getType() == null) {
        return;
    }

    String room = message.getRoom();

    if ("JOIN".equals(message.getType())) {

        message.setTimestamp(LocalDateTime.now());
        roomUsers.putIfAbsent(room, ConcurrentHashMap.newKeySet());
        roomUsers.get(room).add(message.getSender());

        messagingTemplate.convertAndSend(
                "/topic/room." + room,
                message
        );

        messagingTemplate.convertAndSend(
                "/topic/room." + room + ".users",
                roomUsers.get(room)
        );

    } else if ("LEAVE".equals(message.getType())) {

        if (roomUsers.containsKey(room)) {
            message.setTimestamp(LocalDateTime.now());
            roomUsers.get(room).remove(message.getSender());

            if (roomUsers.get(room).isEmpty()) {
                roomUsers.remove(room);
            }
        }

        messagingTemplate.convertAndSend(
                "/topic/room." + room,
                message
        );

        // 🔐 Send empty set instead of null
        messagingTemplate.convertAndSend(
                "/topic/room." + room + ".users",
                roomUsers.getOrDefault(room, Collections.emptySet())
        );

    } else {

        // Normal chat message
        messagingTemplate.convertAndSend(
                "/topic/room." + room,
                message
        );
    }
}
}
