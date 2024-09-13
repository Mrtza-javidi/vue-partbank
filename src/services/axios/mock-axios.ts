import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// To enable or disable mock mode
let mockingEnabled: boolean = false;

// Object to store mock data
const mocks: { [key: string]: any } = {};

// Add mock data for a specific URL
export function addMock(url: string, data: any): void {
  mocks[url] = data;
}

// Enable or disable mocking mode
export function enableMocking(state: boolean): void {
  mockingEnabled = state;
}

// Check if a specific URL is mocked
const isUrlMocked = (url: string | undefined): boolean =>
  url ? url in mocks : false;

// Create an error for mocking the request
const getMockError = (config: AxiosRequestConfig): Promise<any> => {
  if (!config.url) {
    return Promise.reject(new Error("Missing URL in request config"));
  }

  const mockError = new Error("Mocked request error") as any;
  mockError.config = config;
  mockError.mockData = mocks[config.url];
  return Promise.reject(mockError);
};

// Type guard to check if error contains mockData
const isMockError = (error: any): error is { mockData: any } => {
  return Boolean(error.mockData);
};

// Generate a mock response for the request
const getMockResponse = (mockError: any): Promise<AxiosResponse<any>> => {
  const { mockData, config } = mockError;

  // Handle mocked errors (any status code that is not 2xx)
  if (mockData.status && String(mockData.status)[0] !== "2") {
    const err = new Error(mockData.message || "mock error") as any;
    err.config = config;
    err.code = mockData.status;
    return Promise.reject(err);
  }

  // Handle mocked success
  return Promise.resolve(
    Object.assign(
      {
        data: {},
        status: 200,
        statusText: "OK",
        headers: {},
        config,
        isMock: true,
      },
      mockData
    )
  );
};

// Add request interceptor
axios.interceptors.request.use(
  (config) => {
    if (mockingEnabled && isUrlMocked(config.url)) {
      console.log("axios mocking " + config.url);
      return getMockError(config); // Mocked request
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isMockError(error)) {
      return getMockResponse(error); // Mocked response
    }
    return Promise.reject(error);
  }
);
