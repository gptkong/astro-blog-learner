import React from "react";
import { Album } from "lucide-react";

type NavCardProps = {
  title: string;
  description: string;
  href: string;
  icon?: React.ElementType;
};

export default function NavCard({
  title,
  description,
  href,
  icon,
}: NavCardProps) {
  const Icon = icon;
  return (
    <a
      href={href}
      className="block rounded-xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg hover:border-blue-400 group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center space-x-4">
        <div className="text-blue-500 text-3xl">
          {Icon ? <Icon /> : <Album />}
        </div>
        <div>
          <h3 className="text-lg font-semibold group-hover:text-blue-600">
            {title}
          </h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
    </a>
  );
}
