import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBox from "@/components/ChatBox";
import ClientOnly from "@/components/ClientOnly";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ClientOnly>
        <ChatBox />
      </ClientOnly>
    </>
  );
} 