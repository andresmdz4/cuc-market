import { Link } from "react-router-dom"

function ProductCard({ product }) {

  return (

    <Link
      to={`/product/${product.id}`}
      className="block"
    >

      {/* CARD */}
      <div className="backdrop-blur-2xl bg-white/40 border border-white/50 rounded-3xl shadow-xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">

        {/* IMAGEN */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />

        {/* CONTENIDO */}
        <div className="p-5">

          {/* NOMBRE */}
          <h2 className="text-xl font-bold text-gray-800">
            {product.name}
          </h2>

          {/* VENDEDOR */}
          <p className="text-gray-600 mt-2">
            {product.seller}
          </p>

          {/* PRECIO */}
          <p className="text-[#A3161A] font-black text-2xl mt-4">
            ${product.price}
          </p>

        </div>

      </div>

    </Link>

  )
}

export default ProductCard