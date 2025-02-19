import Header from '../components/main-component/Header';
import StoryInfo from '../features/story-detail/StoryInfo';
import Synopsis from '../features/story-detail/Synopsis';
import ChapterList from '../features/story-detail/ChapterList';
import Footer from '../components/main-component/Footer';

export default function StoryDetailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <StoryInfo />
        <div className="my-8 border-t border-gray-200"></div>
        
        <Synopsis />
        <div className="my-8 border-t border-gray-200"></div>
        
        <ChapterList />

        <Footer />
      </div>
    </div>
  );
}
