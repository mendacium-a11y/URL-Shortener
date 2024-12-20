import useMediaQuery from "@/lib/useMediaQuery";
import { Github, Mail, Twitter } from "lucide-react";

export default function Footer() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <footer
      className={`w-full py-4 flex flex-col justify-center items-center ${
        isMobile ? "absolute bottom-0 left-0" : ""
      }`}
      style={{
        backgroundColor: "#3b185f", // Updated color
        color: "white",
      }}
    >
      {/* Social Links Section */}
      <ul
        className={`list-none flex justify-center items-center ${
          isMobile ? "flex-row gap-4" : "flex-row gap-8"
        }`}
      >
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.github.com/mendacium-a11y/Shortify"
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <Github className="w-6 h-6" />
            {!isMobile && "Github"}
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://twitter.com/Saksham2467"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <Twitter className="w-6 h-6" />
            {!isMobile && "Twitter"}
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="mailto:sakshamsaha1212+shortify@gmail.com"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <Mail className="w-6 h-6" />
            {!isMobile && "E-mail"}
          </a>
        </li>
        <li>
          <a href="#heading" className="flex items-center gap-2 hover:text-gray-300">
            Top
          </a>
        </li>
      </ul>

      {/* Footer Copyright Section */}
      <div className={`mt-4 text-center${isMobile ? "hidden" : "block"}`}>
        <p className="text-sm">Copyright © 2024</p>
      </div>
    </footer>
  );
}
