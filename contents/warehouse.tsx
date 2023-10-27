import { useEffect, useState } from "react";
import cn from "classnames";
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo";
import type { CardData, Stock, WarehouseData } from '../util/types';
import logo from "data-base64:../assets/logo.png"
import styleText from "data-text:./warehouse.module.sass";
import * as style from './warehouse.module.sass';

export const config: PlasmoCSConfig = {
  matches: ["https://www.wildberries.ru/*"]
};

export const getInlineAnchor: PlasmoGetInlineAnchor = () => (
  document.querySelector("div.j-price-block")
);

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

function Warehouse() {
  const [warehouses, setWarehouses] = useState<Stock[]>();
  const [warehouseData, setWarehouseData] = useState<WarehouseData[]>();

  useEffect(() => {
    const id = window.location.toString().match(/\/[0-9]+\//)[0].slice(1, -1);

    fetch(`https://static-basket-01.wb.ru/vol0/data/stores-data.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(res => { setWarehouseData(res as WarehouseData[]) })

    if (id) {
      fetch(`https://card.wb.ru/cards/detail?appType=1&curr=rub&curr=rub&dest=-1663042&spp=29&nm=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(res => (res as CardData).data.products[0].sizes[0].stocks)
        .then(res => { setWarehouses(res) })
    }
  }, []);

  if (!warehouses) {
    return <div>Loading ...</div>
  }
  
  const getFavorite = (list: Stock[]) => {
    const sorted = list.toSorted((a, b) => (a.time1 + a.time2) - (b.time1 + b.time2));
    return sorted[0];
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <img src={logo} alt='logo' height={20} width={20} />

        <span>
          Раскладка по складам
        </span>
      </div>

      <div className={style.favorite}>
        {
          `${
            warehouseData.find((warehouse) => warehouse.id === getFavorite(warehouses).wh)?.name
          }: ${
            getFavorite(warehouses).time1 + getFavorite(warehouses).time2
          } час.`
        }

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          height={24}
          width={24}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      </div>

      <div className={style.wrapper}>
        <div className={style.table}>
          {
            warehouses.map((warehouse) => (
              <div className={style.row} key={warehouse.wh}>
                <div className={style.name}>
                  {`${warehouseData.find((warehouseFromData) => warehouseFromData.id === warehouse.wh)?.name}:`}
                </div>

                <div className={style.hours}>
                  {`${warehouse.time1 + warehouse.time2} ч.`}
                </div>

                <div className={style.quantity}>
                  {`${warehouse.qty} шт.`}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
};

export default Warehouse;
