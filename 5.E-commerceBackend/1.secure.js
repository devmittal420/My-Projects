const express = require("express");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Secret Key for JWT
const SECRET_KEY = "_345ERT$%^&*VBHGMJ%^&*(NBVCF"; // Store in env variables for production
const TOKEN_EXPIRATION_TIME = "60m"; // Token expires in 2 minutes

// In-memory product data
let products = [
    { id: 1, name: "Apple MacBook Pro 13-inch", price: 1299 },
    { id: 2, name: "Samsung Galaxy S23 Ultra", price: 1199 },
    { id: 3, name: "Apple iPad Air 5th Gen", price: 599 },
    { id: 4, name: "Apple Watch Series 8", price: 399 },
    { id: 5, name: "Sony WH-1000XM5 Wireless Headphones", price: 349 },
    { id: 6, name: "Logitech MX Keys Wireless Keyboard", price: 99 },
    { id: 7, name: "Razer DeathAdder V2 Gaming Mouse", price: 69 },
    { id: 8, name: "LG UltraGear 27-inch Gaming Monitor", price: 329 },
    { id: 9, name: "Seagate 1TB Portable External Hard Drive", price: 54 },
    { id: 10, name: "Amazon Echo Dot (5th Gen)", price: 49 },
    { id: 11, name: "Anker Wireless Charger (10W)", price: 25 },
    { id: 12, name: "Anker PowerCore 10000mAh Power Bank", price: 35 },
    { id: 13, name: "JBL Tune 125TWS Bluetooth Earbuds", price: 79 },
    { id: 14, name: "GoPro HERO11 Black Action Camera", price: 399 },
    { id: 15, name: "SteelSeries Rival 600 Gaming Mouse", price: 79 },
    {
        id: 16,
        name: "Bose SoundLink Micro Portable Bluetooth Speaker",
        price: 99,
    },
    { id: 17, name: "Oculus Quest 2 VR Headset", price: 299 },
    { id: 18, name: "Spigen Tough Armor Case for iPhone 14", price: 24 },
    { id: 19, name: "MOFT Laptop Stand for MacBook", price: 39 },
    { id: 20, name: "HyperDrive USB-C Hub for MacBook Pro", price: 79 },
];

// In-memory user data
let usersDb = [];
let carts = {}; // Cart is now stored by userID

// Middleware for authenticating JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];

    console.log("@Token: ", token, req.headers["authorization"]);

    if (!token) {
        return res.status(401).json({ message: "Authorization token is required" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        console.log("@err: ", err, user);
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        req.user = user; // Set user data from token in the request
        next();
    });
};

// Helper function for validating email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Helper function for validating password strength
const isValidPassword = (password) => {
    return password.length >= 6; // At least 6 characters for password
};

// User signup
const signup = async (email, password) => {
    if (!isValidEmail(email)) {
        throw { statusCode: 400, message: "Invalid email format" };
    }

    if (!isValidPassword(password)) {
        throw {
            statusCode: 400,
            message: "Password must be at least 6 characters long",
        };
    }

    if (usersDb.find((user) => user.email === email)) {
        throw { statusCode: 409, message: "Email already registered" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword };

    usersDb.push(newUser);

    return { message: "User registered successfully", email: newUser.email };
};

// User signin
const signin = async (email, password) => {
    if (!isValidEmail(email)) {
        throw { statusCode: 400, message: "Invalid email format" };
    }

    if (!password) {
        throw { statusCode: 400, message: "Password is required" };
    }

    const user = usersDb.find((user) => user.email === email);

    if (!user) {
        throw { statusCode: 404, message: "User not found" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw { statusCode: 400, message: "Invalid password" };
    }

    const token = jwt.sign(
        { email: user.email, userId: user.email },
        SECRET_KEY,
        {
            expiresIn: TOKEN_EXPIRATION_TIME,
        }
    );
    return { message: "Signin successful", token };
};

// Get user profile
const getProfile = (email) => {
    const user = usersDb.find((user) => user.email === email);
    if (!user) {
        throw { statusCode: 404, message: "User not found" };
    }
    return { email: user.email };
};

// Product Routes
app.get("/", (req, res) => {
    res.send({ message: "Welcome to Our E-commerce Server" });
});

// Get all products
app.get("/products", (req, res) => {
    try {
        if (products.length === 0) {
            return res.status(204).json({ message: "No products available" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

// Get product by id
app.get("/products/:id", (req, res) => {
    try {
        const { id } = req.params;
        const product = products.find((p) => p.id === parseInt(id));

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
});

// Cart Routes (Protected)

// 2.0. Get cart list
app.get("/cart", authenticateToken, (req, res) => {
    const userId = req.user.email;
    res.json(carts[userId] || {});
});

// Add product to cart
app.post("/cart", authenticateToken, (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.user.email;

        if (!productId || isNaN(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = products.find((p) => p.id === productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (quantity <= 0 || isNaN(quantity)) {
            return res
                .status(400)
                .json({ message: "Quantity must be a positive number" });
        }

        if (!carts[userId]) {
            carts[userId] = {}; // Initialize cart if not yet created
        }

        if (carts[userId][productId]) {
            carts[userId][productId].quantity += quantity;
        } else {
            carts[userId][productId] = { ...product, quantity };
        }

        res
            .status(201)
            .json({ message: "Product added to cart", cart: carts[userId] });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart" });
    }
});

// Update cart quantity
app.put("/cart/:productId", authenticateToken, (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const userId = req.user.email;

        if (!quantity || isNaN(quantity) || quantity <= 0) {
            return res
                .status(400)
                .json({ message: "Quantity must be a positive number" });
        }

        if (!carts[userId] || !carts[userId][productId]) {
            return res.status(404).json({ message: "Product not in cart" });
        }

        carts[userId][productId].quantity = quantity;
        res.status(200).json({ message: "Cart updated", cart: carts[userId] });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart" });
    }
});

// Remove product from cart
app.delete("/cart/:productId", authenticateToken, (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.email;

        if (!carts[userId] || !carts[userId][productId]) {
            return res.status(404).json({ message: "Product not in cart" });
        }

        delete carts[userId][productId];
        res
            .status(200)
            .json({ message: "Product removed from cart", cart: carts[userId] });
    } catch (error) {
        res.status(500).json({ message: "Error removing product from cart" });
    }
});

// Clear cart
app.delete("/cart", authenticateToken, (req, res) => {
    try {
        const userId = req.user.email;
        carts[userId] = {}; // Clear the user's cart
        res.status(200).json({ message: "Cart cleared", cart: carts[userId] });
    } catch (error) {
        res.status(500).json({ message: "Error clearing cart" });
    }
});

// Signup
app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await signup(email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 400).json({ message: error.message });
    }
});

// Signin (Login)
app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await signin(email, password);
        res.json(result);
    } catch (error) {
        res.status(error.statusCode || 400).json({ message: error.message });
    }
});

// Get Profile (Protected)
app.get("/profile", authenticateToken, (req, res) => {
    try {
        const user = getProfile(req.user.email);
        res.json(user);
    } catch (error) {
        res.status(error.statusCode || 400).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
