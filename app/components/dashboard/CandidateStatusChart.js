'use client'

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const STATUS_COLORS = {
  'New': '#1D4ED8',
  'Screening': '#16A34A',
  'Interview/Test': '#B45309',
  'Offer': '#16A34A',
  'Hired': '#16A34A',
  'Rejected': '#991B1B'
};

const data = [
  { name: 'New', value: 65 },
  { name: 'Screening', value: 60 },
  { name: 'Interview/Test', value: 55 },
  { name: 'Offer', value: 68 },
  { name: 'Hired', value: 62 },
  { name: 'Rejected', value: 52 },
];

const CustomizedDotWithLine = (props) => {
  const { cx, cy, payload } = props;
  const color = STATUS_COLORS[payload.name] || '#A855F7';

  return (
    <g>
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={180}
        stroke={color}
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.4}
      />
      <circle cx={cx} cy={cy} r={6} fill={color} stroke="none" strokeWidth={0} />
    </g>
  );
};

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;
  const color = STATUS_COLORS[payload.value] || '#94A3B8';

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill={color}
        className="text-[12px] font-bold"
      >
        {payload.value}
      </text>
    </g>
  );
};

const CandidateStatusChart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="bg-white rounded-[10px] shadow-[0_0_2px_rgba(0,0,0,0.25)] p-6 h-full flex flex-col min-h-[400px]">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Candidate status</h3>
        <div className="flex-1 flex items-center justify-center text-gray-400">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[10px] shadow-[0_0_2px_rgba(0,0,0,0.25)] p-6 h-full flex flex-col min-w-0">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Candidate status</h3>

      <div className="w-full block" style={{ minWidth: '0', minHeight: '230px' }}>
        <ResponsiveContainer width="100%" height={230}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: -20, bottom: 20 }}>
            <CartesianGrid
              vertical={false}
              horizontal={false}
            />

            <XAxis
              dataKey="name"
              axisLine={{ stroke: '#E2E8F0', strokeWidth: 2 }}
              tickLine={false}
              tick={<CustomizedAxisTick />}
              padding={{ left: 30, right: 30 }}
            />

            <YAxis
              axisLine={{ stroke: '#E2E8F0', strokeWidth: 2 }}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }}
              domain={[0, 100]}
              dx={-5}
            />

            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#A855F7"
              strokeWidth={3}
              dot={<CustomizedDotWithLine />}
              activeDot={{ r: 8, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CandidateStatusChart;
