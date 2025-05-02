package com.pharmasync.backend.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    private final String SECRET = "pharma-secret-pharma-secret-pharma-secret"; // mínimo 256 bits
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // extraer usuario
    public String extractUsername(String token) {
        Claims claims = Jwts
                .parser()                  // ← parser(), no parserBuilder()
                .setSigningKey(key)
                .build()                   // ← build() convierte en JwtParser
                .parseClaimsJws(token)     // ← ahora sí parseClaimsJws()
                .getBody();
        return claims.getSubject();
    }

    // validar token
    public boolean validateToken(String token) {
        try {
            Jwts
                    .parser()                  // ← parser()
                    .setSigningKey(key)
                    .build()                   // ← build()
                    .parseClaimsJws(token);    // ← parseClaimsJws()
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
