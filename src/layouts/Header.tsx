function Header() {
  return (
    <div className="container mx-auto p-2.5 flex font-bold justify-center">
      <h1>{import.meta.env.VITE_APP_NAME}</h1>
    </div>
  );
}

export default Header;
