import useMediaQuery from "@/lib/useMediaQuery";
import { Github, Mail, Twitter } from "lucide-react";

export default function Footer() {
  // added new hook to compute media query result
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    // removed absolute position from footer bc it was causing problem on home page
    <footer className="  mt-5   w-full footer text-white py-4">
      <ul className="list-none flex gap-4 sm:gap-10 justify-center items-center">
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.github.com/mendacium-a11y/Shortify"
          >
            {/* added icons to show on mobile */}
            {isMobile ? <Github /> : "Github"}
          </a>
        </li>
        <li>
          <a target="_blank" href="https://twitter.com/Saksham2467" rel="noreferrer">
            {/* added icons to show on mobile */}
            {isMobile ? <Twitter /> : "Twitter"}
          </a>
        </li>
        <li>
          <a target="_blank" href="mailto:sakshamsaha1212+shortify@gmail.com" rel="noreferrer">
            {/* added icons to show on mobile */}
            {isMobile ? <Mail /> : "E-mail"}
          </a>
        </li>
        <li>
          <a href="#heading">Top</a>
        </li>
        <li>Copyright @ 2024</li>
      </ul>
    </footer>
  );
}
