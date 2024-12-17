import React from "react";
import { LucideIcon } from "lucide-react";

interface textareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  helperText?: string;
}

export const Textarea = React.memo(
  ({
    label,
    error,
    icon: Icon,
    helperText,
    className = "",
    ...props
  }: textareaProps) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          )}
          <textarea
            rows={4}
            className={`
            w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
            text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]
            ${Icon ? "pl-10" : ""}
            ${error ? "border-red-500" : ""}
            ${className}
          `}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <p className={`text-sm ${error ? "text-red-500" : "text-gray-400"}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "textarea";
