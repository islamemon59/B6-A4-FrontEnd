import * as React from "react";

export function GoogleIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      {...props}
    >
      <path
        fill="#4285F4"
        d="M21.81 12.23c0-.72-.06-1.25-.19-1.8H12v3.62h5.65c-.11.9-.72 2.26-2.07 3.17l-.02.12 3.01 2.33.21.02c1.92-1.77 3.03-4.38 3.03-7.46Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.76 0 5.08-.91 6.77-2.47l-3.23-2.5c-.86.6-2.02 1.02-3.54 1.02-2.7 0-4.99-1.77-5.81-4.22l-.11.01-3.13 2.42-.04.1A10.23 10.23 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.19 13.83A6.14 6.14 0 0 1 5.86 12c0-.63.12-1.24.32-1.83l-.01-.12-3.17-2.45-.1.05A10 10 0 0 0 2 12c0 1.62.39 3.15 1.08 4.35l3.11-2.52Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.95c1.92 0 3.21.83 3.95 1.52l2.88-2.81C17.07 3.05 14.76 2 12 2a10.23 10.23 0 0 0-9.09 5.65l3.28 2.52c.83-2.45 3.11-4.22 5.81-4.22Z"
      />
    </svg>
  );
}

export function getOAuthErrorMessage(
  error: string | null,
  description: string | null,
) {
  if (description) {
    return decodeURIComponent(description);
  }

  if (!error) {
    return null;
  }

  return error
    .split("_")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}
