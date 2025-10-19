# SafeDrive AI: Real-Time Driver Wellness Monitoring System 🚦

SafeDrive AI is a comprehensive, real-time system designed to monitor a vehicle operator's wellness and detect signs of fatigue, drowsiness, and distraction using a combination of computer vision and biometric indicators.

## 🌟 Features

The system is built on a multi-sensor fusion approach, integrating data from computer vision models and simulated vehicle/biometric sensors to determine the driver's current state: **ALERT**, **DROWSY**, or **DANGER**.

* **Eye Tracking (PERCLOS/EAR):** Measures the **P**ercentage of **E**ye **C**losure (**PERCLOS**) and **E**ye **A**spect **R**atio (**EAR**) using MediaPipe Face Mesh to detect microsleeps and sustained drowsiness.
* **Mouth Aspect Ratio (MAR):** Calculates MAR to detect yawning, a key sign of fatigue.
* **Steering Analysis:** Detects erratic driving patterns and lane deviation by monitoring steering variance.
* **HRV Monitoring:** Tracks Heart Rate Variability (HRV) to track stress and fatigue levels (simulated/planned sensor integration).
* **Smart Alerts:** An `AlertService` manages progressive warnings based on configurable thresholds and a cooldown period to prevent alert spamming.
* **Real-Time Dashboard:** A responsive web application built with React, providing a live video feed, status overlays, metrics, and a steering stability chart.

***

## 💻 Technology Stack

This project is divided into two main components: a Python FastAPI backend for data processing and a React frontend for visualization.

### Backend (`safedrive-backend/`)

| Category | Technology | Key Components |
| :--- | :--- | :--- |
| **Framework** | **FastAPI** | Provides REST API routes and a WebSocket server for real-time data streaming. |
| **Computer Vision** | **OpenCV, MediaPipe (Face Mesh), dlib** | Services for capturing camera frames and calculating drowsiness metrics (EAR, MAR, PERCLOS). |
| **Real-Time** | **WebSockets** | Used for streaming driver state and metric updates to all connected frontend clients. |
| **Authentication** | **`passlib[bcrypt]`, `python-jose`** | Services for password hashing and JWT token creation/verification. |

### Frontend (`safedrive-frontend/`)

| Technology | Purpose |
| :--- | :--- |
| **React (v19)**, **Vite** | Frontend library and fast development build tool. |
| **React Router v7** | Handles client-side routing, including a `ProtectedRoute` for the dashboard. |
| **Tailwind CSS** | Utility-first CSS framework for a responsive and modern UI. |
| **Chart.js** (`react-chartjs-2`) | Used for visualizing time-series data like Steering Stability on the dashboard. |

***