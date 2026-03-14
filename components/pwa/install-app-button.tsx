"use client";

import { useEffect, useMemo, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type InstallAppButtonProps = {
  label?: string;
  className?: string;
  iosClassName?: string;
};

export default function InstallAppButton({
  label = "Instalar app",
  className = "",
  iosClassName = "",
}: InstallAppButtonProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);

  const isIos = useMemo(() => {
    if (typeof window === "undefined") return false;

    const ua = window.navigator.userAgent.toLowerCase();
    const isIphone = /iphone/.test(ua);
    const isIpad = /ipad/.test(ua);
    const isIpod = /ipod/.test(ua);

    const isModernIpad =
      /macintosh/.test(ua) && "ontouchend" in document;

    return isIphone || isIpad || isIpod || isModernIpad;
  }, []);

  useEffect(() => {
    const checkInstalled = () => {
      const standaloneByMedia =
        window.matchMedia?.("(display-mode: standalone)")?.matches ?? false;

      const nav = window.navigator as Navigator & { standalone?: boolean };
      const standaloneByNavigator = Boolean(nav.standalone);

      const installed = standaloneByMedia || standaloneByNavigator;
      setIsInstalled(installed);

      if (isIos && !installed) {
        setShowIosHelp(true);
      }
    };

    checkInstalled();

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowIosHelp(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [isIos]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      setIsLoading(true);
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;

      if (choice.outcome === "accepted") {
        setIsInstalled(true);
      }

      setDeferredPrompt(null);
    } catch (error) {
      console.error("Erro ao instalar app:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isInstalled) {
    return null;
  }

  if (isIos) {
    if (!showIosHelp) return null;

    return (
      <div className={iosClassName} role="note" aria-label="Como instalar no iPhone">
        <strong>Instalar app no iPhone</strong>
        <p>
          Toque em <span>Compartilhar</span> no Safari e depois em{" "}
          <span>Adicionar à Tela de Início</span>.
        </p>
      </div>
    );
  }

  if (!deferredPrompt) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleInstall}
      disabled={isLoading}
      className={className}
      aria-label={label}
    >
      {isLoading ? "Instalando..." : label}
    </button>
  );
}