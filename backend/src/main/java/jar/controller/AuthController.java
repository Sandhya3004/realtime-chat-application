package jar.controller;

import jar.model.User;
import jar.repository.UserRepository;
import jar.config.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository,
                          BCryptPasswordEncoder encoder,
                          JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {

        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);

        return "User registered successfully!";
    }
@PostMapping("/login")
public String login(@RequestBody User request) {

    User user = userRepository
            .findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (encoder.matches(request.getPassword(), user.getPassword())) {

        return jwtUtil.generateToken(user.getUsername());

    } else {
        throw new RuntimeException("Invalid credentials");
    }
}

}
