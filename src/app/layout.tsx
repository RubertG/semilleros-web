import { Poppins } from "next/font/google";
import "./globals.css";
import { defaultUrl } from "@/src/const/common/consts";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700", "800", "900"],
 });

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Semilleros Unipamplona",
  description: "Aplicacion para el manejo de semilleros de la Unipamplona - Prototipo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={poppins.className}>
      <body className="bg-bg-50">
        {children}
      </body>
    </html>
  );
}
