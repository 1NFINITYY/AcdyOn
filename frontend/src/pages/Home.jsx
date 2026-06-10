import RecommendationForm from "../components/RecommendationForm";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <RecommendationForm />
      </div>
    </div>
  );
};

export default Home;