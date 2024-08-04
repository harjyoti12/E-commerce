
import React, { createContext, useState, useEffect, useCallback } from "react";
import { commerce } from "../Api/Commerce";
import PropTypes from "prop-types";
import { debounce } from "../utils/Debounce";
import { app } from "../Api/FireBase";
import { signOut,getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategorySlug, setSubcategorySlug] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleItems, setVisibleItems] = useState(8);
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(false);

  const fetchProducts = useCallback(async (categorySlug) => {
    setIsLoading(true);
    try {
      const response = await commerce.products.list({
        limit: 250,
        category_slug: categorySlug || undefined,
      });
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setIsLoading(false);
  }, []);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await commerce.categories.list({ limit: 50 });
      setCategories(["All", ...response.data.map((category) => category.name)]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setIsLoading(false);
  }, []);


  const fetchProductById = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const response = await commerce.products.retrieve(id);
      setIsLoading(false);
      return response;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    setIsLoading(false);
  }, []);

  const fetchCart = async () => {
    try {
      const item = await commerce.cart.retrieve();
      setCart(item);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Debounced functions with 2-second delay
  const addToCart = debounce(async (productId, quantity) => {
    try {
      const item = await commerce.cart.add(productId, quantity);
      setCart(item);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }, 2000);

  const increaseQuantity = debounce(async (lineItemId, quantity) => {
    try {
      const response = await commerce.cart.update(lineItemId, {
        quantity: quantity + 1,
      });
      setCart(response);
    } catch (error) {
      console.error("Error increasing cart quantity:", error);
    }
  }, 2000);

  const decreaseQuantity = debounce(async (lineItemId, quantity) => {
    if (quantity === 1) {
      removeFromCart(lineItemId);
      return;
    }
    try {
      const response = await commerce.cart.update(lineItemId, {
        quantity: quantity - 1,
      });
      setCart(response);
    } catch (error) {
      console.error("Error decreasing cart quantity:", error);
    }
  }, 2000);

  const removeFromCart = debounce(async (lineItemId) => {
    try {
      const response = await commerce.cart.remove(lineItemId);
      setCart(response);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }, 2000);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 8);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleItems(8);
  };

  const handleEmptyCart = useCallback(async () => {
    try {
      const { cart } = await commerce.cart.empty();
      setCart(cart);
    } catch (error) {
      console.error("Error emptying cart:", error);
    }
  }, []);

  const refreshCart = useCallback(async () => {
    try {
      const newCart = await commerce.cart.refresh();
      setCart(newCart);
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory !== "All" ? selectedCategory : undefined);
    fetchCategories(categoryId, subcategorySlug);
  }, [fetchProducts, fetchCategories, selectedCategory]);



  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" ||
      product.categories.some(({ name }) => name === selectedCategory)
  );

  const filteredBestProducts = products.filter((product) =>
    product.categories.some(({ name }) => name === "women" || name === "tops")
  );


  const auth = getAuth(app);
  

  const signup = async (name, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setUser(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(true);
    } catch (error) {
      console.log(error.message, error);
    }
  };
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };
  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts.slice(0, visibleItems),
        Bestproducts: filteredBestProducts.slice(0, visibleItems),
        categories,
        selectedCategory,
        setSelectedCategory,
        handleLoadMore,
        handleCategoryChange,
        addToCart,
        removeFromCart,
        cart,
        fetchProductById,
        isLoading,
        decreaseQuantity,
        increaseQuantity,
        handleEmptyCart,
        refreshCart,
        signup,
        login,
        logout,
        user
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
