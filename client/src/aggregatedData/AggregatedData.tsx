// src/components/AggregatedData.tsx
import React from 'react';
import './AggregatedData.css'; // Import the CSS file

interface AggregatedDataItem {
  ענף: string;
  סכום: number | string;
}

interface AggregatedDataProps {
  data: AggregatedDataItem[];
}

const AggregatedData: React.FC<AggregatedDataProps> = ({ data }) => {
  return (
    <div>
      <h2>Aggregated Data</h2>
      <table>
        <thead>
          <tr>
            <th>ענף</th>
            <th>סכום</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.ענף}</td>
              <td>{item.סכום}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AggregatedData;
