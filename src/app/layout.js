import "./globals.css";
import LeftMenu from '@/components/leftMenu'; // Import the new component
import Header from "@/components/Header";
import MainContentWrapper from "@/components/MainContentWrapper";

export const metadata = {
  title: "Myime2Cloud",
  description: "Myime2Cloud Attendance Management System",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-display bg-gray-100 text-text-light dark:text-text-dark"
      >
        <Header />
        <div className="flex h-screen">
          <LeftMenu />
          <MainContentWrapper>
            <div className="min-h-screen  py-8">
              <div className="mx-auto space-y-6">
                {children}
              </div>
            </div>
          </MainContentWrapper>
        </div>
      </body>
    </html>
  );
}
