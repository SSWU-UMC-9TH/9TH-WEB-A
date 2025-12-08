import { useCallback, useState } from "react";
import { type MovieLanguage, type MovieFilters } from "../types/movie";
import { Input } from "./Input";
import { SelectBox } from "./SelectBox";
import { LANGUAGE_OPTIONS } from "../constants/movie";
import { LanguageSelector } from "./LanguageSelector";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

export default function MovieFilter({ onChange }: MovieFilterProps) {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<MovieLanguage>("ko-KR");

  const handleSubmit = useCallback(() => {
    onChange({
      query: query.trim(),
      include_adult: includeAdult,
      language,
    });
  }, [query, includeAdult, language, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      className="
        space-y-6 rounded-2xl 
        bg-pink-400 p-6 
        shadow-lg shadow-pink-500/20 
        transition-all hover:shadow-pink-500/40 
        mb-6
      "
    >
      <div className="flex flex-wrap gap-6 items-end">
        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-sm font-bold text-hotPink">
            🎬 영화 제목
          </label>
          <Input
            value={query}
            onChange={setQuery}
            placeholder="영화 제목을 입력하세요"
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="min-w-[200px] flex-1">
          <label className="mb-2 block text-sm font-bold text-hotPink">
            🔞 옵션
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include-adult"
            className="accent-pink-500"
          />
        </div>

        <div className="min-w-[200px] flex-1">
          <label className="mb-2 block text-sm font-bold text-hotPink">
            🌐 언어
          </label>
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
          />
        </div>

        <div className="pt-2">
          <button
            onClick={handleSubmit}
            className="
              px-6 py-3 
              bg-pink-500 text-black font-bold 
              rounded-xl 
              shadow-md shadow-pink-500/50 
              hover:bg-pink-400 
              transition-all duration-200
              active:scale-95
            "
          >
            🔍 영화 검색
          </button>
        </div>
      </div>
    </div>
  );
}
