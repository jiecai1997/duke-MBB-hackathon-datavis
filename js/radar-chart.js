var RadarChart = {
  defaultConfig: {
    containerClass: "radar-chart",
    w: 600,
    h: 600,
    factor: .95,
    factorLegend: 1,
    levels: 3,
    levelTick: !1,
    TickLength: 10,
    maxValue: 0,
    radians: 2 * Math.PI,
    color: d3.scale.category10(),
    axisLine: !0,
    axisText: !0,
    circles: !0,
    radius: 5,
    backgroundTooltipColor: "#555",
    backgroundTooltipOpacity: "0.7",
    tooltipColor: "white",
    axisJoin: function(t, e) {
      return t.className || e
    },
    transitionDuration: 300
  },
  chart: function() {
    function t(t) {
      if (0 == t) tooltip.classed("visible", 0), tooltip.select("rect").classed("visible", 0);
      else {
        tooltip.classed("visible", 1);
        var e = d3.event.x;
        y = d3.event.y, tooltip.select("text").classed("visible", 1).style("fill", a.tooltipColor);
        var n = 5,
          r = tooltip.select("text").text(t).node().getBBox();
        tooltip.select("rect").classed("visible", 1).attr("x", 0).attr("x", r.x - n).attr("y", r.y - n).attr("width", r.width + 2 * n).attr("height", r.height + 2 * n).attr("rx", "5").attr("ry", "5").style("fill", a.backgroundTooltipColor).style("opacity", a.backgroundTooltipOpacity), tooltip.attr("transform", "translate(" + e + "," + y + ")")
      }
    }

    function e(e) {
      e.each(function(e) {
        function n(t, e, n, r) {
          return n = "undefined" != typeof n ? n : 1, e * (1 - n * r(t * a.radians / l))
        }

        function r(t, e, a) {
          return n(t, e, a, Math.sin)
        }

        function i(t, e, a) {
          return n(t, e, a, Math.cos)
        }
        var o = d3.select(this);
        tooltip = o.append("g"), tooltip.append("rect").classed("tooltip", !0), tooltip.append("text").classed("tooltip", !0), e = e.map(function(t) {
          return t instanceof Array && (t = {
            axes: t
          }), t
        });
        var s = Math.max(a.maxValue, d3.max(e, function(t) {
            return d3.max(t.axes, function(t) {
              return t.value
            })
          })),
          c = e[0].axes.map(function(t) {
            return {
              name: t.axis,
              xOffset: t.xOffset ? t.xOffset : 0,
              yOffset: t.yOffset ? t.yOffset : 0
            }
          }),
          l = c.length,
          u = a.factor * Math.min(a.w / 2, a.h / 2);
        o.classed(a.containerClass, 1);
        var d = d3.range(0, a.levels).map(function(t) {
            return u * ((t + 1) / a.levels)
          }),
          f = o.selectAll("g.level-group").data(d);
        f.enter().append("g"), f.exit().remove(), f.attr("class", function(t, e) {
          return "level-group level-group-" + e
        });
        var p = f.selectAll(".level").data(function(t) {
          return d3.range(0, l).map(function() {
            return t
          })
        });
        if (p.enter().append("line"), p.exit().remove(), a.levelTick ? p.attr("class", "level").attr("x1", function(t, e) {
            return u == t ? r(e, t) : r(e, t) + a.TickLength / 2 * Math.cos(e * a.radians / l)
          }).attr("y1", function(t, e) {
            return u == t ? i(e, t) : i(e, t) - a.TickLength / 2 * Math.sin(e * a.radians / l)
          }).attr("x2", function(t, e) {
            return u == t ? r(e + 1, t) : r(e, t) - a.TickLength / 2 * Math.cos(e * a.radians / l)
          }).attr("y2", function(t, e) {
            return u == t ? i(e + 1, t) : i(e, t) + a.TickLength / 2 * Math.sin(e * a.radians / l)
          }).attr("transform", function(t) {
            return "translate(" + (a.w / 2 - t) + ", " + (a.h / 2 - t) + ")"
          }) : p.attr("class", "level").attr("x1", function(t, e) {
            return r(e, t)
          }).attr("y1", function(t, e) {
            return i(e, t)
          }).attr("x2", function(t, e) {
            return r(e + 1, t)
          }).attr("y2", function(t, e) {
            return i(e + 1, t)
          }).attr("transform", function(t) {
            return "translate(" + (a.w / 2 - t) + ", " + (a.h / 2 - t) + ")"
          }), a.axisLine || a.axisText) {
          var x = o.selectAll(".axis").data(c),
            h = x.enter().append("g");
          a.axisLine && h.append("line"), a.axisText && h.append("text"), x.exit().remove(), x.attr("class", "axis"), a.axisLine && x.select("line").attr("x1", a.w / 2).attr("y1", a.h / 2).attr("x2", function(t, e) {
            return r(e, a.w / 2, a.factor)
          }).attr("y2", function(t, e) {
            return i(e, a.h / 2, a.factor)
          }), a.axisText && x.select("text").attr("class", function(t, e) {
            var a = r(e, .5);
            return "legend " + (.4 > a ? "left" : a > .6 ? "right" : "middle")
          }).attr("dy", function(t, e) {
            var a = i(e, .5);
            return .1 > a ? "1em" : a > .9 ? "0" : "0.5em"
          }).text(function(t) {
            return t.name
          }).attr("x", function(t, e) {
            return t.xOffset + r(e, a.w / 2, a.factorLegend)
          }).attr("y", function(t, e) {
            return t.yOffset + i(e, a.h / 2, a.factorLegend)
          })
        }
        e.forEach(function(t) {
          t.axes.forEach(function(t, e) {
            t.x = r(e, a.w / 2, parseFloat(Math.max(t.value, 0)) / s * a.factor), t.y = i(e, a.h / 2, parseFloat(Math.max(t.value, 0)) / s * a.factor)
          })
        });
        var v = o.selectAll(".area").data(e, a.axisJoin);
        if (v.enter().append("polygon").classed({
            area: 1,
            "d3-enter": 1
          }).on("mouseover", function(e) {
            d3.event.stopPropagation(), o.classed("focus", 1), d3.select(this).classed("focused", 1), t(e.className)
          }).on("mouseout", function() {
            d3.event.stopPropagation(), o.classed("focus", 0), d3.select(this).classed("focused", 0), t(!1)
          }), v.exit().classed("d3-exit", 1).transition().duration(a.transitionDuration).remove(), v.each(function(t, e) {
            var a = {
              "d3-exit": 0
            };
            a["radar-chart-serie" + e] = 1, t.className && (a[t.className] = 1), d3.select(this).classed(a)
          }).style("stroke", function(t, e) {
            return a.color(e)
          }).style("fill", function(t, e) {
            return a.color(e)
          }).transition().duration(a.transitionDuration).attr("points", function(t) {
            return t.axes.map(function(t) {
              return [t.x, t.y].join(",")
            }).join(" ")
          }).each("start", function() {
            d3.select(this).classed("d3-enter", 0)
          }), a.circles && a.radius) {
          var g = o.selectAll("g.circle-group").data(e, a.axisJoin);
          g.enter().append("g").classed({
            "circle-group": 1,
            "d3-enter": 1
          }), g.exit().classed("d3-exit", 1).transition().duration(a.transitionDuration).remove(), g.each(function(t) {
            var e = {
              "d3-exit": 0
            };
            t.className && (e[t.className] = 1), d3.select(this).classed(e)
          }).transition().duration(a.transitionDuration).each("start", function() {
            d3.select(this).classed("d3-enter", 0)
          });
          var m = g.selectAll(".circle").data(function(t, e) {
            return t.axes.map(function(t) {
              return [t, e]
            })
          });
          m.enter().append("circle").classed({
            circle: 1,
            "d3-enter": 1
          }).on("mouseover", function(e) {
            d3.event.stopPropagation(), t(e[0].value)
          }).on("mouseout", function() {
            d3.event.stopPropagation(), t(!1), o.classed("focus", 0)
          }), m.exit().classed("d3-exit", 1).transition().duration(a.transitionDuration).remove(), m.each(function(t) {
            var e = {
              "d3-exit": 0
            };
            e["radar-chart-serie" + t[1]] = 1, d3.select(this).classed(e)
          }).style("fill", function(t) {
            return a.color(t[1])
          }).transition().duration(a.transitionDuration).attr("r", a.radius).attr("cx", function(t) {
            return t[0].x
          }).attr("cy", function(t) {
            return t[0].y
          }).each("start", function() {
            d3.select(this).classed("d3-enter", 0)
          });
          var y = tooltip.node();
          y.parentNode.appendChild(y)
        }
      })
    }
    var a = Object.create(RadarChart.defaultConfig);
    return e.config = function(t) {
      return arguments.length ? (arguments.length > 1 ? a[arguments[0]] = arguments[1] : d3.entries(t || {}).forEach(function(t) {
        a[t.key] = t.value
      }), e) : a
    }, e
  },
  draw: function(t, e, a) {
    var n = RadarChart.chart().config(a),
      r = n.config();
    d3.select(t).select("svg").remove(), d3.select(t).append("svg").attr("width", r.w).attr("height", r.h).datum(e).call(n)
  }
};
