import Navbar from './components/Navbar/page';
import Footer from './components/Footer/page';
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to CareerLog</h1>
            <p className="py-6">
              Empowering Your Career Journey: Track, Reflect, and Grow with
              CareerLog
            </p>
            <a href="/login" className="btn btn-primary btn-soft rounded-2xl">
              Get Started
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
