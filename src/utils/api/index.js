import uaxios from 'axios';
import config, { Urls } from '../env';
import { GOOGLE_API_KEY } from '@env';
import axios from '../customAxios';


// ------------------------------------------------------------
// ----------------------- Signin ------------------------------
// ------------------------------------------------------------

export const ragisterNewUser = async data => {
  const LoginURL = `${config.API_URL}app/driverphoneregistration`;
  try {
    const loginResponse = await uaxios.post(LoginURL, data);
    return loginResponse.data;
  } catch (error) {
    console.log("error api file======", error);
  }
};

export const loginUser = async data => {
  const LoginURL = `${config.API_URL}app/driverphonelogin`;
  try {
    const loginResponse = await uaxios.post(LoginURL, data);
    return loginResponse.data;
  } catch (error) {
    console.log("error api file======", error);
  }
};

export const EditUser = async (id, data) => {
  const UserExistURL = `${config.API_URL}app/edit_profile/${id}`;
  try {
    const response = await axios.put(UserExistURL, data);
    return response.data;
  } catch (error) {
    console.log("error api file======", error);
  }
};

export const getUserProfile = async (id) => {
  const UserURL = `${config.API_URL}delivery/edit-deliveryboy/${id}`;
  try {
    const response = await axios.get(UserURL);
    return response.data;
  } catch (error) {
    console.log("error api file======", error);
  }
};

export const editbasicDetails = async (id, data) => {
  const UserURL = `${config.API_URL}delivery/edit-deliveryboy/${id}`;
  try {
    const response = await axios.put(UserURL, data);
    return response.data;
  } catch (error) {
    console.log("error api file======", error);
  }
};

