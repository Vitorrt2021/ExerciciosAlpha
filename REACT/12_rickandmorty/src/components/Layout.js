import Footer from "./Footer";
import Nav from "./Nav";

function Layout(props) {
  return (
    <>
      <Nav />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;
