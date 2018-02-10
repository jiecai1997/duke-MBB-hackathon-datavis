-- execute below SQL on CSV files using queryscsv.py

SELECT
  gameid,
  opponent,
  sum(tp) as tp,
  sum(fg) as fg,
  sum(fg3) as fg3,
  sum(ft) as ft,
  sum(treb) as treb,
  sum(ast) as ast,
  sum(blk) as blk,
  sum(stl) as stl,
  sum(pf) as pf

FROM
  opponent_data_2018

WHERE

  season4 = '2,018'

GROUP BY gameid
ORDER BY season4;
