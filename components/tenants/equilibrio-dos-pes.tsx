"use client";

import { useMemo, useState } from "react";
import type { Tenant } from "@/types/tenant";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import {
  FaSpa,
  FaDove,
  FaHandHoldingHeart,
  FaWhatsapp,
  FaInstagram,
  FaStar,
  FaBars,
} from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa6";

type StarImage = { src: string };

export default function TenantEquilibrioDosPes({ tenant }: { tenant: Tenant }) {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastText, setToastText] = useState("");
  const [comment, setComment] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Links (usa WhatsApp do tenant se existir, senão fallback)
  const waNumber = (tenant.whatsapp ?? "5531971377614").replace(/\D/g, "");
  const whatsappLink = `https://wa.me/${waNumber}`;

  // Instagram (por enquanto fixo; depois você coloca isso no banco e vem do tenant)
  const instagramLink = "https://www.instagram.com/equiliibriodospes";

  // Imagens locais (public/...)
  const logoSrc = "/tenants/equilibrio-dos-pes/logo.jpg";
  const heroSrc = "/tenants/equilibrio-dos-pes/hero.jpg";

  const gallery = useMemo<StarImage[]>(
    () => [
      { src: "/tenants/equilibrio-dos-pes/gallery/01.png" },
      { src: "/tenants/equilibrio-dos-pes/gallery/02.jpg" },
      { src: "/tenants/equilibrio-dos-pes/gallery/03.jpg" },
      { src: "/tenants/equilibrio-dos-pes/gallery/04.jpg" },
      { src: "/tenants/equilibrio-dos-pes/gallery/05.jpeg" },
    ],
    []
  );

  function sendComment() {
    // Aqui depois vamos exigir login geral do Hubi antes de enviar de verdade.
    const text = comment.trim();
    if (!text) return;

    setToastText(`"${text}"`);
    setToastOpen(true);
    setComment("");

    window.setTimeout(() => setToastOpen(false), 6000);
  }

  const nextUrl = `/c/${tenant.slug}`;
  const loginUrl = `/login?next=${encodeURIComponent(nextUrl)}`;

  return (
    <div className="page">
      {/* Toast */}
      <div className={`toast ${toastOpen ? "open" : ""}`} aria-hidden={!toastOpen}>
        <strong>Nova Avaliação!</strong>
        <p className="toastText">{toastText}</p>
      </div>

      {/* Header */}
      <header className="header">
        <div className="headerLeft">
          <img src={logoSrc} className="logoImg" alt="Logo" />
          <div className="stars" aria-label="Avaliação 5 estrelas">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>

        <h1 className="headerTitle">{tenant.name || "Equilíbrio dos Pés"}</h1>

        {/* Botão de opções (canto superior direito) */}
        <button
          className="menuBtn"
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir opções"
        >
          <FaBars />
        </button>

        {/* Overlay do menu */}
        <div
          className={`menuOverlay ${menuOpen ? "open" : ""}`}
          aria-hidden={!menuOpen}
          onClick={() => setMenuOpen(false)}
        >
          <div className="menuPanel" onClick={(e) => e.stopPropagation()}>
            <button
              className="menuClose"
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar opções"
            >
              &times;
            </button>

            <a className="menuLink" href="/" onClick={() => setMenuOpen(false)}>
              Home (HUBI)
            </a>

            <a className="menuLink" href={loginUrl} onClick={() => setMenuOpen(false)}>
              Login
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <img src={heroSrc} className="heroImg" alt="Imagem principal" />
      </section>

      <section className="intro">
        <p>
          A profissional <strong>Débora Nery</strong> atende em Andradas MG e, com um toque gentil,
          pode lhe entregar todo o cuidado que você está precisando.
        </p>
      </section>

      {/* Benefits */}
      <section className="benefits">
        <div className="benefitItem">
          <FaSpa />
          <p>Cuidado Gentil</p>
        </div>
        <div className="benefitItem">
          <FaDove />
          <p>Ambiente Relax</p>
        </div>
        <div className="benefitItem">
          <FaHandHoldingHeart />
          <p>Biossegurança</p>
        </div>
      </section>

      {/* Gallery (Swiper) */}
      <section className="gallery">
        <h2 className="sectionTitle">Galeria de Resultados</h2>

        <Swiper
          className="mySwiper"
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          loop
          modules={[EffectCoverflow, Pagination, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {gallery.map((img, idx) => (
            <SwiperSlide className="slide" key={idx}>
              <img src={img.src} alt={`Resultado ${idx + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Social */}
      <section className="social">
        <a href={whatsappLink} target="_blank" rel="noreferrer" className="btnSocial btnWhatsapp">
          <FaWhatsapp /> WhatsApp
        </a>
        <a href={instagramLink} target="_blank" rel="noreferrer" className="btnSocial btnInstagram">
          <FaInstagram /> Instagram
        </a>
      </section>

      {/* Map */}
      <h2 className="sectionTitle">Nosso espaço</h2>
      <div className="mapFrame">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d924.3438509509247!2d-46.57422163045884!3d-22.073475855934912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c9bc5d857e9d13%3A0xf97369e67084564f!2sR.%20Quirino%20Gon%C3%A7alves%20Lopes%2C%204%20-%20Centro%2C%20Andradas%20-%20MG%2C%2037795-000!5e0!3m2!1spt-BR!2sbr!4v1772719333134!5m2!1spt-BR!2sbr"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa"
        />
      </div>

      {/* Comment */}
      <section className="commentBox">
        <h3>Deixe seu comentário</h3>
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Sua experiência..."
        />
        <button className="sendBtn" onClick={sendComment}>
          Enviar Avaliação
        </button>
      </section>

      {/* Floating Agenda Button (rota do Hubi) */}
      <a className="floatAgendaBtn" href={`/c/${tenant.slug}/agenda`}>
        <FaRegCalendarCheck />
        <span>Agende seu horário</span>
      </a>

      <style jsx>{`
        :root {
          --gold: #d4af37;
          --text: #444;
          --light: #fdfaf6;
        }

        .page {
          background: #fff;
          color: var(--text);
          padding-bottom: 100px;
          overflow-x: hidden;
        }

        .toast {
          position: fixed;
          top: 85px;
          right: 20px;
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          border-left: 5px solid var(--gold);
          z-index: 2000;
          max-width: 260px;
          transform: translateX(120%);
          transition: transform 0.35s ease;
        }
        .toast.open {
          transform: translateX(0);
        }
        .toastText {
          font-size: 0.8rem;
          margin-top: 5px;
        }

        .header {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          position: relative;
        }

        .headerLeft {
          text-align: center;
        }

        .logoImg {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 2px solid var(--gold);
          object-fit: cover;
        }

        .stars {
          color: var(--gold);
          font-size: 10px;
          margin-top: 3px;
          display: flex;
          gap: 2px;
          justify-content: center;
        }

        .headerTitle {
          flex-grow: 1;
          text-align: center;
          color: #8b7355;
          padding-right: 60px;
          font-family: ui-serif, "Playfair Display", serif;
          font-size: 22px;
        }

        .menuBtn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid rgba(212, 175, 55, 0.35);
          background: rgba(255, 255, 255, 0.9);
          color: #8b7355;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        }

        .menuOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
          z-index: 3000;
        }

        .menuOverlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .menuPanel {
          position: absolute;
          top: 70px;
          right: 18px;
          width: 240px;
          background: #fff;
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }

        .menuClose {
          position: absolute;
          top: 8px;
          right: 10px;
          font-size: 26px;
          border: none;
          background: transparent;
          color: #8b7355;
          cursor: pointer;
        }

        .menuLink {
          display: block;
          padding: 14px 16px;
          text-decoration: none;
          color: #1f2937;
          font-weight: 600;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .menuLink:hover {
          background: #fdfaf6;
        }

        .hero {
          padding: 20px;
          text-align: center;
        }

        .heroImg {
          width: 100%;
          max-width: 400px;
          border-radius: 30px;
          animation: glow 3s infinite alternate;
        }

        @keyframes glow {
          from {
            box-shadow: 0 0 5px rgba(212, 175, 55, 0.3);
          }
          to {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
          }
        }

        .intro {
          padding: 0 25px;
          text-align: center;
        }

        .benefits {
          display: flex;
          justify-content: space-around;
          padding: 20px;
          background: var(--light);
          margin: 20px 0;
          text-align: center;
          gap: 10px;
        }

        .benefitItem :global(svg) {
          color: var(--gold);
          font-size: 1.5rem;
          margin-bottom: 5px;
        }

        .benefitItem p {
          font-size: 0.75rem;
          font-weight: 600;
        }

        .sectionTitle {
          margin: 30px 20px 10px;
          font-family: ui-serif, "Playfair Display", serif;
          color: #8b7355;
          text-align: center;
        }

        .gallery {
          padding: 20px 0 40px;
        }

        :global(.mySwiper) {
          width: 100%;
          padding-top: 20px;
          padding-bottom: 50px;
        }

        :global(.mySwiper .swiper-pagination-bullet-active) {
          background: var(--gold);
        }

        :global(.slide) {
          width: 250px;
          height: 320px;
          border-radius: 20px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          border: 4px solid #fff;
          background: #fff;
        }

        :global(.slide img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .social {
          padding: 0 20px;
        }

        .btnSocial {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 90%;
          max-width: 350px;
          margin: 10px auto;
          padding: 12px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          color: white;
        }

        .btnWhatsapp {
          background: #25d366;
        }

        .btnInstagram {
          background: linear-gradient(45deg, #f09433, #dc2743, #bc1888);
        }

        .mapFrame {
          margin: 0 20px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .commentBox {
          margin: 20px;
          padding: 20px;
          background: var(--light);
          border-radius: 20px;
        }

        textarea {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ddd;
          margin-top: 10px;
          font-family: inherit;
          resize: none;
        }

        .sendBtn {
          background: var(--gold);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 10px;
          margin-top: 10px;
          font-weight: 600;
          width: 100%;
          cursor: pointer;
        }

        .floatAgendaBtn {
          position: fixed;
          bottom: 25px;
          right: 20px;
          background: linear-gradient(135deg, #d4af37, #b8860b);
          color: white;
          padding: 15px 25px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          z-index: 9999;
          text-decoration: none;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: pulse-soft 2s infinite ease-in-out;
        }

        .floatAgendaBtn::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shine 3s infinite;
        }

        @keyframes shine {
          to {
            left: 100%;
          }
        }

        @keyframes pulse-soft {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}