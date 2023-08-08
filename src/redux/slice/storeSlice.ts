import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Campaign, ProviderData, UserInfo } from "../../interfaces";

interface UserState {
  userInfo?: UserInfo,
  providerData?: ProviderData[]
  campaigns: any,
  restaurant: any
}

const initialState: UserState = {
  userInfo: undefined,
  providerData: undefined,
  campaigns: {},
  restaurant: {}
}

export const storeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state: UserState, action: PayloadAction<any>) => {
      state.userInfo = action.payload
    },
    setProviderData: (state: UserState, action: PayloadAction<any>) => {
      state.providerData = action.payload
    },
    setCampaigns: (state: UserState, action: PayloadAction<any>) => {
      state.campaigns = action.payload
    },
    setRestaurant: (state: UserState, action: PayloadAction<any>) => {
      state.restaurant = action.payload
    },
  }
})

export const {
  setUserInfo,
  setCampaigns,
  setProviderData,
  setRestaurant
} = storeSlice.actions

export default storeSlice.reducer