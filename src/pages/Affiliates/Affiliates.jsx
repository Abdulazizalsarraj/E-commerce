import { useOutletContext } from "react-router-dom";

const AffiliatesPage = () => {
    const { darkMode } = useOutletContext();

    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center">Affiliates</h1>
        <p className="mt-6 text-lg text-center">
          Join our affiliate program and earn commissions by promoting our products. It's easy, free, and rewarding!
        </p>
  

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 ${darkMode ? 'dark:bg-gray-800' : 'bg-white'} rounded-lg shadow-md text-center`}>
              <h3 className="text-xl font-bold">Sign Up</h3>
              <p className="mt-2">
                Create an account in our affiliate program. It's quick and easy!
              </p>
            </div>
  
            <div className={`p-6 ${darkMode ? 'dark:bg-gray-800' : 'bg-white'} rounded-lg shadow-md text-center`}>
              <h3 className="text-xl font-bold">Promote</h3>
              <p className="mt-2">
                Share your unique affiliate link on your website, blog, or social media.
              </p>
            </div>
  
            <div className={`p-6 ${darkMode ? 'dark:bg-gray-800' : 'bg-white'} rounded-lg shadow-md text-center`}>
              <h3 className="text-xl font-bold">Earn</h3>
              <p className="mt-2">
                Earn commissions for every sale made through your link.
              </p>
            </div>
          </div>
        </div>
  

        <div className="mt-12">
          <h2 className="text-2xl font-semibold">Why Join Our Affiliate Program?</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 ${darkMode ? 'dark:bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">High Commissions</h3>
              <p className="mt-2">
                We offer competitive commission rates to help you maximize your earnings.
              </p>
            </div>
  
            <div className={`p-6 ${darkMode ? 'dark:bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Easy Tracking</h3>
              <p className="mt-2">
                Our dashboard makes it easy to track your clicks, sales, and earnings.
              </p>
            </div>
          </div>
        </div>
  
   
        <div className="mt-12">
          <h2 className="text-2xl font-semibold">How to Join</h2>
          <p className="mt-4 text-lg">
            To join our affiliate program, simply click the button below and fill out the application form. Once approved, you'll receive your unique affiliate link and can start earning right away!
          </p>
          <button className="mt-6 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
            Join Now
          </button>
        </div>
      </div>
    );
  };
  
  export default AffiliatesPage;