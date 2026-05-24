function CategoryCard({ title, emoji }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center hover:scale-105 transition duration-300 cursor-pointer">
      
      <span className="text-5xl">
        {emoji}
      </span>

      <h3 className="mt-4 text-xl font-bold text-gray-800">
        {title}
      </h3>

    </div>
  )
}

export default CategoryCard