"use client";
import {
  createContext,
  useEffect,
  useContext,
  ReactNode,
  useState,
} from "react";

import { setCookie, destroyCookie, parseCookies } from "nookies";
import { useUi } from "./UiContext";
import { api } from "@/shared/api";
