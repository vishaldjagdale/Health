import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Symptoms from "./pages/Symptoms";
import Specialists from "./pages/Specialists";
import Locations from "./pages/Locations";
import Feedback from "./pages/Feedback";
import WhatIf from "./pages/WhatIf";
import RemindMe from "./pages/RemindMe";
import NotFound from "./pages/NotFound"; // Not Found should be the last route
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
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
          <Route path="*" element={<NotFound />} /> {/* Keep this at the end */}
        </Routes>
        <Toaster />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
