import React, { useState, useEffect } from 'react'
import Product from './product/product.component';

// const products = [
//     { id: 1, name: 'Basic Bag', description: 'Stylish Basic Bag', price: '24.99', imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-07-product-02.jpg', imageAlt: '#', href: '#', color: 'grey' },
//     { id: 2, name: 'Basic T-Shirt', description: 'A very basic t-shirt', price: '11.99', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg', imageAlt: 'A beautiful black basic t-shirt', href: '#', color: 'black' },
// ];

// retrieve the products from the database.

const Products = ({ numberOfColumns, products }) => {

  return (
    <section className={`max-w-7xl mx-auto mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-${numberOfColumns} px-4 xl:gap-x-8 sm:px-8 lg:px-6`}>
        {
            products.map((product, i) => {
                return <Product product={product} index={i} />
            })
        }
    </section>
  )
}

export default Products;