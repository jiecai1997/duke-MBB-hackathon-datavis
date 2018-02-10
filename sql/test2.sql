-- execute below SQL on CSV files using queryscsv.py

SELECT DISTINCT
  d.season4,
  d.opponent,
  cast(SUM(d.fg3) AS float) / SUM(d.fga3) as duke_3P_percent,
  cast(SUM(o.fg3) AS float) / SUM(o.fga3) as opp_3P_percent,
  cast(SUM(d.fg) AS float) / SUM(d.fga) as duke_FG_percent,
  cast(SUM(o.fg) AS float) / SUM(o.fga) as opp_FG_percent,
  cast(SUM(d.ft) AS float) / SUM(d.fta) as duke_FT_percent,
  cast(SUM(o.ft) AS float) / SUM(o.fta) as opp_FT_percent,
  cast(d.tp AS float)*100/2*(d.fga+0.44*d.fta) as duke_TS_percent,
  cast(o.tp AS float)*100/2*(o.fga+0.44*o.fta) as opp_TS_percent

FROM
  duke_data_2018 d,
  opponent_data_2018 o

WHERE
  --game ids match
  d.gameid_game_info = o.gameid_game_info

  --non null game statistics (fg3, fg)
  AND d.fg3 is not null AND d.fga3 is not null
  AND o.fg3 is not null AND o.fga3 is not null
  AND d.fg is not null AND d.fga is not null
  AND o.fg is not null AND o.fga is not null

  --2018 season
  AND d.season4 = '2,018'

GROUP BY d.oppid
ORDER BY d.season4;
