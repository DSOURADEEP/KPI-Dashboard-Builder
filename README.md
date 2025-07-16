📊 KPI Dashboard Builder
A visual, SQL-powered dashboard builder that enables users to create, manage, and visualize business KPIs through interactive and customizable charts — all powered by real-time database queries.

🚀 Features
🔐 User Management: Create users with roles like Manager, Sales Manager, etc.

🧩 Dashboard Creation: Easily create dashboards assigned to specific users.

📦 Widget System: Add chart widgets using SQL queries (Bar, Line, Pie, Doughnut).

📈 Live Chart Rendering: Charts are powered by live MySQL queries with real data.

🎨 Theme Toggle: Switch between Light and Dark themes.

📁 Data-driven Design: Each chart is dynamically rendered from your database using SQL.

🧹 Dashboard Deletion: Easily delete dashboards you no longer need.

📊 Real-Time Charts: See up-to-date visuals as data changes in your DB.

⚙️ Chart.js Integration: Beautiful and responsive charts with dynamic styles.

💡 Fully Extensible: Add more chart types, roles, permissions, and data sources.

🛠️ Tech Stack
Frontend	Backend	Database
React + TypeScript	NestJS (GraphQL)	MySQL
Apollo Client	TypeORM	
Chart.js	REST/GraphQL API	
Tailwind CSS (base)	CORS-enabled	

📂 Project Structure
graphql
Copy
Edit
kpi-dashboard/
│
├── frontend/                # React App (Vite)
│   ├── pages/               # Dashboard, Widget creation, Home, etc.
│   ├── components/          # ChartRenderer, WidgetChart
│   └── styles/              # Global styles
│
├── backend/                 # NestJS App
│   ├── user/                # User entity, resolver, service
│   ├── dashboard/           # Dashboard entity, resolver, service
│   ├── widget/              # Widget entity, resolver, service
│   └── app.controller.ts    # Raw SQL query execution endpoint
⚙️ Setup Instructions
✅ Prerequisites
Node.js (v18+)

MySQL (running locally or remote)

Yarn or npm

🖥️ Backend Setup
bash
Copy
Edit
cd backend
yarn install
Configure your database in app.module.ts (TypeORM config section).

Run DB migrations or use .sql seed scripts to create:

user

dashboard

widget

your data tables like sales_data, customers, etc.

Start backend server:

bash
Copy
Edit
yarn start:dev
Backend runs on http://localhost:3000

💻 Frontend Setup
bash
Copy
Edit
cd frontend
yarn install
yarn dev
Frontend runs on http://localhost:5173

📋 How to Use
Create Users
Navigate to /create-user and add users with roles like Manager, Sales Manager, etc.

Create Dashboards
Go to /create-dashboard, assign it to a user.

Add Widgets
Use /create-widget to add SQL-powered widgets to dashboards. You can select the chart type and define a valid SQL query.

View Dashboards
Visit /view-dashboards to view and interact with dashboards. Charts are fetched in real-time based on the SQL provided.

Delete Dashboards (Optional)
Use the delete button to remove dashboards permanently.

🎨 Example SQL Queries
sql
Copy
Edit
-- Bar Chart
SELECT month, revenue FROM sales_data;

-- Pie Chart
SELECT region, revenue FROM sales_by_region;

-- Line Chart
SELECT join_date, COUNT(*) FROM customers GROUP BY join_date;

-- Doughnut Chart
SELECT category, COUNT(*) FROM inventory GROUP BY category;
⚠️ Ensure your database has these tables and fields.

📌 Future Improvements
Role-based access control

Drag & drop widget layout

Chart customization (colors, legends)

Dashboard sharing and export

Embedded mode for external apps
