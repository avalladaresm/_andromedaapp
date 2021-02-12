export default function Spin() {
  return (
    <svg style={{ background: 'rgb(255, 255, 255, 0)', display: 'block', shapeRendering: 'auto' }} width="32px" height="32px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" r="28" strokeWidth="8" stroke="#5b7de1" strokeDasharray="43.982297150257104 43.982297150257104" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" dur="1.3333333333333333s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
      </circle>
      <circle cx="50" cy="50" r="19" strokeWidth="8" stroke="#ba60d8" strokeDasharray="29.845130209103033 29.845130209103033" strokeDashoffset="29.845130209103033" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" dur="1.3333333333333333s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
      </circle>
    </svg>
  )
}