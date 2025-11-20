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
  async searchCourses(query) {
    try {
      const data = await apiClient.get(`/products/search?q=${query}`);
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
        })),
      };
    } catch (error) {
      throw new Error("Failed to search courses");
    }
  }

  // Helper to generate random status
  getRandomStatus() {
    const statuses = ["Active", "Upcoming", "Popular", "New"];
    return statuses[Math.floor(Math.random() * statuses.length)];
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
