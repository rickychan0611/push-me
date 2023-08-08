import axios from "axios"
import getCookie from "../utils/getCookie"

const URL = process.env.NEXT_PUBLIC_HOST_URL
// const userToken = getCookie("userToken")

export const GET = async (api: string, params: any) => {
  try {
    const response = await axios.get(URL + api,
      { params, headers: { Authorization: getCookie("userToken") || "" } })
    return response.data
  }
  catch (err: any) {
    console.log(err?.response?.data)
    return err
  }
}

export const POST = async (api: string, body: any) => {
  try {
    const response = await axios.post(URL + api,
      body, { headers: { Authorization: getCookie("userToken") || "" } })
    if (response.data.code === 200) {
      return response.data
    }
    else throw (response.data)
  }
  catch (err: any) {
    return err
  }
}