// ------------------------------------------------------------
// ------------------------- add config charge api------------------------
// ------------------------------------------------------------
export const getChargeConfig = async () => {
  const url = `${config.API_URL}app/add_config_charges`;
  try {
    const response = await axios.get(url)
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};

// ------------------------------------------------------------
// ------------------------- add check franchise api------------------------
// ------------------------------------------------------------
export const getCheckFranchise = async (data) => {
  const url = `${config.API_URL}app/check_franchise_bypincode`;
  try {
    const response = await uaxios.get(url, { params: data })
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};


export const getGooglePlaceApiPincode = async (query) => {
  const url = `${Urls.GOOGLE_PLACE_PINCODE_API}?address=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`;
  try {
    const response = await uaxios.get(url)
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};

// ------------------------------------------------------------
// ------------------------- latest offer product api ------------------------
// ------------------------------------------------------------

export const getGooglePlaceApi = async (query) => {
  const url = `${Urls.GOOGLE_PLACE_API}?input=${query}&key=${GOOGLE_API_KEY}&language=en&radius=50000&rankby=distance`;
  try {
    const response = await uaxios.get(url)
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};


// ------------------------------------------------------------
// ------------------------- customer support api------------------------
// ------------------------------------------------------------
export const getAllCustomerSupport = async (pincode) => {
  const url = `${config.API_URL}app/pincodewise_customer_support/${pincode}`;
  try {
    const response = await axios.get(url)
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};


// ------------------------------------------------------------
// -------------------------All Orders api------------------------
// ------------------------------------------------------------
export const getAllOrders = async (data) => {
  const url = `${config.API_URL}delivery/latest_deliveryboy_order`;
  try {
    const response = await axios.get(url, { params: data })
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};
// ------------------------------------------------------------
// ------------------------- Orders api------------------------
// ------------------------------------------------------------
export const orderAccept = async (data) => {
  const url = `${config.API_URL}delivery/accept_order_deliveryboy`;
  try {
    const response = await axios.post(url, data)
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};

// ------------------------------------------------------------
// ----------------------- Reach To Restaurant api-------------
// ------------------------------------------------------------
export const getRestaurantDetails = async (data) => {
  const url = `${config.API_URL}delivery/get_orderdetails`;
  try {
    const response = await axios.get(url, { params: data })
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};


// ------------------------------------------------------------
// ----------------------- Reach To Restaurant api-------------
// ------------------------------------------------------------
export const getOrderDetailsTracking = async (data) => {
  const url = `${config.API_URL}delivery/order_details_tracking`;
  try {
    const response = await axios.post(url, data)
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};

// ------------------------------------------------------------
// ----------------------- Reach To Restaurant api-------------
// ------------------------------------------------------------
export const getAllOrdersDeliveryBoy = async (data) => {
  const url = `${config.API_URL}delivery/get_deliveryboy_order`;
  try {
    const response = await axios.get(url, { params: data })
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};



// ------------------------------------------------------------
// ----------------------- Get Trip Details api-------------
// ------------------------------------------------------------
export const getTripDetails = async (data) => {
  const url = `${config.API_URL}delivery/get_trip_details`;
  try {
    const response = await axios.get(url, { params: data })
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};

// ------------------------------------------------------------
// ----------------------- start stop session api-------------
// ------------------------------------------------------------
export const startStopSession = async (data) => {
  const url = `${config.API_URL}delivery/start_stop_session`;
  try {
    const response = await axios.post(url, data)
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};

// ------------------------------------------------------------
// ----------------------- delivery isactive update api-------------
// ------------------------------------------------------------
export const getIsactive = async (id) => {
  const url = `${config.API_URL}delivery/delivery_isactive_update`;
  try {
    const response = await axios.get(url, { params: id })
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};

// ------------------------------------------------------------
// ----------------------- delivery isactive update api-------------
// ------------------------------------------------------------
export const DeliveryIsactive = async (data) => {
  const url = `${config.API_URL}delivery/delivery_isactive_update`;
  try {
    const response = await axios.post(url, data)
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};


// ------------------------------------------------------------
// ----------------------- Deliveryboy Earnings Api-------------
// ------------------------------------------------------------
export const DeliveryboyEarnings = async (data) => {
  const url = `${config.API_URL}delivery/deliveryboy_earnings`;
  try {
    const response = await axios.get(url, { params: data })
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};

// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------- App Wallet api----------------
// ------------------------------------------------------------
// ------------------------------------------------------------


export const AddMoneyWallet = async (data) => {
  const url = `${config.API_URL}app/wallet_transaction`;
  try {
    const response = await axios.post(url, data)
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};

export const getWalletTransaction = async (id) => {
  const url = `${config.API_URL}app/list_wallet_transaction?user=${id}`;
  try {
    const response = await axios.get(url)
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};

export const getFilterWalletTransaction = async (id, data) => {
  const url = `${config.API_URL}app/list_wallet_transaction?user=${id}&start_date=${data.date1}&end_date=${data.date2}`;
  try {
    const response = await axios.get(url)
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};

export const requestMoney = async (data) => {
  const url = `${config.API_URL}app/withdraw_amount`
  try {
    const response = await axios.post(url, data);
    return response.data
  } catch (error) {
    console.log("Api file error =========", err);
  }
}

// ------------------------------------------------------------
// ------------------------------------------------------------
// -------------- Google Place Api Distance api----------------
// ------------------------------------------------------------
// ------------------------------------------------------------

export const getGooglePlaceApiDistance = async (origin, destination) => {
  const url = `${Urls.GOOGLE_PLACE_DISTANCE_TIME_API}?units=metric&origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${GOOGLE_API_KEY}&mode=driving&optimize=true`;
  try {
    const response = await uaxios.get(url);
    const { status, rows } = response.data;
    if (status === 'OK') {
      let shortestRoute = rows[0].elements[0];
      for (let i = 1; i < rows.length; i++) {
        const { distance, duration } = rows[i].elements[0];
        if (distance.value < shortestRoute.distance.value ||
          (distance.value === shortestRoute.distance.value && duration.value < shortestRoute.duration.value)) {
          shortestRoute = rows[i].elements[0];
        }
      }
      return { distance: shortestRoute.distance.text, duration: shortestRoute.duration.text };
    } else {
      throw new Error('Failed to fetch distance and time.');
    }
  } catch (err) {
    console.log("Api file error =========", err);
  }
};

// ------------------------------------------------------------
// ------------------------------------------------------------
// -------------- update order status api----------------
// ------------------------------------------------------------
// ------------------------------------------------------------

export const updateOrderStatus = async (data) => {
  const url = `${config.API_URL}delivery/update_order_status`;
  try {
    const response = await axios.post(url, data)
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};



// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------- Notification api----------------
// ------------------------------------------------------------
// ------------------------------------------------------------

export const getUserNotification = async (id) => {
  const url = `${config.API_URL}app/get_notification/${id}`;
  try {
    const response = await axios.get(url)
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};

export const deleteUserNotification = async (id) => {
  const url = `${config.API_URL}app/delete_notification/${id}`;
  try {
    const response = await axios.delete(url)
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};

// ------------------------------------------------------------
// ------------- get user order list api------------------------
// ------------------------------------------------------------
export const getOrdersDetails = async (data) => {
  const url = `${config.API_URL}app/get_ordered_details_user`;
  try {
    const response = await axios.get(url, { params: data })
    return response.data
  }
  catch (err) {
    console.log("Api file error =========", err);
  }
};

// ------------------------------------------------------------
// ------------------------------------------------------------
// ----------------- App Rating to delivery api----------------
// ------------------------------------------------------------
// ------------------------------------------------------------


export const getRatingToDeliveryboy = async (id, page) => {
  const url = `${config.API_URL}delivery/rate_deliveryboy/?deliveryboy=${id}&page=${page}`;

  try {
    const response = await uaxios.get(url)
    return response.data
  }
  catch (err) {
    console.log("Api file error===========", err);
  }
};