# 🗂️ File Vault — Frontend

A modern and efficient file storage frontend built with **React 18**, **TypeScript**, **Tailwind CSS**, **React Query**, and **Heroicons**. Designed to interact with a backend that supports file uploads, deduplication, search, filtering, and storage analytics.

---

## 🚀 Features

### 📤 File Upload with Deduplication
- Upload files up to 10MB
- Automatically detects and prevents duplicate file storage
- Shows notification if the uploaded file is a duplicate

### 🔍 Search & Filtering
- Search by file name
- Filter by:
  - File type (PDF, Markdown, YAML)
  - Size range
  - Upload date
- Combines filters dynamically

### 📊 Storage Stats
- Displays total files
- Shows space saved via deduplication

### 🧰 Tech Stack
- **React 18 + TypeScript**
- **TanStack Query (React Query)** for data fetching/caching
- **Axios** for HTTP communication
- **Tailwind CSS** for styling
- **Heroicons** for icons
- **Postman** used for API testing

---

## 📂 Folder Structure

```
src/
│
├── components/
│   ├── FileUpload.tsx
│   ├── FileList.tsx
│   ├── FilterPanel.tsx
│   └── StorageStats.tsx
│
├── services/
│   └── fileService.ts
│
├── types/
│   └── file.ts
│
├── App.tsx
├── index.tsx
└── index.css
```

---

## 🛠️ Getting Started

### 📦 Install Dependencies
```bash
npm install
```

### ⚙️ Setup Environment
Create a `.env` file at the root:
```
REACT_APP_API_URL=http://localhost:8000/api
```

### ▶️ Start Development Server
```bash
npm run dev
```

App will be available at [http://localhost:5173](http://localhost:5173) (Vite default)

---

## 🧪 API Endpoints (Expected Backend)

| Endpoint                        | Method | Description                          |
|--------------------------------|--------|--------------------------------------|
| `/api/files/`                  | POST   | Upload file                          |
| `/api/files/?search=...`       | GET    | Search by filename                   |
| `/api/files/?file_type=...`    | GET    | Filter by file type, size, date etc. |
| `/api/storage-stats/`          | GET    | Get storage stats                    |

---

## 💡 Notes
- This app assumes the backend provides deduplication logic and sends `is_duplicate` in the response.
- Fully mobile responsive with TailwindCSS.

---

## 🙌 Author

**Anirudh Kumar Maurya**  
📧 anirudhmaurya37@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/anirudh-maurya-509a73141/)

---

