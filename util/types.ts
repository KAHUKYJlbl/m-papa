export type Stock = {
  "wh": number,
  "qty": number,
  "priority": number,
  "time1": number,
  "time2": number
}

export type WarehouseData = {
  id: number,
  name: string,
  type: number
}

type Color = {
  "name": "черный",
  "id": number
}

type Size = {
  "name": "",
  "origName": "0",
  "rank": number,
  "optionId": number,
  "returnCost": number,
  "stocks": Stock[],
  "time1": number,
  "time2": number,
  "wh": number,
  "sign": "dTOq9SFjhDaF557t36mBp/Jm8so=",
  "payload": "fxwyZa4OaAilmj4OZrpj6kf69mmrG7iVtIOs+EzJc65oNJJta8XJ2HdXknxgv64KRFM"
}

export type Product = {
  "id": number,
  "root": number,
  "kindId": number,
  "subjectId": number,
  "subjectParentId": number,
  "name": "Губки для мытья посуды черные набор губок для кухни",
  "brand": "Nytta",
  "brandId": number,
  "siteBrandId": number,
  "supplierId": number,
  "priceU": number,
  "salePriceU": number,
  "logisticsCost": number,
  "sale": number,
  "extended": {
    "basicSale": number,
    "basicPriceU": number,
    "clientSale": number,
    "clientPriceU": number
  },
  "saleConditions": number,
  "returnCost": number,
  "pics": number,
  "rating": number,
  "reviewRating": number,
  "feedbacks": number,
  "volume": number,
  "viewFlags": number,
  "colors": Color[],
  "promotions": number[],
  "sizes": Size[],
  "diffPrice": false,
  "time1": number,
  "time2": number,
  "wh": number
}

export type CardData = {
  "state": number,
  "params": {
    "version": number,
    "curr": "rub",
    "spp": number,
    "payloadVersion": number
  },
  "data": {
    "products": Product[]
  }
}