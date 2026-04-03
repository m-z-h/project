import LayoutWrapper from "../components/layout/LayoutWrapper";

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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}