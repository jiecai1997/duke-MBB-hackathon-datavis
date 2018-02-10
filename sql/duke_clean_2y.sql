-- execute below SQL on CSV files using queryscsv.py

SELECT
  season,
  opponent,
  round(avg(tp),2) as tp,
  round(avg(fg),2) as fg,
  round(avg(fg3),2) as fg3,
  round(avg(ft),2) as ft,
  round(avg(oreb),2) as oreb,
  round(avg(dreb),2) as dreb,
  round(avg(ast),2) as ast,
  round(avg(blk),2) as blk,
  round(avg(stl),2) as stl

  FROM
  (SELECT
    cast(REPLACE(season4, ',', '') as int) as season,
    opponent,
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
    duke_data_2018

  WHERE
    cast(REPLACE(season4, ',', '') as int) >= 2017
    AND cast(REPLACE(season4, ',', '') as int) <= 2018

  GROUP BY gameid)

GROUP BY opponent
ORDER BY season;
