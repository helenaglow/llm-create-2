import React, { useState, useMemo, useEffect } from "react";
import { Input, Button } from "@chakra-ui/react";
import { Passages } from "../consts/passages";

const PoemViewer: React.FC = () => {
  const [selectedPassageId, setSelectedPassageId] = useState(Passages[0].id);

  const passageText = useMemo(() => {
    const passage = Passages.find((p) => p.id === selectedPassageId);
    return passage?.text ?? "";
  }, [selectedPassageId]);

  const words = passageText.split(" ");

  const [inputValue, setInputValue] = useState("");
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  // Reset visible indexes when passage changes
  useEffect(() => {
    setVisibleIndexes(Array.from({ length: words.length }, (_, i) => i));
  }, [selectedPassageId, words.length]);

  const handleApply = () => {
    try {
      const parsed = JSON.parse(inputValue) as number[];
      if (Array.isArray(parsed)) {
        setVisibleIndexes(parsed);
      } else {
        alert("Please enter a valid array of numbers like [1,2,3]");
      }
    } catch (err) {
      alert("Invalid input.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center p-6 space-y-6">
        {/* Passage Selector */}
        <select
          value={selectedPassageId}
          onChange={(e) => setSelectedPassageId(e.target.value)}
          className="w-full max-w-lg p-2 border border-gray-300 rounded-md bg-white text-black"
        >
          {Passages.map((passage) => (
            <option key={passage.id} value={passage.id}>
              Passage {passage.id}: {passage.title}
            </option>
          ))}
        </select>

        {/* Poem */}
        <div className="max-w-3xl text-center leading-relaxed flex flex-wrap">
          {words.map((word, i) => {
            const isVisible = visibleIndexes.includes(i);
            return (
              <span
                key={i}
                className={`px-1 transition duration-200 ${
                  isVisible ? "text-black" : "text-transparent bg-black"
                }`}
              >
                {word + " "}
              </span>
            );
          })}
        </div>

        {/* Input + Button */}
        <div className="flex space-x-4 w-full max-w-lg">
          <Input
            placeholder="Enter indexes like [1,2,3]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button onClick={handleApply} className="btn-small-inverted">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PoemViewer;
