import type { PropsOf } from "@builder.io/qwik";

export function ArrowBackIcon(props: PropsOf<"svg">, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 12h14m-4 4l4-4m-4-4l4 4"
      />
    </svg>
  );
}
export function ArrowForwardIcon(props: PropsOf<"svg">, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M5 12h14M5 12l6 6m-6-6l6-6"
      ></path>
    </svg>
  );
}

export function RefreshIcon(props: PropsOf<"svg">, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4m-4 4a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"
      ></path>
    </svg>
  );
}

export function CodeIcon(props: PropsOf<"svg">, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="m7 8l-4 4l4 4m10-8l4 4l-4 4M14 4l-4 16"
      ></path>
    </svg>
  );
}
