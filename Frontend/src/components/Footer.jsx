function Footer() {
  return (
    <footer className="text-center py-2 text-white bg-gradient-to-b from-[#8753F4] to-purple-600/30">
      <p className="text-xs">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
