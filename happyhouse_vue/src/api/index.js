import axios from "axios";
import { API_BASE_URL, APT_DEAL_URL, PARKING_URL } from "@/config";

// axios 객체 생성
function apiInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

function houseInstance() {
  const instance = axios.create({
    baseURL: APT_DEAL_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

function parkingInstance() {
  const instance = axios.create({
    baseURL: PARKING_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

function interestInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

export { apiInstance, houseInstance, parkingInstance, interestInstance };
