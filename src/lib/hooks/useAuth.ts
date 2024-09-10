/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../reduxHooks";
import { authState, getUser } from "../features/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector(authState);

  const getCurrentUser = useCallback(() => {
    dispatch(getUser());
  }, [dispatch]);

  return { user, loading, error, getCurrentUser };
};
