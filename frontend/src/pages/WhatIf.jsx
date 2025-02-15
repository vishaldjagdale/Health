import React from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const WhatIf = () => {
  return (
    <div>
      <Header />
      <h1>Heyy</h1>
      <Input placeholder="Enter something..." />
      <Button>Click Me</Button>
    </div>
  );
};

export default WhatIf;
