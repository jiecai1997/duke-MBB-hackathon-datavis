-- execute below SQL on CSV files using queryscsv.py

SELECT
  season as last_season,
  oppid,
  opponent,
  round(round(sum(outcome = 'W'),2)/count(outcome)*100, 2) as winp_total,
  sum(outcome = 'W') as w_total,
  sum(outcome = 'L') as l_total,
  round(round(sum(outcome = 'W' and loc_game_info = 'H'),2)/sum(loc_game_info = 'H')*100, 2) as winp_home,
  sum(outcome = 'W' and loc_game_info = 'H') as w_home,
  sum(outcome = 'L' and loc_game_info = 'H') as l_home,
  round(round(sum(outcome = 'W' and loc_game_info!= 'H'),2)/sum(loc_game_info!= 'H')*100, 2) as winp_away,
  sum(outcome = 'W' and loc_game_info!= 'H') as w_away,
  sum(outcome = 'L' and loc_game_info!= 'H') as l_away,
  round(avg(tp),2) as tp_avg,
  round(avg(fg),2) as fg_avg,
  round(avg(fg3),2) as fg3_avg,
  round(avg(ft),2) as ft_avg,
  round(avg(oreb),2) as oreb_avg,
  round(avg(dreb),2) as dreb_avg,
  round(avg(ast),2) as ast_avg,
  round(avg(blk),2) as blk_avg,
  round(avg(stl),2) as stl_avg

  FROM
  (SELECT
    cast(REPLACE(season4, ',', '') as int) as season,
    cast(REPLACE(opponent_game_info, ',', '') as int) as oppid,
    opponent,
    outcome,
    loc_game_info,
    sum(tp) as tp,
    sum(fg) as fg,
    sum(fg3) as fg3,
    sum(ft) as ft,
    sum(oreb) as oreb,
    sum(dreb) as dreb,
    sum(ast) as ast,
    sum(blk) as blk,
    sum(stl) as stl

  FROM
    opp_data_2018

  WHERE
    cast(REPLACE(season4, ',', '') as int) >= 2009
    AND cast(REPLACE(season4, ',', '') as int) <= 2018

  GROUP BY gameid)

GROUP BY opponent
ORDER BY season;
