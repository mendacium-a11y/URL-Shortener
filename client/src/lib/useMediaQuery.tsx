import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {
  // state of media query
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // checks if the media query is true or false
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // listener to trigger when the media object changes
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener); // !IMPORTANT to remove the listener
  
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;