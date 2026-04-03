import Sidebar from "../components/layout/Sidebar";
import CrispChat from "../components/ui/crispchat";  // ← ADD THIS IMPORT

export const metadata = {
  title: "Websmith",
  description: "Websmith App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          display: "flex",
          background: "#f5f5f7",
          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "30px",
          }}
        >
          {children}
        </main>

        <CrispChat />  {/* ← ADD THIS LINE */}
      </body>
    </html>
  );
}