"use client";

import { getCookies, deleteCookie } from "cookies-next/client";

const clearCookies = () => {
  // Get all cookies
  const cookies = getCookies() || {};

  // Get all cookies and delete them
  Object.keys(cookies).forEach((cookieName) => {
    deleteCookie(cookieName);
  });
};

export { clearCookies };
