import React, { useState } from 'react';
import { 
  FaCog, FaBell, FaUserShield, FaSave, FaTimes, FaUser, FaLock, 
  FaPalette, FaSync, FaShieldAlt, FaPlug, FaLifeRing, FaAdjust 
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import Switch from 'react-switch';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

const SettingsPage = () => {
  const { darkMode, setDarkMode } = useOutletContext();

  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('UTC +03:00');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [hideActivity, setHideActivity] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('');
  const [connectedDevices, setConnectedDevices] = useState(['Device 1', 'Device 2']);
  const [integrations, setIntegrations] = useState(['Google', 'GitHub']);
  const [backupEnabled, setBackupEnabled] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const handleSave = () => {
    toast.success('Settings saved successfully!', { autoClose: 2000 });
  };

  const handleCancel = () => {
    setLanguage('English');
    setTimezone('UTC +03:00');
    setNotificationsEnabled(true);
    setEmailNotifications(true);
    setDarkMode(false);
    setHideActivity(false);
    setTwoFactorAuth(false);
    setProfilePicture(null);
    setName('John Doe');
    setEmail('john.doe@example.com');
    setPassword('');
    setBackupEnabled(false);
    setFontSize(16);
    toast.info('Changes have been canceled!', { autoClose: 2000 });
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        toast.success('Profile picture updated!', { autoClose: 2000 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveDevice = (device) => {
    setConnectedDevices(connectedDevices.filter((d) => d !== device));
    toast.info(`${device} has been removed.`, { autoClose: 2000 });
  };

  const handleRemoveIntegration = (integration) => {
    setIntegrations(integrations.filter((i) => i !== integration));
    toast.info(`${integration} integration has been removed.`, { autoClose: 2000 });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col space-y-4 xs:space-y-6 p-3 xs:p-6 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'} min-h-screen`}
    >

      <h1 className={`text-2xl xs:text-3xl sm:text-4xl font-bold flex items-center ${darkMode ? 'text-gray-100' : 'text-gray-900'} px-2 xs:px-0`}>
        <FaCog className="mr-2 text-xl xs:text-2xl" /> Settings
      </h1>


      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 px-2 xs:px-0">
   
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 xs:p-6 rounded-xl shadow-lg transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
        >
          <h2 className={`text-lg xs:text-xl font-semibold flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            <FaUser className="mr-2 text-sm xs:text-base" /> Account
          </h2>
          <div className="mt-3 xs:mt-4 space-y-3 xs:space-y-4">
            <div>
              <label className={`block text-xs xs:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Profile Picture</label>
              <div className="mt-1 flex flex-col xs:flex-row items-start xs:items-center gap-2">
                <img
                  src={profilePicture || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="h-10 xs:h-12 w-10 xs:w-12 rounded-full object-cover"
                />
                <input
                  type="file"
                  onChange={handleProfilePictureUpload}
                  className="text-xs xs:text-sm"
                />
              </div>
            </div>
            <div>
              <label className={`block text-xs xs:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`mt-1 block w-full p-2 text-xs xs:text-sm border rounded-md ${darkMode ? 'bg-gray-600 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
              />
            </div>
            <div>
              <label className={`block text-xs xs:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full p-2 text-xs xs:text-sm border rounded-md ${darkMode ? 'bg-gray-600 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
              />
            </div>
            <div>
              <label className={`block text-xs xs:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full p-2 text-xs xs:text-sm border rounded-md ${darkMode ? 'bg-gray-600 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 xs:p-6 rounded-xl shadow-lg transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
        >
          <h2 className={`text-lg xs:text-xl font-semibold flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            <FaLock className="mr-2 text-sm xs:text-base" /> Security
          </h2>
          <div className="mt-3 xs:mt-4 space-y-3 xs:space-y-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={twoFactorAuth}
                onChange={(checked) => setTwoFactorAuth(checked)}
                onColor="#4F46E5"
                offColor="#D1D5DB"
                height={20}
                width={40}
              />
              <label className={`text-xs xs:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                2FA Authentication
              </label>
            </div>
            <div>
              <label className={`block text-xs xs:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Connected Devices
              </label>
              <ul className="mt-1 xs:mt-2 space-y-1 xs:space-y-2">
                {connectedDevices.map((device, index) => (
                  <li key={index} className={`flex justify-between items-center text-xs xs:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="truncate max-w-[120px] xs:max-w-[160px]">{device}</span>
                    <button
                      onClick={() => handleRemoveDevice(device)}
                      className="text-red-500 hover:text-red-700 text-xs xs:text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

  
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 xs:p-6 rounded-xl shadow-lg transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
        >
          <h2 className={`text-lg xs:text-xl font-semibold flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            <FaPalette className="mr-2 text-sm xs:text-base" /> Appearance
          </h2>
          <div className="mt-3 xs:mt-4 space-y-3 xs:space-y-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={darkMode}
                onChange={(checked) => setDarkMode(checked)}
                onColor="#4F46E5"
                offColor="#D1D5DB"
                height={20}
                width={40}
              />
              <label className={`text-xs xs:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Dark Mode
              </label>
            </div>
            <div>
              <label className={`block text-xs xs:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Dashboard Layout
              </label>
              <select className={`mt-1 block w-full p-2 text-xs xs:text-sm rounded-md border ${darkMode ? 'bg-gray-600 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}>
                <option>Default</option>
                <option>Compact</option>
                <option>Detailed</option>
              </select>
            </div>
            <div>
              <label className={`block text-xs xs:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Font Size ({fontSize}px)
              </label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full mt-2"
              />
            </div>
          </div>
        </motion.div>

      
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 xs:p-6 rounded-xl shadow-lg transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
        >
          <h2 className={`text-lg xs:text-xl font-semibold flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            <FaPlug className="mr-2 text-sm xs:text-base" /> Integrations
          </h2>
          <div className="mt-3 xs:mt-4 space-y-3 xs:space-y-4">
            <div>
              <label className={`block text-xs xs:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Connected Accounts
              </label>
              <ul className="mt-1 xs:mt-2 space-y-1 xs:space-y-2">
                {integrations.map((integration, index) => (
                  <li key={index} className={`flex justify-between items-center text-xs xs:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="truncate max-w-[120px] xs:max-w-[160px]">{integration}</span>
                    <button
                      onClick={() => handleRemoveIntegration(integration)}
                      className="text-red-500 hover:text-red-700 text-xs xs:text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full xs:w-auto px-3 py-1.5 xs:px-4 xs:py-2 bg-indigo-600 text-white text-xs xs:text-sm rounded-md hover:bg-indigo-700">
              Connect New Account
            </button>
          </div>
        </motion.div>

    
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 xs:p-6 rounded-xl shadow-lg transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
        >
          <h2 className={`text-lg xs:text-xl font-semibold flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            <FaSync className="mr-2 text-sm xs:text-base" /> Backup
          </h2>
          <div className="mt-3 xs:mt-4 space-y-3 xs:space-y-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={backupEnabled}
                onChange={(checked) => setBackupEnabled(checked)}
                onColor="#4F46E5"
                offColor="#D1D5DB"
                height={20}
                width={40}
              />
              <label className={`text-xs xs:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Auto Backup
              </label>
            </div>
            <button className="w-full xs:w-auto px-3 py-1.5 xs:px-4 xs:py-2 bg-indigo-600 text-white text-xs xs:text-sm rounded-md hover:bg-indigo-700">
              Create Backup Now
            </button>
          </div>
        </motion.div>

     
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 xs:p-6 rounded-xl shadow-lg transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
        >
          <h2 className={`text-lg xs:text-xl font-semibold flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            <FaLifeRing className="mr-2 text-sm xs:text-base" /> Support
          </h2>
          <div className="mt-3 xs:mt-4 space-y-2 xs:space-y-3">
            <button className="w-full px-3 py-1.5 xs:px-4 xs:py-2 bg-indigo-600 text-white text-xs xs:text-sm rounded-md hover:bg-indigo-700">
              Help Center
            </button>
            <button className="w-full px-3 py-1.5 xs:px-4 xs:py-2 bg-indigo-600 text-white text-xs xs:text-sm rounded-md hover:bg-indigo-700">
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>


      <div className="flex flex-col xs:flex-row justify-end gap-2 xs:gap-4 mt-4 xs:mt-6 px-2 xs:px-0">
        <button
          onClick={handleCancel}
          className="flex items-center justify-center px-3 py-1.5 xs:px-4 xs:py-2 bg-gray-300 text-gray-700 text-xs xs:text-sm rounded-md hover:bg-gray-400"
        >
          <FaTimes className="mr-1 xs:mr-2 text-xs xs:text-sm" /> Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex items-center justify-center px-3 py-1.5 xs:px-4 xs:py-2 bg-indigo-600 text-white text-xs xs:text-sm rounded-md hover:bg-indigo-700"
        >
          <FaSave className="mr-1 xs:mr-2 text-xs xs:text-sm" /> Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default SettingsPage;