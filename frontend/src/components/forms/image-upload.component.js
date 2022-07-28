import React, { useState, useEffect } from 'react'

const ImageUpload = ({ label, name, handleChange }) => {

    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [count, setCount] = useState(0);

    function selectFile(e) {
        const previewsData = {
            id: count, previewImage: URL.createObjectURL(e.target.files[0])
        }
        const fileData = e.target.files[0];
        setCount(count + 1);
        setImages(prevImages => ([ ...prevImages, previewsData ]));
        setFiles(prevFiles => ([...prevFiles, fileData]))
    }

    useEffect(() => {
        handleChange({target: {name, value: files}});
    }, [files]);

  return (
    <div className="sm:col-span-6">
        <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
        {label}
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
                >
                <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                </svg>
                <div className="flex text-sm text-gray-600">
                <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                    <span>Upload a file</span>
                    <input onChange={ e => selectFile(e) } id="file-upload" name={name} type="file" accept='image/png, image/gif, image/jpeg, image/jpg' className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
        </div>
        <div className='max-w-7xl mx-auto mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 px-4 xl:gap-x-8 sm:px-8 lg:px-6'>
            {images.map(img => (
                <div key={img.id} className='w-full min-h-50 bg-gray-200 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-50 lg:aspect-none'>
                    <img
                        src={img.previewImage}
                        className='w-full h-full object-center object-cover lg:w-full lg:h-full'
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default ImageUpload