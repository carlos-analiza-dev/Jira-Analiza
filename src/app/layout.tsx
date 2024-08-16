import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";
import Providers from "@/components/Providers";

const roboto = Roboto({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "Jira-Analiza",
  description: "Sistema generador de tareas y eventos Laboratorios Analiza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {children}
            <Toaster />
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
