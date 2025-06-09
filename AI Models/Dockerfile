# AI Models/Dockerfile
FROM python:3.10

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python requirements
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["uvicorn", "fastApi:app", "--host", "0.0.0.0", "--port", "5000"]