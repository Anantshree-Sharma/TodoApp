function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 text-center py-3 text-gray-600 bg-white shadow-lg border-t border-gray-200">
      <p className="text-sm font-medium">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
