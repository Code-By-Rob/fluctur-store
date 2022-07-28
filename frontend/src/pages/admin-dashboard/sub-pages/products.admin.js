import React, { useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'

import Tabs from '../../../components/navbar/tabs.component'
import Steps from '../../../components/navbar/steps.component'
import TextInput from '../../../components/forms/text-input.component'
import NumberInput from '../../../components/forms/number-input.component'
import WebsiteInput from '../../../components/forms/website-input.component'
import Textarea from '../../../components/forms/textarea.component'
import MultiPriceInput from '../../../components/forms/price-input.component'
import ImageUpload from '../../../components/forms/image-upload.component'
import Dropdown from '../../../components/forms/dropdown.component'
import Checkboxes from '../../../components/forms/checkboxes.component'
import SizingTable from '../../../components/forms/sizing-input.component'
import SwitchToggle from '../../../components/forms/switch.component'

import { useDispatch } from 'react-redux'
import { add } from '../../../redux/reducer'

import { gender, colours, categories, deliveryTime, season, fabric, fitting } from '../../../components/products/products.enum'

const tabs = [
    { name: 'Create', href: '#', current: true },
    { name: 'Read', href: '#', current: false },
    { name: 'Update', href: '#', current: false },
    { name: 'Delete', href: '#', current: false },
]

const steps = [
    { id: 'Step 1', name: 'Product Information', href: '#', status: 'current' },
    { id: 'Step 2', name: 'Product Preview', href: '#', status: 'upcoming' },
]

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProductsAdmin = () => {
    const [product, setProduct] = useState({});
    const [selectedColor, setSelectedColor] = useState(colours[0]);
    const [selectedSize, setSelectedSize] = useState();
    const [previewImages, setPreviewImages] = useState([]);

    const dispatch = useDispatch();

    const changeProduct = (event) => {
        const { name, value } = event.target;
        setProduct(prevValue => ({ ...prevValue, [name]: value }));
    }

    const [productInfo, setProductInfo] = useState(true);
    const [productPreview, setProductPreview] = useState(false);

    const nextStep = () => {
        console.log(product);
        steps[1].status = 'current';
        setProductInfo(false);
        setProductPreview(true);
        product.images.forEach(file => {
            const url = URL.createObjectURL(file);
            setPreviewImages(prevImages => [...prevImages, url]);
        });
    }

    const submitProduct = () => {
        console.log("Product", product);
        let data = new FormData();
        Object.entries(product).forEach(info => {
            data.append(info[0], JSON.stringify(info[1]));
            if (info[0] === 'images') {
                info[1].forEach(image => {
                    data.append(info[0], image);
                })
            }
        });
        fetch('http://localhost:3000/Admin/Product', {
            method: 'POST',
            body: data,
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.message === 'success') {
                setProductInfo(true);
                setProductPreview(false);
                setPreviewImages([]);
            } else {
                console.log(data);
            }
        })
    }
    
  return (
    <div className='mt-4'>
        <Tabs tabs={tabs} />
        <Steps steps={steps} />
        { productInfo && !productPreview ? 
        <section className='mt-10'>
            {/* Product Name Input */}
            <TextInput label={'Product Name'} name={'name'} id={'product-name'} placeholder={'Fancy Club Dress'} handleChange={changeProduct} />
            <WebsiteInput label={'Product Link'} name={'productLink'} id={'product-link'} placeholder={'www.example.com/'} handleChange={changeProduct} />
            <ImageUpload label={'Product Image'} name={'images'} handleChange={changeProduct} />
            {/* Product Description */}
            <Textarea label={'Product Description'} name={'productDescription'} handleChange={changeProduct} />
            {/* Sizing List */}
            <Checkboxes handleChange={changeProduct} name={'sizes'} />
            {/* Size Metrics Inputs */}
            <SizingTable name={'sizeReference'} productSizes={product.sizes} handleChange={changeProduct} />
            {/* Gender */}
            <Dropdown name={'gender'} list={gender} label={'Product Gender'} handleChange={changeProduct} />
            {/* Colour */}
            <Dropdown name={'colour'} list={colours} label={'Product Colour'} handleChange={changeProduct} />
            {/* Fitting Type */}
            <Dropdown name={'fitType'} list={fitting} label={'Product Fit Type'} handleChange={changeProduct} />
            {/* Available Quantity */}
            <NumberInput label={'Product Quantity'} name={'quantity'} id={'quantity'} placeholder={100} handleChange={changeProduct} />
            {/* Pricing */}
            <MultiPriceInput label={'Cost'} name={'cost'} id={'product-cost'} handleChange={changeProduct} />
            {/* Pricing */}
            <MultiPriceInput label={'Pricing'} name={'price'} id={'product-price'} handleChange={changeProduct} />
            {/* Delivery Time */}
            <Dropdown name={'deliveryTime'} list={deliveryTime} label={'Delivery Time'} handleChange={changeProduct} />
            {/* Category */}
            <Dropdown name={'category'} list={categories} label={'Product Category'} handleChange={changeProduct} />
            {/* Product Features */}
            <TextInput label={'Product Features'} name={'features'} id={'product-feature'} placeholder={'Anti-wrinkle'} handleChange={changeProduct} />
            {/* Product Model Number */}
            <TextInput label={'Product Model Number'} name={'modelNumber'} id={'product-model-number'} placeholder={'MDK1927c'} handleChange={changeProduct} />
            {/* Product Keywords */}
            <TextInput label={'Product Keywords'} name={'keywords'} id={'product-keywords'} placeholder={'Sexy, Club, Clean'} handleChange={changeProduct} />
            <Dropdown name={'season'} list={season} label={'Product Season'} handleChange={changeProduct} />
            <Dropdown name={'fabric'} list={fabric} label={'Product Fabric'} handleChange={changeProduct} />
            <Textarea label={'Product Washing Info'} name={'productWashing'} handleChange={changeProduct} />
            <div className='mt-4 flex justify-end'>
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={nextStep}
                >
                    Preview
                </button>
            </div>
        </section>
        :
        <section>
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                    <li>
                    <div className="flex items-center">
                        <a href={'#'} className="mr-2 text-sm font-medium text-gray-900">
                        {product.gender}
                        </a>
                        <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-4 h-5 text-gray-300"
                        >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                    </div>
                    </li>
                    <li>
                    <div className="flex items-center">
                        <a href={`/Clothing/${product.category}`} className="mr-2 text-sm font-medium text-gray-900">
                        {product.category}
                        </a>
                        <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-4 h-5 text-gray-300"
                        >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                    </div>
                    </li>
                    <li className="text-sm">
                    <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                        {product.name}
                    </a>
                    </li>
                </ol>
                </nav>

                {/* Image gallery */}
                <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                    <img
                    src={previewImages[0]}
                    className="w-full h-full object-center object-cover"
                    />
                </div>
                <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                    <img
                    src={previewImages[1]}
                    className="w-full h-full object-center object-cover"
                    />
                </div>
                <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                    <img
                    src={previewImages[2]}
                    className="w-full h-full object-center object-cover"
                    />
                </div>
                </div>

                {/* Product info */}
                <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:mt-0 lg:row-span-3">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl text-gray-900">£{product.price}</p>

                    {/* Reviews */}
                    <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                        <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                            key={rating}
                            className={classNames(
                                reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                            />
                        ))}
                        </div>
                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                        <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        {reviews.totalCount} reviews
                        </a>
                    </div>
                    </div>

                    <form className="mt-10">
                    {/* Colors */}
                    <div>
                        <h3 className="text-sm text-gray-900 font-medium">Color</h3>
                        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                        <div className="flex items-center space-x-3">
                            {colours.map((colour) => {
                            console.log()
                            if (product.colour === colour.name) {
                                return (
                                <RadioGroup.Option
                                key={colour.name}
                                value={colour}
                                className={({ active, checked }) =>
                                    classNames(
                                    colour.selectedClass,
                                    active && checked ? 'ring ring-offset-1' : '',
                                    !active && checked ? 'ring-2' : '',
                                    '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                    )
                                }
                                >
                                <RadioGroup.Label as="span" className="sr-only">
                                    {colour.name}
                                </RadioGroup.Label>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                    colour.class,
                                    'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                    )}
                                />
                                </RadioGroup.Option>
                                )
                            }
                            })}
                        </div>
                        </RadioGroup>
                    </div>

                    {/* Sizes */}
                    <div className="mt-10">
                        <div className="flex items-center justify-between">
                        <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Size guide
                        </a>
                        </div>

                        <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                            {product.sizes.map((size) => (
                            <RadioGroup.Option
                                key={size.id}
                                value={size}
                                disabled={!size.checked}
                                className={({ active }) =>
                                classNames(
                                    size.checked
                                    ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                    : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                )
                                }
                            >
                                {({ active, checked }) => (
                                <>
                                    <RadioGroup.Label as="span">{size.size}</RadioGroup.Label>
                                    {size.checked ? (
                                    <span
                                        className={classNames(
                                        active ? 'border' : 'border-2',
                                        checked ? 'border-indigo-500' : 'border-transparent',
                                        'absolute -inset-px rounded-md pointer-events-none'
                                        )}
                                        aria-hidden="true"
                                    />
                                    ) : (
                                    <span
                                        aria-hidden="true"
                                        className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                    >
                                        <svg
                                        className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        stroke="currentColor"
                                        >
                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                        </svg>
                                    </span>
                                    )}
                                </>
                                )}
                            </RadioGroup.Option>
                            ))}
                        </div>
                        </RadioGroup>
                    </div>

                    <button
                        onClick={(e) => {e.preventDefault(); dispatch(add({product}))}}
                        type="submit"
                        className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add to bag
                    </button>
                    </form>
                </div>

                <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    {/* Description and details */}
                    <div>
                    <h3 className="text-gray-500">Description</h3>

                    <div className="space-y-6">
                        <p className="text-base text-gray-900">{product.productDescription}</p>
                    </div>
                    </div>

                    <div className='mt-4'>
                    <h5 className="text-gray-500">Fit Type</h5>

                    <div className="space-y-6">
                        <p className="text-base text-gray-900">{product.fitType}</p>
                    </div>
                    </div>

                    <div className='mt-4'>
                    <h5 className="text-gray-500">Features</h5>

                    <div className="space-y-6">
                        <p className="text-base text-gray-900">{product.features}</p>
                    </div>
                    </div>

                    <div className='mt-4'>
                    <h5 className="text-gray-500">Fabric</h5>

                    <div className="space-y-6">
                        <p className="text-base text-gray-900">{product.fabric}</p>
                    </div>
                    </div>

                    <div className='mt-4'>
                    <h5 className="text-gray-500">Season</h5>

                    <div className="space-y-6">
                        <p className="text-base text-gray-900">{product.season}</p>
                    </div>
                    </div>

                    <div className='mt-4'>
                    <h5 className="text-gray-500">Keywords</h5>

                    <div className="space-y-6">
                        <p className="text-base text-gray-900">{product.keywords}</p>
                    </div>
                    </div>

                    <div className='mt-4'>
                    <h5 className="text-gray-500">Product Washing</h5>

                    <div className="space-y-6">
                        <p className="text-base text-gray-900">{product.productWashing}</p>
                    </div>
                    </div>

                    {/* <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                    <div className="mt-4">
                        <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                        {product.highlights.map((highlight) => (
                            <li key={highlight} className="text-gray-400">
                            <span className="text-gray-600">{highlight}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    </div> */}

                    {/* <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">Details</h2>

                    <div className="mt-4 space-y-6">
                        <p className="text-sm text-gray-600">{product.details}</p>
                    </div>
                    </div> */}
                    </div>
                </div>
            </div>
            <div className='mt-4 flex justify-end'>
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={submitProduct}
                >
                    Submit
                </button>
            </div>
        </section>
    }
    </div>
  )
}

export default ProductsAdmin