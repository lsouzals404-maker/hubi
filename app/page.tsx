"use client";

import { useEffect, useMemo, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

type TenantCard = {
  slug: string;
  name: string;
  logoSrc: string;
  subtitle?: string;
};

type Star = {
  leftPct: number;
  topPct: number;
  sizePx: number;
  delayS: number;
  durS: number;
  opacity: number;
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const tenants: TenantCard[] = useMemo(
    () => [
      {
        slug: "equilibrio-dos-pes",
        name: "Equilíbrio dos Pés",
        subtitle: "Débora Nery • Andradas/MG",
        logoSrc: "/tenants/equilibrio-dos-pes/logo.jpg",
      },
    ],
    []
  );

  const activeTenant = tenants.length ? tenants[activeIndex % tenants.length] : null;

  const stars: Star[] = useMemo(() => {
    const arr: Star[] = [];
    for (let i = 0; i < 50; i++) {
      arr.push({
        leftPct: Math.random() * 100,
        topPct: Math.random() * 100,
        sizePx: Math.random() * 4 + 2,
        delayS: Math.random() * 3,
        durS: Math.random() * 3 + 2,
        opacity: Math.random() * 0.4 + 0.4,
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="outer">
      <div className="appContainer">

        {/* Background */}
        <div className="bg">
          <div className="starsContainer">
            {stars.map((s, idx) => (
              <div
                key={idx}
                className="star"
                style={{
                  left: `${s.leftPct}%`,
                  top: `${s.topPct}%`,
                  width: `${s.sizePx}px`,
                  height: `${s.sizePx}px`,
                  animationDelay: `${s.delayS}s`,
                  animationDuration: `${s.durS}s`,
                  opacity: s.opacity,
                }}
              />
            ))}
          </div>
        </div>

        {/* Header */}
        <header className="header">

          <button
            className="menuBtn"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          <div className="brand">
            <img src="/logo/hubi.png" className="logoImg" alt="Hubi" />
            <div className="brandName">HUBI</div>
          </div>

        </header>

        {/* Main */}
        <main className="main">

          <div className="activeInfo">
            <div className="activeName">{activeTenant?.name}</div>
            <div className="activeSubtitle">{activeTenant?.subtitle}</div>
          </div>

          <div className="swiperWrap">

            <Swiper
              className="hubiSwiper"
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              loop
              modules={[EffectCoverflow, Pagination, Autoplay]}
              autoplay={{ delay: 3200, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
              coverflowEffect={{
                rotate: 35,
                stretch: 0,
                depth: 140,
                modifier: 1,
                slideShadows: true,
              }}
            >

              {tenants.map((t) => (
                <SwiperSlide className="tenantSlide" key={t.slug}>

                  <a href={`/c/${t.slug}`} className="slideLink">

                    <img
                      src={t.logoSrc}
                      alt={t.name}
                      className="slideImg"
                    />

                  </a>

                </SwiperSlide>
              ))}

            </Swiper>

          </div>

          <div className="groupText">
            Grupo HUBI
          </div>

        </main>

        <style jsx>{`

:root{
--bg:#000000;
--brand:#00F0FF;
--spark:#DFFFFF;
}

/* fundo */

.outer{
background:#000;
display:flex;
justify-content:center;
align-items:center;
min-height:100vh;
}

.appContainer{
background:#000;
width:100%;
max-width:450px;
height:100vh;
position:relative;
overflow:hidden;
display:flex;
flex-direction:column;
}

/* stars */

.bg{
position:absolute;
inset:0;
z-index:1;
}

.starsContainer{
position:absolute;
inset:0;
}

.star{
position:absolute;
background:var(--spark);
border-radius:50%;
box-shadow:
0 0 10px rgba(0,240,255,0.8),
0 0 20px rgba(0,240,255,0.4);
animation:pulse infinite ease-in-out;
}

@keyframes pulse{
0%,100%{
transform:scale(.7);
}
50%{
transform:scale(1.6);
}
}

/* header */

.header{
padding:30px 20px 10px;
text-align:center;
position:relative;
z-index:10;
}

.menuBtn{
position:absolute;
left:15px;
top:25px;
font-size:26px;
background:none;
border:none;
color:white;
cursor:pointer;
}

.brand{
display:grid;
place-items:center;
gap:10px;
}

.logoImg{
width:72px;
box-shadow:none;
filter:none;
}

.brandName{
font-size:2.7rem;
font-weight:1000;
letter-spacing:3px;
color:#00F0FF;
position:relative;
overflow:hidden;
}
.brandName::after{
content:"";
position:absolute;
top:0;
left:-120%;
width:120%;
height:100%;

background:linear-gradient(
90deg,
transparent,
rgba(255,255,255,0.7),
transparent
);

transform:skewX(-20deg);

animation:shine 3.5s infinite;
}

@keyframes shine{
0%{
left:-120%;
}
100%{
left:120%;
}
}

/* main */

.main{
flex:1;
display:flex;
flex-direction:column;
padding:10px 16px;
z-index:10;
}

.activeInfo{
text-align:center;
margin-bottom:10px;
}

.activeName{
color:white;
font-weight:900;
font-size:1.1rem;
}

.activeSubtitle{
color:rgba(255,255,255,.6);
font-size:.85rem;
}

/* swiper */

.swiperWrap{
width:100%;
padding:10px 0 30px;
}

:global(.hubiSwiper){
width:100%;
padding-bottom:35px;
}

:global(.swiper-pagination-bullet){
background:white;
opacity:.3;
}

:global(.swiper-pagination-bullet-active){
background:#00F0FF;
}

:global(.tenantSlide){
width:280px;
height:340px;
border-radius:20px;
overflow:hidden;
}

.slideLink{
display:block;
width:100%;
height:100%;
}

.slideImg{
width:100%;
height:100%;
object-fit:cover;
}

/* grupo hubi */

.groupText{
margin-top:15px;
text-align:center;
font-size:.65rem;
letter-spacing:2px;
color:rgba(255,255,255,.35);
}

`}</style>
      </div>
    </div>
  );
}