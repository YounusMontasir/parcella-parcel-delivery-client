# ParCella

## Project Overview
ParCella is a parcel delivery management website that facilitates seamless interaction between users, deliverymen, and administrators. It allows users to book parcels, track deliveries, and provide feedback while enabling deliverymen and admins to efficiently manage operations.

## Live Link
[ParCella](https://parcella-parcel-delivery.web.app/)

## Credentials

### Admin:
- **Email:** parceladmin@gmail.com
- **Password:** 123456

### Deliveryman:
- **Email:** deliveryman@gmail.com
- **Password:** 123456

### Features

#### User Features:
1. **Parcel Booking:** Users can book a parcel for delivery.
2. **Parcel List:** Users can view all their booked parcels.
3. **Profile Management:** Users can view and update their profiles.
4. **Review Deliverymen:** Users can provide reviews for deliverymen.
5. **Online Payments:** Users can pay for their parcels using cards via Stripe.

#### Deliveryman Features:
1. **Delivery List:** Deliverymen can view the list of parcels assigned to them by the admin.
2. **View Reviews:** Deliverymen can see reviews given by users for their delivered parcels.

#### Admin Features:
1. **User Management:** Admins can view all users and assign roles (make a user an admin or deliveryman).
2. **Parcel Management:** Admins can view all parcels and assign deliverymen to them.
3. **Deliveryman Management:** Admins can view all deliverymen.
4. **Booking Stats:** Admins can see parcel booking stats by date.
5. **Filter Delivery Status:** Admins can filter parcels based on delivery status.
6. **Search by Date Range:** Admins can search parcels by a requested delivery date range.

## Technologies Used
- **Frontend:** React, Tailwind CSS
- **Backend:** Express.js, MongoDB
- **Authentication:** Firebase
- **Payment Gateway:** Stripe
- **Image Upload:** ImageBB

### Dependencies

```json
"dependencies": {
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slot": "^1.1.1",
    "@radix-ui/react-tooltip": "^1.1.6",
    "@stripe/react-stripe-js": "^3.1.1",
    "@stripe/stripe-js": "^5.5.0",
    "@tanstack/react-query": "^5.64.1",
    "@types/mapbox-gl": "^3.4.1",
    "apexcharts": "^4.4.0",
    "axios": "^1.7.9",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "firebase": "^11.1.0",
    "leaflet": "^1.9.4",
    "localforage": "^1.10.0",
    "lottie-react": "^2.4.0",
    "lucide-react": "^0.471.1",
    "mapbox-gl": "^3.9.3",
    "match-sorter": "^8.0.0",
    "react": "^18.3.1",
    "react-apexcharts": "^1.7.0",
    "react-confetti": "^6.2.2",
    "react-countup": "^6.5.3",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "react-icons": "^5.4.0",
    "react-map-gl": "^7.1.8",
    "react-router-dom": "^7.1.1",
    "sort-by": "^1.2.0",
    "sweetalert2": "^11.15.10",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7"
  }
```

## Installation & Setup

Follow these steps to run the project locally:

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (if running locally)

### Step 1: Clone the Repository

```sh
git clone https://github.com/YounusMontasir/parcella-parcel-delivery-client.git
cd parcella-parcel-delivery-client
```

### Step 2: Install Dependencies

```sh
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```sh
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_SERVER_URL=your_backend_api_url
```

### Step 4: Run the Development Server

```sh
npm run dev

