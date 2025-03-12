import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from "react-icons/fa"; 
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useOutletContext } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  zoomPlugin
);


const AnimatedBackground = ({ animationSpeed }) => {

  const blobs = [
    { id: 1, size: '60', top: '10%', left: '5%', color: 'from-purple-500 via-pink-500' },
    { id: 2, size: '80', top: '70%', left: '80%', color: 'from-blue-500 via-green-500' },
    { id: 3, size: '50', top: '40%', left: '20%', color: 'from-yellow-500 via-red-500' },
    { id: 4, size: '100', top: '80%', left: '10%', color: 'from-green-500 via-blue-500' },
    { id: 5, size: '70', top: '20%', left: '70%', color: 'from-red-500 via-purple-500' },
  ];

  return (
    <>
      {blobs.map(blob => (
        <motion.div
          key={blob.id}
          initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: animationSpeed,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className={`absolute rounded-full bg-gradient-to-r ${blob.color} opacity-20`}
          style={{
            width: `${blob.size}rem`,
            height: `${blob.size}rem`,
            top: blob.top,
            left: blob.left,
          }}
        />
      ))}
    </>
  );
};


const SettingsPanel = ({
  show,
  toggleSettings,
  liveData,
  setLiveData,
  animationSpeed,
  setAnimationSpeed,
  resetData,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed top-0 right-0 w-full sm:w-80 h-full bg-white dark:bg-gray-800 shadow-2xl z-50 p-6 overflow-y-auto"
        >
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <button
              onClick={toggleSettings}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg 
                className="w-5 h-5 text-gray-700 dark:text-gray-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          <div className="mb-6">
            <label className="flex items-center space-x-3">
              <span className="text-gray-700 dark:text-gray-300">Live Data Feed</span>
              <input
                type="checkbox"
                checked={liveData}
                onChange={(e) => setLiveData(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Animation Speed (sec)
            </label>
            <input
              type="range"
              min="10"
              max="60"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">{animationSpeed} seconds</p>
          </div>
          <div className="mb-6">
            <button
              onClick={resetData}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
            >
              Reset Data
            </button>
          </div>
  
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const Analytics = () => {
 
  const { darkMode, setDarkMode } = useOutletContext();


  const cardHover = {
    whileHover: { scale: 1.03, rotate: 1 },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };


  const [timeRange, setTimeRange] = useState('monthly');
  const [chartType, setChartType] = useState('line');
  const [alert, setAlert] = useState(null);
  const [dataPoints, setDataPoints] = useState([1000, 2000, 1500, 3000, 2500, 4000]);

 
  const [liveData, setLiveData] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(30);
  const [showSettings, setShowSettings] = useState(false);

 
  const chartRefs = {
    sales: useRef(null),
    visitors: useRef(null),
    salesVsVisitors: useRef(null)
  };


  const monthlySalesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Sales ($)',
      data: dataPoints,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    }],
  };

  const yearlySalesData = {
    labels: ['2021', '2022', '2023'],
    datasets: [{
      label: 'Sales ($)',
      data: [12000, 18000, 25000],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    }],
  };


  const monthlyVisitorsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Visitors',
      data: [500, 700, 800, 1000, 1200, 1500],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
    }],
  };

  const yearlyVisitorsData = {
    labels: ['2021', '2022', '2023'],
    datasets: [{
      label: 'Visitors',
      data: [6000, 8000, 10000],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
    }],
  };

 
  const productsData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    datasets: [{
      label: 'Sold Products',
      data: [500, 1000, 1500, 800, 2000],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#ff9f40'],
    }],
  };

  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys'],
    datasets: [{
      label: 'Sales by Category',
      data: [3000, 1500, 2000, 1000, 500],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#ff9f40'],
    }],
  };

  const salesVsVisitorsData = {
    labels: timeRange === 'monthly' 
      ? ['January', 'February', 'March', 'April', 'May', 'June'] 
      : ['2021', '2022', '2023'],
    datasets: [
      {
        label: 'Sales ($)',
        data: timeRange === 'monthly' 
          ? [1000, 2000, 1500, 3000, 2500, 4000] 
          : [12000, 18000, 25000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Visitors',
        data: timeRange === 'monthly' 
          ? [500, 700, 800, 1000, 1200, 1500] 
          : [6000, 8000, 10000],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
      }
    ],
  };


  const [salesData, setSalesData] = useState(monthlySalesData);
  useEffect(() => {
    setSalesData(timeRange === 'monthly' ? monthlySalesData : yearlySalesData);
  }, [timeRange, dataPoints]);

  
  useEffect(() => {
    let interval;
    if (liveData) {
      interval = setInterval(() => {
        const newPoint = Math.floor(Math.random() * 5000);
        setDataPoints(prev => {

          const updated = [...prev.slice(1), newPoint];
          return updated;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [liveData]);


  const resetZoom = (chartName) => {
    if (chartRefs[chartName].current) {
      chartRefs[chartName].current.resetZoom();
    }
  };


  const addDataPoint = () => {
    const newDataPoint = Math.floor(Math.random() * 5000);
    setDataPoints([...dataPoints, newDataPoint]);
    setAlert('Data point added successfully!');
    setTimeout(() => setAlert(null), 3000);
  };


  const removeDataPoint = () => {
    if (dataPoints.length > 1) {
      setDataPoints(dataPoints.slice(0, -1));
      setAlert('Data point removed successfully!');
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + salesData.labels.join(",") + "\n" 
      + salesData.datasets[0].data.join(",");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_data.csv");
    document.body.appendChild(link);
    link.click();
  };


  const resetData = () => {
    setDataPoints([1000, 2000, 1500, 3000, 2500, 4000]);
    setAlert('Data has been reset!');
    setTimeout(() => setAlert(null), 3000);
  };


  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} relative min-h-screen overflow-hidden py-10`}>

      <AnimatedBackground animationSpeed={animationSpeed} />

      <div className="container mx-auto px-4 relative z-10">
      
<motion.header 
  variants={fadeInUp} 
  initial="initial" 
  animate="animate" 
  className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-10 gap-4"
>
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center sm:text-left">Analytics Dashboard</h1>
  <div className="flex flex-col xs:flex-row items-center gap-3 w-full xs:w-auto">
    <div className="flex items-center gap-3 w-full justify-center xs:justify-start">
      {liveData && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold"
        >
          LIVE
        </motion.span>
      )}
      <button
        onClick={toggleSettings}
        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg shadow-md transition-colors w-1/2 text-sm sm:text-base"
      >
        Settings
      </button>
    </div>
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg shadow-lg transition-colors flex items-center gap-2 text-sm sm:text-base w-1/2 xs:w-auto justify-center"
    >
      {darkMode ? (
        <>
          <FaSun className="text-sm sm:text-base max-sm:text-lg" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <FaMoon className="text-sm sm:text-base" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  </div>
</motion.header>


        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="flex flex-wrap gap-4 justify-center mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange('monthly')}
              className={`px-4 py-2 rounded-lg shadow-lg transition-colors ${timeRange === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeRange('yearly')}
              className={`px-4 py-2 rounded-lg shadow-lg transition-colors ${timeRange === 'yearly' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Yearly
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setChartType('line')}
              className={`px-4 py-2 rounded-lg shadow-lg transition-colors ${chartType === 'line' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-4 py-2 rounded-lg shadow-lg transition-colors ${chartType === 'bar' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Bar
            </button>
          </div>
        </motion.div>

 
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
          <motion.div
            {...cardHover}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-4">Sales Overview</h2>
            <div className="h-48 sm:h-64">
              {chartType === 'line' ? (
                <Line
                  ref={chartRefs.sales}
                  data={salesData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      zoom: {
                        zoom: {
                          wheel: { enabled: true },
                          pinch: { enabled: true },
                          mode: 'xy',
                        },
                      },
                    },
                  }}
                />
              ) : (
                <Bar
                  data={salesData}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              )}
            </div>
            <button
              onClick={() => resetZoom('sales')}
              className="mt-4 text-blue-500 hover:text-blue-700 font-semibold"
            >
              Reset Zoom
            </button>
          </motion.div>

  
          <motion.div
            {...cardHover}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-4">Visitors Overview</h2>
            <div className="h-48 sm:h-64">
              <Line
                ref={chartRefs.visitors}
                data={timeRange === 'monthly' ? monthlyVisitorsData : yearlyVisitorsData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    zoom: {
                      zoom: {
                        wheel: { enabled: true },
                        pinch: { enabled: true },
                        mode: 'xy',
                      },
                    },
                  },
                }}
              />
            </div>
            <button
              onClick={() => resetZoom('visitors')}
              className="mt-4 text-blue-500 hover:text-blue-700 font-semibold"
            >
              Reset Zoom
            </button>
          </motion.div>


          <motion.div
            {...cardHover}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-4">Product Sales</h2>
            <div className="h-48 sm:h-64">
              <Pie
                data={productsData}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </motion.div>

    
          <motion.div
            {...cardHover}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-4">Sales by Category</h2>
            <div className="h-48 sm:h-64">
              <Doughnut
                data={categoryData}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </motion.div>

       
          <motion.div
            {...cardHover}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-4">Sales vs Visitors</h2>
            <div className="h-48 sm:h-64">
              <Bar
                ref={chartRefs.salesVsVisitors}
                data={salesVsVisitorsData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    zoom: {
                      zoom: {
                        wheel: { enabled: true },
                        pinch: { enabled: true },
                        mode: 'xy',
                      },
                    },
                  },
                }}
              />
            </div>
            <button
              onClick={() => resetZoom('salesVsVisitors')}
              className="mt-4 text-blue-500 hover:text-blue-700 font-semibold"
            >
              Reset Zoom
            </button>
          </motion.div>
        </div>


        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          <motion.div
            {...cardHover}
            className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-gray-700 dark:text-gray-300">Total Sales</h3>
            <p className="text-2xl font-bold">$15,000</p>
          </motion.div>
          <motion.div
            {...cardHover}
            className="bg-green-100 dark:bg-green-900 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-gray-700 dark:text-gray-300">Total Visitors</h3>
            <p className="text-2xl font-bold">6,000</p>
          </motion.div>
          <motion.div
            {...cardHover}
            className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-gray-700 dark:text-gray-300">Orders Completed</h3>
            <p className="text-2xl font-bold">1,200</p>
          </motion.div>
          <motion.div
            {...cardHover}
            className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-gray-700 dark:text-gray-300">Conversion Rate</h3>
            <p className="text-2xl font-bold">20%</p>
          </motion.div>
        </motion.div>


        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="flex flex-wrap gap-4 justify-center mt-10">
          <button
            onClick={exportData}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
          >
            Export Data
          </button>
          <button
            onClick={addDataPoint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
          >
            Add Data Point
          </button>
          <button
            onClick={removeDataPoint}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
          >
            Remove Data Point
          </button>
        </motion.div>


        <AnimatePresence>
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg"
            >
              {alert}
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      <SettingsPanel
        show={showSettings}
        toggleSettings={toggleSettings}
        liveData={liveData}
        setLiveData={setLiveData}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        resetData={resetData}
      />
    </div>
  );
};

export default Analytics;
