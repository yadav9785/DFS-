<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# DFS Fault Tolerance Simulator

A premium, interactive web application that simulates the core mechanics of a Distributed File System (DFS) like Hadoop HDFS. It visualizes how data is chunked, replicated, and maintained across a cluster of DataNodes, demonstrating fault tolerance and auto-recovery in real-time.

## Features

- **Data Upload Simulation**: Upload files and watch them get chunked into blocks and distributed across the cluster.
- **Data Replication**: Maintains a default replication factor of 3X redundancy for high availability and fault tolerance.
- **Node Failure Simulation**: Toggle individual DataNodes on and off to simulate unexpected hardware failures or network partitions.
- **Auto-Healing Mechanics**: A background monitor constantly checks heartbeats and initiates batch recovery if block replicas fall below the required threshold.
- **Interactive UI**: Stunning, responsive dashboard built with React and Tailwind CSS, featuring 3D parallax effects and futuristic aesthetics.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Fonts**: Inter, Exo 2 (Google Fonts)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yadav9785/DFS-.git
   cd DFS-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

## Access Portal

To access the master node dashboard, use the default credentials provided on the login screen:
- **Operator ID**: `admin`
- **Security Key**: `password`
