export function getCourseInformation(course: string) {
  switch (course) {
    case "Algorithms & Data Structures":
      return {
        title: "Algorithms & Data Structures",
        university: "IT University of Copenhagen",
      };
      break;
    case "Linear Algebra & Optimisation":
      return {
        title: "Linear Algebra & Optimisation",
        university: "IT University of Copenhagen",
      };
      break;
    case "Applied Statistics":
      return {
        title: "Applied Statistics",
        university: "IT University of Copenhagen",
      };
      break;
    case "Machine Learning":
      return {
        title: "Machine Learning",
        university: "IT University of Copenhagen",
      };
      break;
    default:
      return {
        title: "Unknown Course",
        university: "Unknown University",
      };
  }
}
