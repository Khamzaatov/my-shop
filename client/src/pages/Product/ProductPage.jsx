import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductPage = () => {
    const { id } = useParams()

    const products = useSelector(state => state.product.products)

    return (
        <div>
            
        </div>
    );
};

export default ProductPage;