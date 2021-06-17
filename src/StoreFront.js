import React, { useState, useEffect } from "react";
import ProductsList from "./ProductsList.js";
import AddProductForm from "./AddProductForm.js";

export default function StoreFront() {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            return JSON.parse(savedProducts);
        } else {
            return [];
        }
    });
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [validation, setValidation] = useState("");

    useEffect(() => {
        if (products.length === 0) {
            document.title = 'No Products';
        } else if (products.length === 1) {
            document.title = '1 Product';
        } else {
            document.title = `${products.length} products`
        }
    }, [products]);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    function handleFormSubmit(event) {
        event.preventDefault();

        if (!name) {
            setValidation("Please enter a name");
            return;
        }
        if (!description) {
            setValidation("Please enter a description");
            return;
        }
        setProducts([...products, {
            id: products.length + 1,
            name: name,
            description: description
        }]);
        setName("");
        setDescription("");
        setValidation("");
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleDeleteClick(id) {
        setProducts(products.filter(product => product.id !== id));
    }

    return <>
        <AddProductForm name={name} description={description} validation={validation} onNameChange={handleNameChange} onDescriptionChange={handleDescriptionChange} onFormSubmit={handleFormSubmit} />
        <div>{products.length === 0 && <p>Add your first product</p>}</div>
        <ProductsList products={products} onDeleteClick={handleDeleteClick} />
    </>;
}
