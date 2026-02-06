import React, { useRef, useEffect } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function TextAreaInput({
  error,
  className = "",
  ...props
}: TextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    autoResize();
  }, [props.value]);

  return (
    <textarea
      ref={ref}
      rows={1}
      className={`w-full resize-none overflow-hidden px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? "border-red-500" : "border-gray-300"
      } ${className}`}
      onInput={autoResize}
      {...props}
    />
  );
}
