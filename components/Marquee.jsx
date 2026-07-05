import { memo } from 'react';

const Marquee = memo(function Marquee({
  className = '',
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  gap = '1rem',
  duration = '40s',
  style = {},
  ...props
}) {
  const outerCls = [
    'marquee-outer',
    vertical ? 'marquee-vert' : '',
    pauseOnHover ? 'marquee-pause-hover' : '',
    className,
  ].filter(Boolean).join(' ');

  const innerCls = [
    'marquee-inner',
    vertical ? 'marquee-vert-inner' : '',
    reverse ? 'marquee-reverse' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      {...props}
      className={outerCls}
      style={{ '--marquee-gap': gap, '--marquee-duration': duration, ...style }}
    >
      {Array(repeat).fill(0).map((_, i) => (
        <div key={i} className={innerCls}>
          {children}
        </div>
      ))}
    </div>
  );
});

Marquee.displayName = 'Marquee';
export default Marquee;
export { Marquee };
