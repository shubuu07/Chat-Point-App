import uaxios from 'axios';
import config from '../env';
import axios from '../customAxios';


// ------------------------------------------------------------
// ----------------------- Signin ------------------------------
// ------------------------------------------------------------

export const ragisterNewUser = async data => {
  const newUserUrl = `${config.API_URL}api/auth/register`;
  try {
    const loginResponse = await uaxios.post(newUserUrl, data);
    return loginResponse.data;
  } catch (error) {
    console.log("error api file======", error);
  }
};

export const loginUser = async data => {
  const LoginURL = `${config.API_URL}api/auth/login`;
  try {
    const loginResponse = await uaxios.post(LoginURL, data);
    return loginResponse.data;
  } catch (error) {
    console.log("error api file======", error);
  }
};

export const getUserDetails = async id => {
  const userDetailsURL = `${config.API_URL}api/auth/getuserDetails?userid=${id}`;
  try {
    const detailsData = await axios.get(userDetailsURL);
    return detailsData.data;
  } catch (error) {
    console.log("error api file======", error);
  }
};

// ------------------------------------------------------------
// -------------------- Chat Apis -----------------------------
// ------------------------------------------------------------

export const myChats = async data => {
  const myChatURL = `${config.API_URL}api/chat/getAllChats`;
  try {
    const chatResponse = await axios.get(myChatURL, data);
    return chatResponse.data;
  } catch (error) {
    console.log("error api file======", error);
  }
};

// ------------------------------------------------------------
// -------------------- Message Apis -----------------------------
// ------------------------------------------------------------

export const sendMessage = async data => {
  const messageURL = `${config.API_URL}api/message/sendMessage`;
  try {
    const messageResponse = await axios.post(messageURL, data);
    return messageResponse.data;
  } catch (error) {
    console.log("error api file======", error);
  }
};

export const getMyMessage = async data => {
  const messageURL = `${config.API_URL}api/message/myMessages${data}`;
  try {
    const messageResponse = await axios.get(messageURL);
    return messageResponse.data;
  } catch (error) {
    console.log("error api file======", error);
  }
};
