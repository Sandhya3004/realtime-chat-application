package jar.controller;

import jar.model.Message;
import jar.repository.MessageRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin
public class MessageController {

    private final MessageRepository messageRepository;

    public MessageController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @PostMapping
    public Message sendMessage(@RequestBody Message message) {
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }

    @GetMapping("/{sender}/{receiver}")
    public List<Message> getConversation(
            @PathVariable String sender,
            @PathVariable String receiver) {

        List<Message> sent =
                messageRepository.findBySenderAndReceiver(sender, receiver);

        List<Message> received =
                messageRepository.findByReceiverAndSender(sender, receiver);

        sent.addAll(received);
        return sent;
    }
}
