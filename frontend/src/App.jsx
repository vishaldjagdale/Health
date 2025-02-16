import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";  // ✅ Ensure correct import


import Index from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Symptoms from "./pages/Symptoms";
import Specialists from "./pages/Specialists";
import Locations from "./pages/Locations";
import Feedback from "./pages/Feedback";
import WhatIf from "./pages/WhatIf";
import RemindMe from "./pages/RemindMe";
// import Footer from "@/components/layout/Footer";
import { Header } from "./components/layout/Header"; // ✅ Import Footer

import NotFound from "./pages/NotFound";
import Chatbot from "./pages/Chatboat";
import ImageUpload from "./pages/ImageUpload";
import { Toaster } from "react-hot-toast";
import HealthTracker from "./pages/HealthTracker";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>  {/* ✅ Wrap with Redux Provider */}
  <PersistGate loading={null} persistor={persistor}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* <Sonner /> */}
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/symptoms" element={<Symptoms />} />
                <Route path="/specialists" element={<Specialists />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/whatif" element={<WhatIf />} />
                <Route path="/RemindMe" element={<RemindMe />} />
                <Route path="/chat" element={<Chatbot />} />
                <Route path="/imageupload" element={<ImageUpload />} />
            <Route path="/healthtracker" element={<HealthTracker />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
          </main>
          {/* <Footer /> ✅ Add Footer at the bottom */}
        </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </PersistGate>
  </Provider>
);

export default App;
