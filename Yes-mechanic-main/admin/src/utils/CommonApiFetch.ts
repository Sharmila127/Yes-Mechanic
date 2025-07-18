/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetPartnerList } from "../features/CommonService"

export async function FetchPartnerList() {
      const data:any = await GetPartnerList()
      return data.data
}