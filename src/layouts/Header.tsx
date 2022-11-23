function Header() {
  return (
    <div className="sticky top-0 bg-white shadow">
      <div className="container mx-auto p-2.5 flex font-bold justify-center items-center gap-2">
        <img
          src="/icon@192.png"
          className="w-10 h-10"
          alt={import.meta.env.VITE_APP_NAME}
        />
        <h1>{import.meta.env.VITE_APP_NAME}</h1>
      </div>
    </div>
  );
}

export default Header;
