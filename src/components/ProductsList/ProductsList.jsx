import { useState, useCallback } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductsList.css";

const products = [
  {
    id: "1",
    title: "Джинсы 1 ",
    price: 5000,
    description: "Cинего цвета, прямые",
  },
  {
    id: "2",
    title: "Джинсы 2",
    price: 12000,
    description: "Cинего цвета, прямые",
  },
  {
    id: "3",
    title: "Джинсы 3",
    price: 8000,
    description: "Cинего цвета, прямые",
  },
  {
    id: "4",
    title: "Джинсы 4",
    price: 5000,
    description: "Cинего цвета, прямые",
  },
  {
    id: "5",
    title: "Куртка 1",
    price: 6000,
    description: "Cинего цвета, прямые",
  },
  {
    id: "6",
    title: "Куртка 2",
    price: 10000,
    description: "Cинего цвета, прямые",
  },
  {
    id: "7",
    title: "Куртка 3",
    price: 9000,
    description: "Cинего цвета, прямые",
  },
];

const getTotalPrice = (items) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductsList = () => {
  const [basket, setBasket] = useState([]);
  const { tg, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: basket,
      totalPrice: getTotalPrice(basket),
      queryId,
    };
    fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, []);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  const onAdd = (product) => {
    const alreadyAdded = basket.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = basket.filter((item) => item.id !== product.id);
    } else {
      newItems = [...basket, product];
    }

    setBasket(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <div className={"list"}>
      {products.map((item) => (
        <ProductItem product={item} onAdd={onAdd} className={"item"} />
      ))}
    </div>
  );
};

export default ProductsList;
