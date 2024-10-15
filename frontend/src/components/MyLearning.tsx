const MyLearning = ({ enrollCourses }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Learning</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollCourses.map((course) => (
          <div
            key={course.id}
            className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-600 mt-2">{course.description}</p>
            <div className="mt-4">
              <span className="text-sm text-gray-500">
                Domain: <b>{course.domainName}</b>
              </span>
              <br />
              <span className="text-sm text-gray-500">
                Subdomain: <b>{course.subdomainName.join(', ')}</b>
              </span>
            </div>
            <div className="mt-4 text-lg font-semibold text-green-600">
              ${course.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyLearning
