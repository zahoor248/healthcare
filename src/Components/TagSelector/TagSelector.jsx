import { useState } from "react";
import "./TagSelector.css";

const TagSelector = () => {
  const [tags, setTags] = useState([]);

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <div className="w-full">
      {tags.map((tag, index) => (
        <div className="" key={index}>
          <span className="text">{tag}</span>
          <span className="close" onClick={() => removeTag(index)}>
            &times;
          </span>
        </div>
      ))}

      {/* <p className="text-base/none pb-2 font-normal text-neutral-600">
          Email
        </p> */}
      <div className=" w-full">
        <input
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Enter Tags"
          className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
        />
      </div>
    </div>
  );
};

export default TagSelector;
