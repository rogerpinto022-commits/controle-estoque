from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Controle de Estoque")

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

class Product(BaseModel):
    name: str
    sku: str | None = None
    quantity: int = 0
    min_quantity: int = 5
    unit_price: float | None = None

@app.get("/")
def home():
    return {"status": "API rodando"}

@app.get("/products")
def get_products():
    res = supabase.table("products").select("*").execute()
    return res.data

@app.post("/products")
def add_product(product: Product):
    res = supabase.table("products").insert(product.dict()).execute()
    return res.data

@app.get("/low-stock")
def low_stock():
    res = supabase.table("products").select("*").lt("quantity", "min_quantity").execute()
    return res.data
