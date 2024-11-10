import { useEffect, useState } from "react";

async function fetchProducts(category, term) {
  
  const url = `products.json`;
  const response = await fetch(url);

  const data = await response.json();
  if(category === "all" && term === "") {
    return data;
  }
  return data.filter(product => 
    (product.type === category.toLowerCase()) && (product.name.includes(term.toLowerCase()))
  );

}

export default function App() {
  
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(products, categoryValue);
  
  useEffect(() => {
    (async () => {
      const newProducts = await fetchProducts(category, searchTerm);
      setProducts(newProducts);
    })();
  }, []);

  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>

      <div>
        <aside>
          <form>
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select 
                id="category" 
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All</option>
                <option>Vegetables</option>
                <option>Meat</option>
                <option>Soup</option>
              </select>
            </div>

            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input 
                type="text" 
                id="searchTerm" 
                placeholder="e.g. beans"
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>

            <div>
              <button
                onClick={async (event) => {
                  event.preventDefault();
                  const newProducts = await fetchProducts(category, searchTerm);
                  setProducts(newProducts);
                }}
              >
                Filter results
              </button>
            </div>
          </form>
        </aside>

        <main>
          {products.map((product, index) => {
            return (
              <section key={index} className={product.type}>
                <h2>{product.name}</h2>
                <p>{product.price}</p>
                <img src={product.image} alt={product.name} />
              </section>
            );
          })}
        </main>
      </div >

      <footer>
        <p>All icons found at the Noun Project:</p>
        <ul>
          <li>
            Bean can icon by{" "}
            <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            Vegetable icon by{" "}
            <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            Soup icon by{" "}
            <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            Meat Chunk icon by{" "}
            <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
          </li>
        </ul>
      </footer>

    </>
  );
}