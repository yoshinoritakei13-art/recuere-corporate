'use client';

/**
 * AnimatedGradient - ゆっくり変化するグラデーション背景
 */
export default function AnimatedGradient({
  className = '',
}: {
  className?: string;
}) {
  return (
    <>
      <style jsx global>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <div
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          background: 'linear-gradient(-45deg, #e8f4fc, #d0e8f5, #c5dff0, #b8dced, #e0f0fa)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite',
          opacity: 0.7,
        }}
      />
    </>
  );
}
