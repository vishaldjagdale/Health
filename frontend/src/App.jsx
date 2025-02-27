import React, { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";

import Index from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Symptoms from "./pages/Symptoms";
import Specialists from "./pages/Specialists";
import Locations from "./pages/Locations";
import Feedback from "./pages/Feedback";
import WhatIf from "./pages/WhatIf";
import RemindMe from "./pages/RemindMe";
import Chatbot from "./pages/Chatboat";
import ImageUpload from "./pages/ImageUpload";
import HealthTracker from "./pages/HealthTracker";
import NotFound from "./pages/NotFound";
import DoctorList from "./components/DoctorList";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";
import ReportAnalyzer from "./components/ReportAnalyzer";
import HabitTracker from "./pages/HabitTracker";
import RemainderForm from "./components/remainderForm";
import ReminderList from "./pages/RemainderList";
import NewsFeed from "./components/NewsFeed";

import { Toaster } from "react-hot-toast";
import { Header } from "./components/layout/Header";

const queryClient = new QueryClient();

const App = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/symptoms" element={<Symptoms />} />
                    {/* <Route path="/doctors" element={<DoctorList />} /> */}
                    <Route path="/locations" element={<Locations />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/whatif" element={<WhatIf />} />
                    <Route path="/remindme" element={<RemindMe />} />
                    <Route path="/chat" element={<Chatbot />} />
                    <Route path="/imageupload" element={<ImageUpload />} />
                    <Route path="/healthtracker" element={<HealthTracker />} />
                    <Route path="/doctors" element={<DoctorList onSelectDoctor={setSelectedDoctor} />} />
                    <Route path="/book-appointment" element={<AppointmentForm doctor={selectedDoctor} />} />
                    <Route path="/appointments-list" element={<AppointmentList />} />
                    <Route path="/report-analyzer" element={<ReportAnalyzer />} />
                    <Route path="/habit-tracker" element={<HabitTracker />} />
                    <Route path="/remainder" element={<RemainderForm />} />
                    <Route path="/remainder-list" element={<ReminderList />} />
                    <Route path="/news-feed" element={<NewsFeed />} />
                  

                    <Route path="*" element={<NotFound />} />

                  </Routes>
                </main>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
