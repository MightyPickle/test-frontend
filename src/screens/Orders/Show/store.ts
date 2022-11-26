import { makeAutoObservable } from "mobx";
import client from "~/api/gql";
import { SingleOrder } from "~/screens/Orders/Show/types";
import { ORDER_QUERY } from "./queries";

export default class OrdersShowStore {
  order: SingleOrder | null = null;
  id: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setOrder(order: SingleOrder){
    console.log(order);
    
    this.order = order
  }

  async getOrder(number: string) {
    const res = await client.query( ORDER_QUERY, {number} ).toPromise()
    // console.log(res.data.order);
    this.id = number
    this.setOrder(res.data.order)
  }
}


