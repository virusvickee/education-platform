const Loader = () => {
  return (
    <div className="flex items-center justify-center" role="status" aria-label="Loading">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
