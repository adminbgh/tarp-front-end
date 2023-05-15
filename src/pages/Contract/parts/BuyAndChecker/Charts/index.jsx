import React from "react"

import { useSelector } from "react-redux"
import { PieChart, Pie, ResponsiveContainer, Sector, Cell } from "recharts"
import { formatDecimals } from "../../../../../services/formatNumbers"

function ChartBuyAndSell({ noData }) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const infoBuyAndSell = useSelector((state) => state?.user?.buyAndSell)

  const data = [
    { name: "Buy", value: infoBuyAndSell?.data?.buys || 0 },
    { name: "Sell", value: infoBuyAndSell?.data?.sells || 0 }
  ]
  const dataEmpy = [
    { name: "No data", value: 80 },
    { name: "No data", value: 20 }
  ]

  const COLORS = ["#43B8EF", "#D73340", "#D3D3D3", "#656565"]

  const RADIAN = Math.PI / 180

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? "start" : "end"

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
        <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
        {!noData && (
          <>
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={"#D73340"} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#ffffff">{`Total $${value > 1 ? formatDecimals(value?.toFixed(0)) : formatDecimals(value?.toFixed(6))}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
              {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
          </>
        )}
      </g>
    )
  }

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  if (noData) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={dataEmpy} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill={"#43B8EF"} dataKey="value" onMouseEnter={onPieEnter}>
            <Cell key={`cell-${1}`} fill={COLORS[3]} />
            <Cell key={`cell-${1}`} fill={COLORS[3]} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill={"#43B8EF"} dataKey="value" onMouseEnter={onPieEnter}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ChartBuyAndSell
