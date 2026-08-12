'use client';

export default function ProgressBar({
  actual,
  total,
  label,
}: {
  actual: number;
  total: number;
  label?: string;
}) {
  const pct = total > 0 ? Math.round((actual / total) * 100) : 0;

  return (
    <div className="sabor-progress">
      <div className="sabor-progress-bar">
        <div
          className="sabor-progress-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
      {label && <span className="sabor-progress-label">{label}</span>}
      <style>{`
        .sabor-progress {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
        }
        .sabor-progress-bar {
          flex: 1;
          height: 8px;
          background: #e8e3de;
          border-radius: 99px;
          overflow: hidden;
        }
        .sabor-progress-fill {
          height: 100%;
          background: #4CAF50;
          border-radius: 99px;
          transition: width 0.5s ease;
        }
        .sabor-progress-label {
          font-size: 0.8rem;
          color: #6b7280;
          white-space: nowrap;
          min-width: fit-content;
        }
      `}</style>
    </div>
  );
}
