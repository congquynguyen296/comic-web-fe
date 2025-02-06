import Header from '../components/main-component/Header';
import Banner from '../components/main-component/Banner';
import MainContent from '../components/main-component/MainContent';
import Footer from '../components/main-component/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Banner />
      <MainContent />
      <Footer />
    </div>
  );
}
