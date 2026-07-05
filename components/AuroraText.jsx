import { memo } from 'react';

const AuroraText = memo(function AuroraText({
  children,
  className = '',
  colors = ['#FF0080', '#7928CA', '#0070F3', '#38bdf8'],
  speed = 1,
}) {
  const style = {
    backgroundImage: `linear-gradient(135deg, ${[...colors, colors[0]].join(', ')})`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animationName: 'auroraShift',
    animationDuration: `${10 / speed}s`,
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    display: 'inline',
  };

  return (
    <span className={className || undefined} style={style}>
      {children}
    </span>
  );
});

AuroraText.displayName = 'AuroraText';

export default AuroraText;
export { AuroraText };
