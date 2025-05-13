# 🛍️ E-Commerce App — React Native Assignment

This is a simple E-Commerce mobile application built with **React Native CLI** for an interview assignment. It demonstrates core React Native concepts such as state management, modular UI components, API integration (mocked with `json-server`), and clean code structuring.

---

## 📱 Features

- **Home Screen**: Displays banners and product carousels with tags (Free Delivery, Selling Fast).
- **Search Screen**: Allows users to search products with live filter functionality.
- **Product Details Screen**: Shows product details with image slider, quantity selector, and "Add to Cart" option.
- **Cart Screen**: View cart items, adjust quantity, remove items, and see order summary, consist of **Cart Review Screen**: Shows payment method, itemized summary, and place order button.
- **Confirmation Screen**: Displays success message and checkmark after placing order.

---

## 🛠️ Tech Stack

- **React Native CLI**
- **TypeScript**
- **Redux Toolkit** for state management
- **React Navigation** for screen transitions
- **json-server** to simulate a mock API

---

## 📁 Folder Structure

```bash
├── android/                 # Android native project
├── ios/                     # iOS native project
├── mock/                    # Mock data folder
│   └── db.json              # JSON for banners and products
├── src/                     # Source code
│   ├── components/          # Reusable UI components
│   ├── redux/               # Redux store & slices
│   ├── screens/             # All app screens
│   ├── services/            # API and Axios setup
│   ├── navigation/          # Stack and Tab navigators
│   └── utils/               # Constants, helpers, and dummy data
├── App.tsx                  # App entry point
├── package.json             # Project metadata
└── README.md
```

## 🚀 Getting Started

### 1. 📦 Install Dependencies

```bash
yarn install
```

### 2. 🍎: Install iOS Pods (for Mac/iOS users only)

```bash
cd ios && pod install && cd ..
```

### 3. 🔌 Start the Mock API Server

```bash
npx json-server mockData/db.json
```

### 4. 📱Run the App

For ios:

```bash
yarn ios
```

For android:

```bash
yarn android
```

## 🧪 Additional Notes

- All data (banners, products, etc.) is mock data served via `json-server`.
- Modular and reusable component architecture for scalability.
- Redux state management ensures clean flow of cart and product data.
- Can be extended with caching, animation, and unit testing.

## 📬 Contact

If you face any issues while running the app or have questions regarding the implementation, feel free to reach out.
