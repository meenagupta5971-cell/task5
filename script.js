const products = [
{id:1,name:"Wireless Headphones",price:999,category:"electronics",rating:"⭐ 4.8",img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"},
{id:2,name:"Smart Watch",price:1999,category:"electronics",rating:"⭐ 4.7",img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"},
{id:3,name:"Running Shoes",price:1499,category:"fashion",rating:"⭐ 4.6",img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"},
{id:4,name:"Stylish Handbag",price:899,category:"fashion",rating:"⭐ 4.5",img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"},
{id:5,name:"Coffee Mug Set",price:399,category:"home",rating:"⭐ 4.9",img:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400"},
{id:6,name:"Table Lamp",price:799,category:"home",rating:"⭐ 4.4",img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400"},
{id:7,name:"Bluetooth Speaker",price:1299,category:"electronics",rating:"⭐ 4.7",img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"},
{id:8,name:"Sunglasses",price:499,category:"fashion",rating:"⭐ 4.3",img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"},
{id:9,name:"Plant Pot",price:299,category:"home",rating:"⭐ 4.8",img:"https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400"}
];
let cart = JSON.parse(localStorage.getItem("shopkart_cart")) || [];
let todos = JSON.parse(localStorage.getItem("shopkart_todos")) || [];

function displayProducts(list){
  document.getElementById("productList").innerHTML = list.map(p=>`
  <div class="product">
    <img src="${p.img}" loading="lazy" alt="${p.name}">
    <div class="product-info"><h3>${p.name}</h3><p>${p.rating}</p><p class="price">₹${p.price}</p>
    <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button></div>
  </div>`).join("");
}
function filterProducts(){
  let search = document.getElementById("searchInput").value.toLowerCase();
  let cat = document.getElementById("categoryFilter").value;
  let sort = document.getElementById("sortFilter").value;
  let price = document.getElementById("priceFilter").value;
  let filtered = products.filter(p => p.name.toLowerCase().includes(search) && (cat==="all"||p.category===cat) && (price==="all"||p.price<=price));
  if(sort==="low") filtered.sort((a,b)=>a.price-b.price);
  if(sort==="high") filtered.sort((a,b)=>b.price-a.price);
  if(sort==="rating") filtered.sort((a,b)=>b.rating.localeCompare(a.rating));
  displayProducts(filtered);
}
function addToCart(id){
  let item = cart.find(i=>i.id===id);
  if(item) item.qty++; else {let p=products.find(x=>x.id===id); cart.push({...p,qty:1});}
  saveCart(); updateCartUI(); alert("Added to Cart ✅");
}
function saveCart(){ localStorage.setItem("shopkart_cart", JSON.stringify(cart)); }
function updateCartUI(){
  document.getElementById("cartCount").innerText = cart.reduce((s,i)=>s+i.qty,0);
  let total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById("cartTotal").innerText = "Total: ₹"+total;
  document.getElementById("cartItems").innerHTML = cart.length===0 ? "<p>Cart is empty</p>" : cart.map((i,idx)=>`
  <div class="cart-item"><span>${i.name} - ₹${i.price}</span><span>
  <button class="qty-btn" onclick="changeQty(${idx},-1)">-</button>${i.qty}<button class="qty-btn" onclick="changeQty(${idx},1)">+</button>
  <span class="remove" onclick="removeItem(${idx})">🗑️</span></span></div>`).join("");
}
function changeQty(idx, d){ cart[idx].qty+=d; if(cart[idx].qty<=0) cart.splice(idx,1); saveCart(); updateCartUI(); }
function removeItem(idx){ cart.splice(idx,1); saveCart(); updateCartUI(); }
function clearCart(){ cart=[]; saveCart(); updateCartUI(); }
function showCart(){ updateCartUI(); document.getElementById("cartModal").style.display="block"; }
function closeCart(){ document.getElementById("cartModal").style.display="none"; }
function checkout(){
  if(cart.length===0) return alert("Cart empty!");
  let name=document.getElementById("custName").value;
  if(!name) return alert("Please enter your name");
  document.getElementById("orderMsg").innerText = "🎉 Thank you "+name+"! Order placed successfully!";
  cart=[]; saveCart(); updateCartUI();
}
function toggleMenu(){ document.getElementById("navMenu").classList.toggle("active"); }
function addTodo(){
  let v=document.getElementById("todoInput").value.trim();
  if(!v) return; todos.push(v); localStorage.setItem("shopkart_todos",JSON.stringify(todos)); document.getElementById("todoInput").value=""; renderTodos();
}
function renderTodos(){
  document.getElementById("todoList").innerHTML = todos.map((t,i)=>`<li>${t} <span style="cursor:pointer" onclick="todos.splice(${i},1);localStorage.setItem('shopkart_todos',JSON.stringify(todos));renderTodos()">❌</span></li>`).join("");
}
function sendContact(e){ e.preventDefault(); document.getElementById("contactMsg").innerText="Message sent! We will contact you soon ✅"; e.target.reset(); }
displayProducts(products); updateCartUI(); renderTodos();