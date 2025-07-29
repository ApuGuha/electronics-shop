import { useLocation, Link } from "react-router-dom";

export const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean); // Removes leading/trailing slashes

  // Do not show breadcrumb for these routes
  const excludedRoutes = ["/login", "/signup", "/404" , "/"];
  if (excludedRoutes.includes(location.pathname)) return null;

  // Don't render breadcrumb on home
  if (pathSegments.length === 0) return null;

  let pageTitle = "";

  if (pathSegments[0] === "category" && pathSegments[1]) {
    pageTitle = pathSegments[1]
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else if (pathSegments[0] === "product" && pathSegments[1]) {
    pageTitle = pathSegments[1]
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    // Handle static pages like /about or /shop
    pageTitle = pathSegments[0]
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <section className="custom-breadcrumb">
      <div className="container">
        <ul>
          <li className="disable">
            <Link to="/">Home</Link>
          </li>
          <span>/</span>
          <li className="active">{pageTitle}</li>
        </ul>
      </div>
    </section>
  );
};

