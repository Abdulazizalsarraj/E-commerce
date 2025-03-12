import { useOutletContext } from "react-router-dom";

const CareersPage = () => {
    const { darkMode } = useOutletContext();
  
    return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center">Careers</h1>
      <p className="mt-6 text-lg text-center">
        Join our team and be part of an innovative company that values creativity, collaboration, and growth.
      </p>


      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Current Openings</h2>
        <div className="mt-4 space-y-4">
                    <div className={`p-6 ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}  rounded-lg shadow-md`}>
            <h3 className="text-xl font-bold">Frontend Developer</h3>
            <p className="mt-2">
              We're looking for a talented Frontend Developer to join our team. You'll work on building responsive and user-friendly interfaces.
            </p>
            <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
              Apply Now
            </button>
          </div>

                    <div className={`p-6 ${darkMode ? 'dark:bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
            <h3 className="text-xl font-bold">Marketing Specialist</h3>
            <p className="mt-2">
              We need a creative Marketing Specialist to help us grow our brand and reach new audiences.
            </p>
            <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>


      <div className="mt-12">
        <h2 className="text-2xl font-semibold">Why Work With Us?</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`p-6 ${darkMode ? 'dark:bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
            <h3 className="text-xl font-bold">Flexible Work Environment</h3>
            <p className="mt-2">
              We offer remote work options and flexible hours to help you balance work and life.
            </p>
          </div>

                    <div className={`p-6 ${darkMode ? 'dark:bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
            <h3 className="text-xl font-bold">Career Growth</h3>
            <p className="mt-2">
              We invest in our employees' growth through training, mentorship, and opportunities for advancement.
            </p>
          </div>
        </div>
      </div>


      <div className="mt-12">
        <h2 className="text-2xl font-semibold">How to Apply</h2>
        <p className="mt-4 text-lg">
          To apply for any of the positions listed above, please send your resume and a cover letter to <strong>careers@example.com</strong>. We look forward to hearing from you!
        </p>
      </div>
    </div>
  );
};

export default CareersPage;