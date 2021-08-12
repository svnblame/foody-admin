import React, { useState, useEffect } from "react";
import useFetch from "./useFetch";
import Product from "./Product";
import Loader from "./Loader";

export default function StoreFront() {
    const [products, setProducts] = useState([]);
    const { get, loading } = useFetch("https://react-tutorial-demo.firebaseio.com/");

    useEffect(() => {
        get("products.json")
        .then(data => {
            setProducts(data);
        })
        .catch(error => console.error(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className="store-front">
        {loading && <Loader />}
        {products.map(product => <Product key={product.id} details={product} />)}
    </div>;
}
