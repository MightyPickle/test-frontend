import React, { useEffect } from "react";
import OrdersShowStore from "./store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import styles from "./styles.m.styl";
import Item from "./components/Item";
import { map } from "lodash";
import { SingleOrderItem } from "./types";
import DeliveryType from "~/components/DeliveryType";
import OrderStatus from "~/components/OrderStatus";

type ShowParams = {
  id: string;
};

const OrdersShow = observer(
  (): JSX.Element => {
    const [state] = React.useState(new OrdersShowStore());
    const params: ShowParams = useParams()
    
    useEffect(()=>{
      state.getOrder(params.id)
    },[])
    
    return (
      <div className={styles.screenWrapper}>
        <div className={styles.screen}>
          <h3> Номер заказа: {state.order?.number} </h3>
          <div className={styles.items}>
            <h4>Товары:</h4>
              {map(state.order?.items, (item: SingleOrderItem, index: number)=>(
                <Item item={item} key={index}/>
                ))}         
          </div>
          <div title={state.order?.delivery?.code}>
          {state.order?.delivery && <DeliveryType code={state.order?.delivery.code} />}
          </div>
          {state.order?.status &&
          <div title={state.order?.status}>
              <OrderStatus code={state.order?.status} />
          </div>
          }
        </div>
      </div>
    );
  }
);

export default OrdersShow;
