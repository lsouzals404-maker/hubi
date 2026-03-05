"use client";

import { useMemo } from "react";

type Star = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
};

export default function LoadingTenant() {
  const stars = useMemo(() => {
    const arr: Star[] = [];

    for (let i = 0; i < 50; i++) {
      arr.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      });
    }

    return arr;
  }, []);

  return (
    <div className="wrapper">
      <div className="stars">
        {stars.map((star, index) => (
          <div
            key={index}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="content">
        <div className="logoContainer">
          <img
            src="/logo/hubi.png"
            alt="Hubi Logo"
            className="logo"
          />
        </div>

        <h1 className="title">HUBI</h1>

        <div className="loadingBox">
          <p className="loadingText">CARREGANDO COMÉRCIO...</p>

          <div className="progressBar">
            <div className="progressFill" />
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --bg: #0a0e17;
          --accent: #3fa9d6;
          --glow: rgba(63, 169, 214, 0.4);
        }

        .wrapper {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .stars {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .star {
          position: absolute;
          background: var(--accent);
          border-radius: 50%;
          opacity: 0;
          filter: blur(2px);
          animation: twinkle ease-in-out infinite;
        }

        @keyframes twinkle {
          0%,100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }

        .content {
          z-index: 2;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logoContainer {
          width: 260px;
          height: 260px;
          margin-bottom: 10px;
        }

        .logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          animation: pulse 3s ease-in-out infinite;
          filter: drop-shadow(0 0 15px var(--glow));
        }

        @keyframes pulse {
          0%,100% {
            transform: scale(1);
            filter: drop-shadow(0 0 15px var(--glow));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 30px var(--accent));
          }
        }

        .title {
          font-size: 3rem;
          letter-spacing: 8px;
          color: white;
          margin: 10px 0 25px 0;
          text-shadow: 0 0 20px var(--accent);
        }

        .loadingBox {
          width: 260px;
        }

        .loadingText {
          font-size: 0.9rem;
          color: white;
          margin-bottom: 10px;
          letter-spacing: 2px;
          opacity: 0.8;
          animation: fade 2s infinite;
        }

        @keyframes fade {
          0%,100% { opacity: .4; }
          50% { opacity: 1; }
        }

        .progressBar {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .progressFill {
          height: 100%;
          width: 0%;
          background: linear-gradient(
            90deg,
            transparent,
            var(--accent),
            transparent
          );
          background-size: 200% 100%;
          animation:
            loading 4s ease-in-out forwards,
            shimmer 1.5s linear infinite;
          box-shadow: 0 0 10px var(--accent);
        }

        @keyframes loading {
          0% { width:0%; }
          20% { width:30%; }
          50% { width:45%; }
          70% { width:85%; }
          100% { width:100%; }
        }

        @keyframes shimmer {
          0% { background-position:-200% 0; }
          100% { background-position:200% 0; }
        }
      `}</style>
    </div>
  );
}