package jar.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {

    private String sender;
    private String receiver;
    private String content;
    private String type; // CHAT, JOIN, LEAVE
}
