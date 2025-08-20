import axios from "axios";
import axiosRetry from "axios-retry";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BURL,
    timeout: 120000,
});

// Retry failed requests 
axiosRetry(axiosInstance, {
    retries: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) =>
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        error.code === "ECONNABORTED"
});

let isRefreshing = false;//flag to prevent multiple refresh token requests.
let failedQueue = [];// stores requests that come in while a token refresh is already in progress.

const processQueue = (error, token = null) => {//Resolves all queued requests with the new token
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest || !error.response) {//guard network error
            return Promise.reject(error);
        }


        //Triggers token refresh only if: It's a 401 Unauthorized error.

        if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/user/refreshAccessToken")) {

            if (isRefreshing) {//already rereshing ?
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token) => {
                            originalRequest.headers["Authorization"] = `Bearer ${token}`;
                            resolve(axiosInstance(originalRequest));
                        },
                        reject: (err) => {
                            reject(err);
                        },
                    });
                });
            }

            //Start Refresh Flow
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) throw new Error("No refresh token available");

                const response = await axios.post(
                    `${import.meta.env.VITE_API_BURL}/api/v1/user/refreshAccessToken`,
                    { refreshToken }
                );

                const { token, newRefreshToken } = response.data;

                localStorage.setItem("accessToken", token);
                localStorage.setItem("refreshToken", newRefreshToken);

                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                processQueue(null, token);
                isRefreshing = false;

                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                isRefreshing = false;
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                // window.location.href = "/login"; 
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
