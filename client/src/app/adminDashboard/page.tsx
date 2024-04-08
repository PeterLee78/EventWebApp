"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import AdminNavbar from "../../components/navbarAdmin";
import axios from "axios";
import { useSelector } from "react-redux";

interface Product {
  id: number;
  image: string;
  description: string;
  price: number | null;
  stock: number | null;
}

const initialProducts: Product[] = [
  {
    id: 1,
    image: "/images/ts.jpg",
    description:
      "Tailor Swift\nComing soon 19 May 2024\nConcert in Jakarta - Indonesia",
    price: 900000,
    stock: 100,
  },
  {
    id: 2,
    image: "/images/ys.jpeg",
    description:
      "Yoasobi\nComing soon 08 July 2024\nConcert in Yokohama - Japan",
    price: 1100000,
    stock: 100,
  },
  {
    id: 3,
    image: "/images/kk.jpg",
    description:
      "Joji\nComing soon 20 September 2024\nConcert in Sydney - Australia",
    price: 750000,
    stock: 100,
  },
  {
    id: 4,
    image: "/images/st.jpg",
    description:
      "The Weekend\nComing soon 15 December 2024\nConcert in LA - America",
    price: 550000,
    stock: 100,
  },
];

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: "",
    description: "",
    stock: 0,
    price: 0,
  });
  const [events, setEvents] = useState([]);

  const user = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/events/adminEvent", {
        data: {
          id: user.userId,
        },
      })
      .then(function (response) {
        console.log(response.data);
        console.log(user.userId);
      })
      .catch(function (error) {
        console.log(false);
      });
  }, []);

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const addNewProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      newProduct.image &&
      newProduct.description &&
      newProduct.stock &&
      newProduct.price
    ) {
      setProducts([
        ...products,
        { ...newProduct, id: Math.max(...products.map((p) => p.id)) + 1 },
      ]);
      setIsCreateModalOpen(false);
      setNewProduct({
        image: "",
        description: "",
        stock: 0,
        price: 0,
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();

      fileReader.onload = (loadEvent) => {
        const result = loadEvent.target?.result;
        if (typeof result === "string") {
          setProductToEdit((prev) => {
            return prev ? { ...prev, image: result } : null;
          });
        }
      };

      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductToEdit((prev) => {
      if (prev === null) return null;

      let newValue: string | number | null = value;
      if (name === "price" || name === "stock") {
        newValue = value === "" ? null : Number(value);
      }

      const updatedProduct = {
        ...prev,
        [name]: newValue,
      } as Product;

      return updatedProduct;
    });
  };

  const submitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (productToEdit) {
      setProducts((prevProducts) => {
        return prevProducts.map((p) => {
          if (p.id === productToEdit.id) {
            return { ...p, ...productToEdit };
          }
          return p;
        });
      });

      setIsEditModalOpen(false);
    }
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productToDelete.id)
      );
      setIsModalOpen(false);
      setProductToDelete(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <AdminNavbar />
      <div className="pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-2xl sm:text-3xl font-semibold text-gray-700 underline">
            Hello Admin
          </div>
          <div className="mb-8 flex items-center">
            <div className="flex-grow">
              <input
                type="text"
                className="w-96 p-2 border rounded-md hover:border-cyan-500 hover:drop-shadow-lg"
                placeholder="Type any products here"
                // onChange={}
              />
            </div>
            <button
              type="button"
              className="ml-4 p-2 text-xl font-semibold rounded-md bg-gray-300 hover:bg-gray-500 text-black hover:ring-2 hover:ring-blue-500 hover:drop-shadow-lg"
              onClick={handleCreateClick}
            >
              Create
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left bg-gray-300">
                  <th className="p-3">IMAGE</th>
                  <th className="p-3">DESCRIPTION</th>
                  <th className="p-3 hidden sm:table-cell">STOCK</th>
                  <th className="p-3 hidden sm:table-cell">PRICE</th>
                  <th className="p-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: Product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-3">
                      <div className="h-16 w-16 sm:h-24 sm:w-24 relative">
                        <Image
                          src={product.image}
                          alt="Product"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </td>
                    <td className="p-3 whitespace-pre-line">
                      {product.description}
                    </td>
                    <td className="p-3 text-xl hidden sm:table-cell">
                      {product.stock}
                    </td>
                    <td className="p-3 text-xl font-semibold hidden sm:table-cell">
                      IDR {product.price ? product.price.toLocaleString() : "0"}
                    </td>
                    <td className="p-3 flex flex-col items-center justify-center space-y-2 sm:items-start mt-4">
                      <button
                        className="flex items-center font-semibold text-black hover:text-[#00B4DB]"
                        onClick={() => handleEditClick(product)}
                      >
                        <AiFillEdit className="mr-1" />
                        <span>Edit</span>
                      </button>
                      <button
                        className="flex items-center font-semibold text-black hover:text-[#e52d27]"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <AiFillDelete className="mr-1" />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal Create */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white p-5 rounded-lg shadow-lg w-full max-w-2xl mx-4 my-8 overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            <h3 className="text-lg leading-6 font-medium underline text-gray-900 mb-4">
              Create Product
            </h3>
            <form onSubmit={addNewProduct}>
              {/* Input for Product Image */}
              <div className="mb-4">
                <label htmlFor="new-image" className="block mb-2">
                  Product Image:
                </label>
                <input
                  type="file"
                  id="new-image"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (loadEvent) => {
                        setNewProduct((prev) => ({
                          ...prev,
                          image: loadEvent.target?.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  required
                />
              </div>

              {/* Input for Product Description */}
              <div className="mb-4">
                <label htmlFor="new-description" className="block mb-2">
                  Description:
                </label>
                <textarea
                  id="new-description"
                  name="description"
                  className="w-full p-2 border rounded-md"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Input for Product Stock */}
              <div className="mb-4">
                <label htmlFor="new-stock" className="block mb-2">
                  Stock:
                </label>
                <input
                  type="number"
                  id="new-stock"
                  name="stock"
                  className="w-full p-2 border rounded-md"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      stock: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              {/* Input for Product Price */}
              <div className="mb-4">
                <label htmlFor="new-price" className="block mb-2">
                  Price:
                </label>
                <input
                  type="number"
                  id="new-price"
                  name="price"
                  className="w-full p-2 border rounded-md"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-gray-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={() => console.log(newProduct)}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal delete */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm mx-auto">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <AiFillDelete className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Delete Product
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this product?
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="delete-button"
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-24 mr-2 hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  id="cancel-button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md w-24 hover:bg-gray-400"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal for editing a product */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white p-5 rounded-lg shadow-lg w-full max-w-2xl mx-4 my-8 overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            <h3 className="text-lg leading-6 font-medium underline text-gray-900 mb-4">
              Edit Product
            </h3>
            <form onSubmit={submitEdit}>
              <label htmlFor="image-upload" className="block mb-2">
                Product Image:
              </label>
              <input
                type="file"
                id="image-upload"
                onChange={handleImageChange}
              />
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full p-2 border rounded-md"
                  value={productToEdit?.description}
                  onChange={handleEditChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="stock" className="block mb-2">
                    Stock:
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    className="w-full p-2 border rounded-md"
                    value={productToEdit?.stock ?? ""}
                    onChange={handleEditChange}
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block mb-2">
                    Price:
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="w-full p-2 border rounded-md"
                    value={productToEdit?.price ?? ""}
                    onChange={handleEditChange}
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <span className="flex w-full rounded-md shadow-sm">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-gray-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Save Changes
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
