import { useOutletContext } from "react-router-dom";

const CookiePolicyPage = () => {
  const { darkMode } = useOutletContext();

    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center">Cookie Policy</h1>
        <p className="mt-6 text-lg text-center">
          This cookie policy explains how we use cookies and similar technologies on our website.
        </p>
  
    
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">What Are Cookies?</h2>
          <p className="mt-4 text-lg">
            Cookies are small text files that are stored on your device when you visit a website. They help us improve your experience by remembering your preferences and settings.
          </p>
        </div>
  
       
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Types of Cookies We Use</h2>
          <div className="mt-4 space-y-4">
            <div className={`p-6 ${darkMode ? 'dark:bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Essential Cookies</h3>
              <p className="mt-2">
                These cookies are necessary for the website to function properly. They enable core functionality such as security and accessibility.
              </p>
            </div>
  
            <div className={`p-6 ${darkMode ? 'dark:bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Analytics Cookies</h3>
              <p className="mt-2">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
              </p>
            </div>
          </div>
        </div>
  

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Managing Cookies</h2>
          <p className="mt-4 text-lg">
            You can control or delete cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.
          </p>
        </div>
  

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="mt-4 text-lg">
            If you have any questions about our cookie policy, please contact us at <strong>support@example.com</strong>.
          </p>
        </div>
      </div>
    );
  };
  
  export default CookiePolicyPage;