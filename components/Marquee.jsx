import { memo } from 'react';

const Marquee = memo(function Marquee({
  className = '',
  reverse = false,
  pauseOnHover = false,
  children,
  repeat = 4,
  duration = '40s',
  gap = '1rem',
  style = {},
  ...props
}) {
  return (
    <div
      {...props}
      className={['mq-outer', pauseOnHover ? 'mq-pause' : '', className].filter(Boolean).join(' ')}
      style={{ gap, ...style }}
    >
      {Array(repeat).fill(0).map((_, i) => (
        <div
          key={i}
          className="mq-inner"
          style={{
            gap,
            animationDuration: duration,
            animationDirection: reverse ? 'reverse' : 'normal',
            '--mq-gap': gap,
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
});

Marquee.displayName = 'Marquee';
export default Marquee;
export { Marquee };
