SELECT DISTINCT d.gameid_game_info, d.opponent, d.headcoach, d.oppcoach, d.season4, d.dukescore, d.oppscore
FROM duke_data_2018 d, opponent_data_2018 o
WHERE d.gameid_game_info = o.gameid_game_info
AND d.oppcoachid = o.oppcoachid
AND d.oppcoach != ""
ORDER BY d.season4;
