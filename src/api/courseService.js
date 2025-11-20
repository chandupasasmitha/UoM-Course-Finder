import apiClient from "./apiClient";

class CourseService {
  // Fetch all courses (using products as courses for demo)
  async getCourses(limit = 20, skip = 0) {
    try {
      const data = await apiClient.get(`/products?limit=${limit}&skip=${skip}`);
      // Transform products to courses
      return {
        courses: data.products.map((product) => ({
          id: product.id,
          title: product.title,
          description: product.description,
          image: product.thumbnail,
          category: product.category,
          rating: product.rating,
          price: product.price,
          status: this.getRandomStatus(),
          duration: `${Math.floor(Math.random() * 12) + 1} weeks`,
          instructor: product.brand || "UoM Faculty",
        })),
        total: data.total,
      };
    } catch (error) {
      throw new Error("Failed to fetch courses");
    }
  }

  // Get course by ID
  async getCourseById(id) {
    try {
      const product = await apiClient.get(`/products/${id}`);
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        image: product.thumbnail,
        images: product.images || [product.thumbnail],
        category: product.category,
        rating: product.rating,
        price: product.price,
        status: this.getRandomStatus(),
        duration: `${Math.floor(Math.random() * 12) + 1} weeks`,
        instructor: product.brand || "UoM Faculty",
        reviews: product.reviews || [],
        stock: product.stock,
      };
    } catch (error) {
      throw new Error("Failed to fetch course details");
    }
  }

  // Search courses
  async getCourses() {
    const data = await apiClient.get(
      "/search.json?subject=programming&limit=20"
    );
    return {
      courses: data.docs.map((book) => ({
        id: book.key,
        title: book.title,
        description: book.first_sentence?.[0] || "No description",
        image: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
        category: book.subject?.[0] || "General",
        rating: Math.random() * 5,
        instructor: book.author_name?.[0] || "Unknown",
        // ... more fields
      })),
    };
  }

  // Mock login (using dummyjson auth)
  async login(username, password) {
    try {
      const data = await apiClient.post("/auth/login", {
        username,
        password,
      });
      return data;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  }
}

export default new CourseService();
