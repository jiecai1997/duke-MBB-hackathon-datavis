SELECT DISTINCT  d.opponent, d.headcoach, d.oppcoach
FROM duke_data_2018 d, opponent_data_2018 o
WHERE d.gameid_game_info = o.gameid_game_info
AND d.coach = "Mike Krzyzewski"
AND d.oppcoachid = o.oppcoachid
AND d.oppcoach != ""
ORDER BY d.season4;
