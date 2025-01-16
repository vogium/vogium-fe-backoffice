import React, { useState, useRef, useEffect } from "react";
import { useTranslate, useSetLocale } from "@refinedev/core";

const languages = [
  {
    key: "en",
    label: "English",
    icon: "🇺🇸",
  },
  {
    key: "tr",
    label: "Türkçe",
    icon: "🇹🇷",
  },
];

export const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const translate = useTranslate();
  const changeLanguage = useSetLocale();
  const currentLocale = localStorage.getItem("locale") || "en";
  const currentLanguage = languages.find((lang) => lang.key === currentLocale);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
      >
        <span className="text-xl">{currentLanguage?.icon}</span>
        <span className="font-medium text-gray-700">
          {currentLanguage?.label}
        </span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100">
          {languages.map((lang) => (
            <button
              key={lang.key}
              onClick={() => {
                changeLanguage(lang.key);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2
                ${currentLocale === lang.key ? "bg-gray-50" : ""}
              `}
            >
              <span className="text-xl">{lang.icon}</span>
              <span className="font-medium text-gray-700">{lang.label}</span>
              {currentLocale === lang.key && (
                <svg
                  className="w-4 h-4 text-green-500 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
