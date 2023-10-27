import { useEffect, useState } from "react";
import cn from "classnames";
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo";
import type { CardData, Product } from '../util/types';
import logo from "data-base64:../assets/logo.png"
import styleText from "data-text:./price.module.sass";
import * as style from './price.module.sass';

export const config: PlasmoCSConfig = {
  matches: ["https://www.wildberries.ru/*"]
};

export const getInlineAnchor: PlasmoGetInlineAnchor = () => (
  document.querySelector("div.product-page__price-block--aside")
);

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

function Price() {
  // const mailPort = usePort("mail");

  // useEffect(() => {
  //   console.log(mailPort);

  //   sendToBackground({name: "url"})
  //     .then(( url ) => console.log(`effect ${url}`));
  // }, []);

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const id = window.location.toString().match(/\/[0-9]+\//)[0].slice(1, -1);

    if (id) {
      fetch(`https://card.wb.ru/cards/detail?appType=1&curr=rub&dest=-1663042&spp=29&nm=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(res => (res as CardData).data.products[0])
        .then(res => { setProduct(res) })
    }
  }, [window.location]);

  return (
    <div className={style.container}>
      <img src={logo} alt='logo' height={20} width={20} />

      <span className={style.discount}>
        СПП:

        <span className={ cn(style.digits, style.black) }>
          {` ${product?.extended.clientSale}%`}
        </span>
      </span>

      <span className={style.price}>
        До СПП:

        <span className={style.digits}>
          {` ${product?.extended.basicPriceU/100}₽`}
        </span>
      </span>
    </div>
  )
};

export default Price;
