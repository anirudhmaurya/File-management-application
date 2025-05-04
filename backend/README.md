
#File Vault

A secure, efficient file hosting system built with AI-augmented development. Features include **file deduplication**, **search & filtering**, and storage stats.

---

## ✨ Features

- ✅ Deduplicates files using SHA256 hash
- 🔍 Search by filename
- 🔧 Filter by file type, size range, and upload date
- 📊 Reports storage saved from duplicates
- 🐋 Dockerized for easy deployment

---

## ⚙️ Tech Stack

- **Backend**: Django + DRF
- **Database**: SQLite
- **Containerized**: Docker (optional)
- **AI Tools Used**:
  - GitHub Copilot
  - Cursor IDE
  - Claude 3

---

## 🚀 Getting Started

### 1️⃣ Clone & Set Up

```bash
git clone <your-repo-url>
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2️⃣ Ensure database path exists

```bash
mkdir -p data
```

### 3️⃣ Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4️⃣ Start Server

```bash
python manage.py runserver
```

📍 Access: [http://localhost:8000](http://localhost:8000)

---

## 🔌 API Documentation

### 📤 POST `/files/` – Upload a File

**Form Data (multipart)**:
- `file`: (your file)

📥 Duplicate uploads return `is_duplicate: true`.

**Response Example**:
```json
{
  "id": "uuid",
  "file": "/uploads/abc.png",
  "original_filename": "abc.png",
  "file_type": "image/png",
  "size": 23342,
  "uploaded_at": "2025-04-18T14:00:00Z",
  "is_duplicate": false
}
```

---

### 📄 GET `/files/` – List / Search / Filter Files

Supports:
- `search=filename`
- `file_type=pdf`
- `size_min=1000&size_max=1000000`
- `uploaded_after=2024-01-01`
- `uploaded_before=2025-01-01`

**Example**:
```http
GET /files/?file_type=pdf&size_min=1000&search=report
```

---

### 📊 GET `/storage-stats/` – Deduplication Report

Shows total files and space saved from duplicates.

**Response**:
```json
{
  "total_files": 14,
  "total_saved_bytes": 182394
}
```

---

## 🧪 Postman Testing

### 1. Import Collection

Create or import a Postman collection with these requests:

- `POST /files/` → Upload a file
- `GET /files/?search=test` → Search files
- `GET /files/?file_type=pdf&size_min=0` → Filter files
- `GET /storage-stats/` → See saved bytes

You can also use `curl`:
```bash
curl -F "file=@mydoc.pdf" http://localhost:8000/files/
```

---

## 🐳 Docker (Optional)

### Build & Run

```bash
docker build -t abnormal-file-vault .
docker run -p 8000:8000 abnormal-file-vault
```

---

## 📂 Folder Structure

```
backend/
├── files/
│   ├── models.py        # File model with hash & dedup logic
│   ├── serializers.py   # Upload + stats serializers
│   ├── views.py         # Upload, filter, stats views
│   ├── urls.py          # API endpoints
├── core/
│   └── settings.py
├── data/
│   └── db.sqlite3       # (auto-generated)
```

---


## 🙌 Author

**Anirudh Kumar Maurya**  
📧 anirudhmaurya37@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/anirudh-maurya-509a73141/)

---
