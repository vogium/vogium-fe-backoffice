import { useBreadcrumb, useTranslate } from "@refinedev/core";
import { Link } from "react-router";

export const Breadcrumb = () => {
  const translate = useTranslate();
  const { breadcrumbs } = useBreadcrumb();

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li
              key={`breadcrumb-${breadcrumb.label}`}
              className="flex items-center"
            >
              {index > 0 && (
                <svg
                  className="w-5 h-5 text-gray-400 mx-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {breadcrumb.href ? (
                <Link
                  to={breadcrumb.href}
                  className={`text-sm font-medium ${
                    isLast
                      ? "text-brand cursor-default"
                      : "text-brand/80 hover:text-brand"
                  }`}
                >
                  {translate("breadcrumb.pages." + breadcrumb.label)}
                </Link>
              ) : (
                <span className="text-sm font-medium text-brand">
                  {breadcrumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
