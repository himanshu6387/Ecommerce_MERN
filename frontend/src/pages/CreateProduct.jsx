import React, { useState } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';

const CreateProduct = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    category: '', // ✅ added category
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.price || !form.stock || !form.category) {
    toast.error('Name, Price, Stock, and Category are required.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', Number(form.price));
    formData.append('description', form.description);
    formData.append('stock', Number(form.stock));
    formData.append('category', form.category);
    if (form.image) formData.append('image', form.image);

    await API.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${adminToken}`, // <-- add your admin token here
      },
    });

    toast.success('Product created successfully!');
    setForm({
      name: '',
      price: '',
      description: '',
      stock: '',
      category: '',
      image: null,
    });
  } catch (err) {
    toast.error('Something went wrong while adding the product.');
    console.error('Frontend submit error:', err.response?.data || err);
  }
};


  return (
    <section className="min-h-screen flex items-stretch text-white">
      {/* Image Side */}
      <div
        className="lg:flex w-1/2 hidden bg-cover bg-center relative items-center"
        style={{
          backgroundImage:
            'url(https://img.freepik.com/free-vector/shopping-with-technological-devices_23-2147654122.jpg?t=st=1753800132~exp=1753803732~hmac=2e823def18bea48e56b80e6728b431f1e8b20785e689f5785a1b90917676c918&w=1380)',
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0" />
        <div className="w-full px-10 z-10">
          <h1 className="text-5xl font-bold leading-tight">Create Great Products</h1>
          <p className="text-2xl mt-4">Manage your inventory with ease and elegance.</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-4 bg-gray-900 z-0">
        <div className="w-full py-6 z-20">
          <h2 className="text-3xl font-bold mb-6 text-white">Add New Product</h2>

          <form
            onSubmit={handleSubmit}
            className="sm:w-2/3 w-full mx-auto text-left space-y-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="w-full p-3 rounded bg-black text-white"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              className="w-full p-3 rounded bg-black text-white"
              value={form.price}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              className="w-full p-3 rounded bg-black text-white"
              rows="3"
              value={form.description}
              onChange={handleChange}
            ></textarea>

            <select
              name="stock"
              className="w-full p-3 rounded bg-black text-white"
              value={form.stock}
              onChange={handleChange}
            >
              <option value="">Select Stock Status</option>
              <option value="10">Available</option>
              <option value="0">Not Available</option>
            </select>

            {/* ✅ Category Input */}
            {/* ✅ Category Select */}
            <select
              name="category"
              className="w-full p-3 rounded bg-black text-white"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Bags">Bags</option>
              <option value="Bottle">Bottle</option>
              <option value="Calendars">Calendars</option>
              <option value="Combo">Combo</option>
              <option value="Flowers">Flowers</option>
              <option value="Keychain">Keychain</option>
              <option value="Lamp">Lamp</option>
              <option value="Mugs">Mugs</option>
              <option value="Name Plates">Name Plates</option>
              <option value="Photo Frames">Photo Frames</option>
              <option value="Printed Cushion">Printed Cushion</option>
            </select>


            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full p-3 rounded bg-black text-white"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full p-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold uppercase"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;
