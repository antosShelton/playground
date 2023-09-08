Papier kamień nożyce.

1. Rejestracja graczy - było
2. Sprawdzenie czy gracz przesłał user_id do uwierzytelnienia przez express-middleware!! https://expressjs.com/en/guide/using-middleware.html
3. Gracz rozpoczyna grę zapraszając innego gracza.
4. Gracz może być tylko w jednej grze jednocześnie.
5. Gracze wysyłają papier, kamień albo nożyce.
6. Serwer rozstrzyga jaki jest wynik
7. Gracze grają 4 rundy - jeśli jest remis, grają piątą. Każdy symbol wysyłany jest innym requestem.
8. Na serwerze powinno się toczyć wiele gier jednoczeście i nie powinny one na siebie wpływać