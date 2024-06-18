import React from 'react'
import {ResponsiveContainer, LineChart, Line , XAxis, CartesianGrid, Tooltip, Area} from "recharts"

function Chart ({title, data, dataKey, grid}) {
  return (
    <>
        <div className="chart">
            <h3 className='chart_title'>{title}</h3>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke='gray' />
                    <Line type="monotone" dataKey={dataKey} stroke='#12b76a' />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                    {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="10" />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    </>
  )
}

export default Chart