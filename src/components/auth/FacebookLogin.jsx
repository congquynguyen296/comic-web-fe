import React from "react";
import { Facebook } from "@mui/icons-material";

const FacebookLogin = () => {
  return (
    <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-200 transition">
      <Facebook className="!w-6 !h-6 text-gray-700" />
    </button>
  );
};

export default FacebookLogin;
