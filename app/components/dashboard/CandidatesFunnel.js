'use client'

import React from 'react';

const FUNNEL_STAGES = [
  { label: 'New', percentage: '100%', count: '284', color: '#D6E9FF' },
  { label: 'Screening', percentage: '86%', count: '244', color: '#A9D1FF' },
  { label: 'Interview/Test', percentage: '73%', count: '207', color: '#8AB4F8' },
  { label: 'Offer', percentage: '41%', count: '116', color: '#A1C2FA' },
  { label: 'Hired', percentage: '16%', count: '45', color: '#7DD3C1' },
  { label: 'Rejected', percentage: '25%', count: '71', color: '#FF6E8D' }
];

const RoundedTrapezoid = ({ topWidth, bottomWidth, height, color, label, percentage, yOffset }) => {
  const r = 12;
  const centerX = 250;

  const x1 = centerX - topWidth / 2;
  const x2 = centerX + topWidth / 2;
  const x3 = centerX + bottomWidth / 2;
  const x4 = centerX - bottomWidth / 2;

  const y1 = yOffset;
  const y2 = yOffset + height;

  const dx = r * (topWidth - bottomWidth) / (2 * height);

  // Calculate the path with rounded corners
  const path = [
    `M ${x1 + r},${y1}`, // Top edge start (after left curve)
    `L ${x2 - r},${y1}`, // Top edge to right
    `Q ${x2},${y1} ${x2 - dx},${y1 + r}`, // Top right corner curve
    `L ${x3 + dx},${y2 - r}`, // Right slant down
    `Q ${x3},${y2} ${x3 - r},${y2}`, // Bottom right corner curve
    `L ${x4 + r},${y2}`, // Bottom edge to left
    `Q ${x4},${y2} ${x4 - dx},${y2 - r}`, // Bottom left corner curve
    `L ${x1 + dx},${y1 + r}`, // Left slant up
    `Q ${x1},${y1} ${x1 + r},${y1}`, // Top left corner curve
    'Z'
  ].join(' ');

  return (
    <g className="group cursor-default transition-all duration-300 hover:filter hover:brightness-95">
      <path d={path} fill={color} />
      <text
        x={centerX - topWidth / 2 + 40}
        y={yOffset + height / 2 + 5}
        className="text-[14px] font-bold fill-gray-900"
      >
        {label}
      </text>
      <text
        x={centerX + topWidth / 2 - 40}
        y={yOffset + height / 2 + 5}
        textAnchor="end"
        className="text-[14px] font-bold fill-gray-900"
      >
        {percentage}
      </text>
    </g>
  );
};

const CandidatesFunnel = () => {
  const segmentHeight = 40;
  const gap = 8;

  return (
    <div className="bg-white rounded-[10px] shadow-[0_0_2px_rgba(0,0,0,0.25)] p-4 md:p-6 h-full flex flex-col min-w-0">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Candidates funnel</h3>

      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 500 280"
          className="w-full h-auto max-w-[550px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {FUNNEL_STAGES.map((stage, i) => {
            const topWidth = 460 - (i * 50);
            const bottomWidth = 460 - ((i + 1) * 50);
            const yOffset = i * (segmentHeight + gap);

            return (
              <RoundedTrapezoid
                key={stage.label}
                topWidth={topWidth}
                bottomWidth={bottomWidth}
                height={segmentHeight}
                color={stage.color}
                label={stage.label}
                percentage={stage.percentage}
                yOffset={yOffset}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default CandidatesFunnel;
