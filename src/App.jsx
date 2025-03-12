import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import RegisterPage from "./pages/auth/Register/RegisterPage";
import LoginPage from "./pages/auth/Login/LoginPage";
import Home from "./pages/Home/Home";
import ProductsPage from "./pages/Products/productsPage";
import ProductDetailsPage from "./pages/ProductDetails/ProductDetailsPage";
import CartPage from "./pages/Cart/CartPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicy/PrivacyPolicyPage";
import AboutPage from "./pages/About/AboutPage";
import AccountPage from "./pages/Account/AccountPage";
import ContactPage from "./pages/Contact/ContactPage";
import FAQPage from "./pages/FAQ/FAQPage";
import Layout from "./Components/Layout/Layout";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import WishlistPage from "./pages/wishlist/WishListPage";
import OffersPage from "./pages/Offers/OffersPage";
import StripeCheckout from "./Components/StripeCheckout/StripeCheckout";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import BlogSection from "./Components/BlogSection/BlogSection";
import SupportPage from "./pages/Support/Support";
import ReturnsExchangePage from "./pages/ReturnsExchange/ReturnsExchange";
import ShippingDeliveryPage from "./pages/ShippingDelivery/ShippingDelivery";
import CareersPage from "./pages/Careers/Careers";
import AffiliatesPage from "./pages/Affiliates/Affiliates";
import TermsConditionsPage from "./pages/TermsConditions/TermsConditions";
import CookiePolicyPage from "./pages/CookiePolicy/CookiePolicy";
import SitemapPage from "./pages/Sitemap/Sitemap";


const stripePromise = loadStripe('pk_test_51Q4F6xLqPSit9nqOcd8cVYUe6MOPdaG4enwYga63gGWJ6vmpdxw4AYzUaVnSBpphDrGnRQJHDTmYhCfcliG7sRaI00m0WcpLUh');

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/product/:id", element: <ProductDetailsPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      {
        path: "/account",
        element: <AccountPage />,
      },
      { path: "/faq", element: <FAQPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/analytics", element: <AnalyticsPage />},
      { path: "/analytics", element: <AnalyticsPage />},
      { path: "/settings", element: <SettingsPage />},
      { path: "/wishlist", element: <WishlistPage />},
      { path: "/offers", element: <OffersPage />},
      { path: "/blog", element: <BlogSection />},
      { path: "/support", element: <SupportPage />},
      { path: "/returns-exchange", element: <ReturnsExchangePage />},
      { path: "/shipping-delivery", element: <ShippingDeliveryPage />},
      { path: "/careers", element: <CareersPage />},
      { path: "/affiliates", element: <AffiliatesPage />},
      { path: "/terms", element: <TermsConditionsPage />},
      { path: "/cookie-policy", element: <CookiePolicyPage />},
      { path: "/sitemap", element: <SitemapPage />},
      { path: "/payment", element:<Elements stripe={stripePromise}><StripeCheckout /></Elements> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;


