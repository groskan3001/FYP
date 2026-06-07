import { useState, useEffect } from 'react';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = { hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex gap-sm">
      <div 
        className="flex flex-col items-center justify-center rounded-md p-3" 
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', minWidth: '70px', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        <span className="font-bold text-white" style={{ fontSize: '1.75rem', lineHeight: 1 }}>
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="font-medium mt-1 uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.8)' }}>
          Hours
        </span>
      </div>
      <div 
        className="flex flex-col items-center justify-center rounded-md p-3" 
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', minWidth: '70px', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        <span className="font-bold text-white" style={{ fontSize: '1.75rem', lineHeight: 1 }}>
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="font-medium mt-1 uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.8)' }}>
          Mins
        </span>
      </div>
      <div 
        className="flex flex-col items-center justify-center rounded-md p-3" 
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', minWidth: '70px', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        <span className="font-bold text-white" style={{ fontSize: '1.75rem', lineHeight: 1 }}>
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="font-medium mt-1 uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.8)' }}>
          Secs
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
