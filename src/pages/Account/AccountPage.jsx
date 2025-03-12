import React, { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaTrash,
  FaSave,
  FaPlug,
  FaCloudUploadAlt,
  FaShieldAlt,
  FaBell,
  FaChartLine,
  FaRegSmile,
  FaEyeSlash,
  FaSync,
} from "react-icons/fa";
import Switch from "react-switch";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import CustomModal from "../../utils/custom-modal/CustomModal";
import { Link, useOutletContext } from "react-router-dom";

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "integrations", label: "Integrations" },
  { id: "backup", label: "Backup" },
  { id: "activity", label: "Activity" },
];

const AccountPage = () => {
  const { darkMode, setDarkMode } = useOutletContext();

  const initialUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "",
    confirmPassword: "",
    profileImage: null,
  };

  const initialSettings = JSON.parse(localStorage.getItem("accountSettings")) || {
    twoFactorAuth: false,
    connectedDevices: ["Laptop", "Mobile"],
    integrations: { Google: true, GitHub: false, Slack: true },
    backupEnabled: false,
    emailNotifications: true,
    pushNotifications: true,
  };

  const initialActivityLog = JSON.parse(localStorage.getItem("activityLog")) || [
    "Logged in from Chrome on Windows",
    "Updated profile picture",
    "Enabled two-factor authentication",
  ];

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [twoFactorAuth, setTwoFactorAuth] = useState(initialSettings.twoFactorAuth);
  const [connectedDevices, setConnectedDevices] = useState(initialSettings.connectedDevices);
  const [integrations, setIntegrations] = useState(initialSettings.integrations);
  const [backupEnabled, setBackupEnabled] = useState(initialSettings.backupEnabled);
  const [emailNotifications, setEmailNotifications] = useState(initialSettings.emailNotifications);
  const [pushNotifications, setPushNotifications] = useState(initialSettings.pushNotifications);
  const [activityLog, setActivityLog] = useState(initialActivityLog);

  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [resetPasswordData, setResetPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const resetPasswordModalRef = useRef();

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    localStorage.setItem("accountSettings", JSON.stringify({
      twoFactorAuth,
      connectedDevices,
      integrations,
      backupEnabled,
      emailNotifications,
      pushNotifications,
    }));
  }, [twoFactorAuth, connectedDevices, integrations, backupEnabled, emailNotifications, pushNotifications]);

  useEffect(() => {
    localStorage.setItem("activityLog", JSON.stringify(activityLog));
  }, [activityLog]);

  const computeProfileCompletion = () => {
    let totalFields = 3;
    let completed = 0;
    if (userInfo.name && userInfo.name !== "John Doe") completed++;
    if (userInfo.email && userInfo.email !== "john.doe@example.com") completed++;
    if (userInfo.profileImage) completed++;
    return Math.round((completed / totalFields) * 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUserInfo((prev) => ({ ...prev, profileImage: URL.createObjectURL(file) }));
      toast.success("Profile image updated!", { autoClose: 2000 });
      setActivityLog((prev) => [`Updated profile image at ${new Date().toLocaleTimeString()}`, ...prev]);
    } else {
      toast.error("Please select a valid image file", { autoClose: 2000 });
    }
  };

  const handleSave = () => {
    if (userInfo.password || userInfo.confirmPassword) {
      if (userInfo.password !== userInfo.confirmPassword) {
        toast.error("Passwords do not match!", { autoClose: 2000 });
        return;
      }
      if (userInfo.password.length < 8) {
        toast.error("Password must be at least 8 characters long", { autoClose: 2000 });
        return;
      }
    }
    toast.success("Account updated successfully!", { autoClose: 2000 });
    setActivityLog((prev) => [`Account updated at ${new Date().toLocaleTimeString()}`, ...prev]);
  };

  const handleResetPassword = () => {
    resetPasswordModalRef.current.open();
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (resetPasswordData.newPassword !== resetPasswordData.confirmNewPassword) {
      toast.error("New passwords do not match!", { autoClose: 2000 });
      return;
    }
    if (resetPasswordData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long", { autoClose: 2000 });
      return;
    }
    toast.success("Password reset successfully!", { autoClose: 2000 });
    setIsResetPasswordModalOpen(false);
    setResetPasswordData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
    setActivityLog((prev) => [`Password reset at ${new Date().toLocaleTimeString()}`, ...prev]);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.success("Account deleted successfully!", { autoClose: 2000 });
    }
  };

  const handleRemoveDevice = (device) => {
    setConnectedDevices((prev) => prev.filter((d) => d !== device));
    toast.info(`${device} has been removed.`, { autoClose: 2000 });
  };

  const toggleIntegration = (integration) => {
    setIntegrations((prev) => ({ ...prev, [integration]: !prev[integration] }));
    toast.info(`${integration} integration ${integrations[integration] ? "disabled" : "enabled"}.`, { autoClose: 2000 });
  };

  const handleCancel = () => {
    setUserInfo({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "",
      confirmPassword: "",
      profileImage: null,
    });
    setTwoFactorAuth(false);
    setConnectedDevices(["Laptop", "Mobile"]);
    setIntegrations({ Google: true, GitHub: false, Slack: true });
    setBackupEnabled(false);
    setEmailNotifications(true);
    setPushNotifications(true);
    setActivityLog([]);
    toast.info("Changes have been canceled!", { autoClose: 2000 });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-500">Profile Information</h2>
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4 z-0">
                <img
                  src={userInfo.profileImage || "/public/assets/images/default-avatar.jpg"}
                  alt="Profile"
                  className="w-full h-full rounded-full border-4 border-indigo-500 object-cover relative z-50"
                />
                <label className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <FaCloudUploadAlt />
                </label>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  className="mt-2 w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-500"
                />
              </div>
              <div className="w-full mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  className="mt-2 w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-500"
                />
              </div>
            </div>
          </div>
        );
      case "security":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-500">Security Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Switch
                  checked={twoFactorAuth}
                  onChange={setTwoFactorAuth}
                  onColor="#4F46E5"
                  offColor="#D1D5DB"
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-500">
                  Enable Two-Factor Authentication
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">
                  Connected Devices
                </label>
                <ul className="mt-2 space-y-2">
                  {connectedDevices.map((device, index) => (
                    <li key={index} className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-500">
                      {device}
                      <button
                        onClick={() => handleRemoveDevice(device)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      case "integrations":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-500">Integrations</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">Connected Accounts</label>
                <ul className="mt-2 space-y-2">
                  {Object.keys(integrations).map((integration, index) => (
                    <li key={index} className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-500">
                      {integration}
                      <Switch
                        checked={integrations[integration]}
                        onChange={() => toggleIntegration(integration)}
                        onColor="#4F46E5"
                        offColor="#D1D5DB"
                        height={20}
                        width={40}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                Connect New Account
              </button>
            </div>
          </div>
        );
      case "backup":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-500">Backup Options</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Switch
                  checked={backupEnabled}
                  onChange={setBackupEnabled}
                  onColor="#4F46E5"
                  offColor="#D1D5DB"
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-500">
                  Enable Automatic Backup
                </label>
              </div>
              <button className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                Create Backup Now
              </button>
            </div>
          </div>
        );
      case "activity":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-500">Recent Activity</h2>
            <ul className="space-y-3">
              {activityLog.map((activity, index) => (
                <li key={index} className="p-3 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                  {activity}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setActivityLog((prev) => [`Manual activity at ${new Date().toLocaleTimeString()}`, ...prev])}
              className="mt-4 w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Add Activity
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen p-4 sm:p-6 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className={`max-w-6xl mx-auto p-4 sm:p-8 rounded-2xl shadow-2xl ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-4xl font-semibold flex items-center">
            <FaUser className="mr-2" /> Account Settings
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-4 sm:mt-0"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Profile Completion: {computeProfileCompletion()}%
          </p>
          <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${computeProfileCompletion()}%` }}
            />
          </div>
        </div>

        <div className="mb-8 border-b border-gray-300 dark:border-gray-600 overflow-x-auto">
          <nav className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 text-sm sm:text-lg font-medium focus:outline-none ${
                  activeTab === tab.id
                    ? darkMode
                      ? "border-b-2 border-indigo-400 text-indigo-400"
                      : "border-b-2 border-indigo-600 text-indigo-600"
                    : darkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mb-8">{renderTabContent()}</div>

        <div className="mt-8 flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={handleResetPassword}
            className="flex items-center justify-center px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <FaSync className="mr-2" /> Reset Password
          </button>
          <button
            onClick={handleDeleteAccount}
            className="flex items-center justify-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <FaTrash className="mr-2" /> Delete Account
          </button>
          <button
            onClick={handleSave}
            className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <FaSave className="mr-2" /> Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center justify-center px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <FaEyeSlash className="mr-2" /> Cancel
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help?{" "}
            <Link to="/contact" className="text-indigo-500 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>

      <CustomModal
        ref={resetPasswordModalRef}
        title="Reset Password"
        onClose={() => setIsResetPasswordModalOpen(false)}
        isOpen={isResetPasswordModalOpen}
      >
        <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={resetPasswordData.oldPassword}
              onChange={(e) => setResetPasswordData({ ...resetPasswordData, oldPassword: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={resetPasswordData.newPassword}
              onChange={(e) => setResetPasswordData({ ...resetPasswordData, newPassword: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={resetPasswordData.confirmNewPassword}
              onChange={(e) => setResetPasswordData({ ...resetPasswordData, confirmNewPassword: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-500"
              required
            />
          </div>
          <div className="mt-4 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => resetPasswordModalRef.current.close()}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Reset Password
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default AccountPage;