import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product, index }) => {
  return (
    <div key={index} className='group relative'>
        <div className='w-full min-h-80 bg-gray-200 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
            <img
                src={`http://localhost:3000/api/images/${product.images[0]}`}
                alt={product.imageAlt}
                className='w-full h-full object-center object-cover lg:w-full lg:h-full'
            />
        </div>
        <div className='mt-4 flex justify-between'>
            <div>
                <h3 className='text-sm text-gray-700'>
                    <Link to={`/Product/${product._id}/${product.name}`}>
                        <span aria-hidden='true' className='absolute inset-0' />
                        {product.name}
                    </Link>
                </h3>
                <p className='mt-1 text-sm text-gray-500'>{product.color}</p>
            </div>
            <p className='text-sm font-medium text-gray-900'>{product.price}</p>
        </div>
    </div>
  )
}

export default Product;