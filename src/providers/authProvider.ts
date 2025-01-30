import { AuthBindings } from "@refinedev/core";
import { axiosInstance, setAxiosToken } from "../lib/axiosInstance";
import { IIdentity } from "../types/IIdentity";
import { AccountTypes } from "../enums/user/account-type.enum";

let memoryToken: string | null = null;

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    //Todo for now

    memoryToken = "1234567890";
    setAxiosToken(memoryToken);
    return {
      success: true,
      redirectTo: "/",
    };

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        //memoryToken = response.data.token;
        //setAxiosToken(memoryToken);
        memoryToken = "1234567890";
        setAxiosToken(memoryToken);
        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid credentials",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: error.response?.data?.message || "Login failed",
        },
      };
    }
  },

  logout: async () => {
    memoryToken = null;
    setAxiosToken(null);
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    // todo verified..
    return {
      authenticated: true,
    };
    if (!memoryToken) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }

    try {
      // Verify token is still valid with a backend call
      await axiosInstance.post("/auth/verify");
      return {
        authenticated: true,
      };
    } catch (error) {
      memoryToken = null;
      setAxiosToken(null);
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },

  getPermissions: async () => {
    if (!memoryToken) return null;

    try {
      const response = await axiosInstance.post("/auth/permissions");
      return response.data.permissions;
    } catch (error) {
      return null;
    }
  },

  getIdentity: async () => {
    return {
      authId: "asd1asd",
      username: "John Doe",
      email: "deneme@gmail.com",
      emailVerified: true,
      phoneNumber: "1234567890",
      accountType: AccountTypes.DEVELOPER,
    } as IIdentity;

    if (!memoryToken) return null;

    try {
      const response = await axiosInstance.post("/auth/me");
      const user = response.data;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      };
    } catch (error) {
      return null;
    }
  },

  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      memoryToken = null;
      setAxiosToken(null);
      return {
        logout: true,
        redirectTo: "/login",
      };
    }

    return {};
  },
};
